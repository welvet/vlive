package welvet

import io.ktor.application.*
import io.ktor.config.*
import io.ktor.http.cio.websocket.*
import io.ktor.http.content.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.websocket.*
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.Channel
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.File
import java.time.Duration
import javax.sound.midi.*

const val currentProject = "03"
val logger: Logger = LoggerFactory.getLogger("main")

fun main() {
    val queue = Channel<String>()

    // ableton
    subscribeToMidi("hydra2") { data1, data2 ->
        if (data2 == 100) { // not sure about 100
            queue.send("window.f${data1 - 59}()")
        }
    }

    // launchpad bank 2
    subscribeToMidi("Launch Control XL") { data1, data2 ->
        if (data2 == 127 && data1 < 16) {
            logger.info("FN $data1")
            queue.send("window.f${data1}()")
        } else if (data1 in 77..84) {
//            logger.info("${data1 - 77} $data2")
            queue.send("window.pp${data1 - 76} = $data2")
        }
    }

    embeddedServer(Netty, environment = applicationEngineEnvironment {
        config = MapApplicationConfig().apply { put("ktor.deployment.watch", listOf("classes", "resources")) }

        module {
            install(WebSockets) {
                pingPeriod = Duration.ofDays(15)
                timeout = Duration.ofDays(15)
                maxFrameSize = Long.MAX_VALUE
                masking = false
            }

            routing {
                get("/") {
                    call.respondRedirect("/static/index.html")
                }

                static("/static") {
                    files(".")
                }


                webSocket("/ws") {
                    launch {
                        for (m in incoming) {
                            send("ping")
                        }
                    }

                    launch {
                        while (true) {
                            send(queue.receive())
                            flush()
                        }
                    }

                    var currentFileCache = ""
                    while (true) {
                        delay(100L)
                        val newContent = withContext(Dispatchers.IO) {
                            File("projects/$currentProject.js").readBytes().decodeToString()
                        }

                        if (newContent != currentFileCache) {
                            send(newContent)
                            flush()
                            currentFileCache = newContent
                            logger.info("Content updated")
                        }
                    }
                }
            }
        }

        connector {
            port = 8080
            host = "127.0.0.1"
        }

        developmentMode = true
    }).start(wait = true)
}

fun subscribeToMidi(deviceName: String, r: suspend (Int, Int) -> Unit) {
    val device: MidiDevice =
        MidiSystem.getMidiDeviceInfo()
            .filter { it.name == deviceName }
            .filter { it.javaClass.name.contains("MidiInDevice") }
            .map { MidiSystem.getMidiDevice(it) }
            .first()

    device.transmitter.receiver = object : MidiDeviceReceiver {
        override fun close() {

        }

        override fun send(message: MidiMessage?, timeStamp: Long) {
            if (message is ShortMessage) {
                GlobalScope.launch {
                    r(message.data1, message.data2)
                }
            }
        }

        override fun getMidiDevice(): MidiDevice {
            return device
        }
    }

    device.open()
}
