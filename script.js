const Hydra = require("hydra-synth");

const hydra = new Hydra({ detectAudio: false });

document.onkeydown = function (evt) {
  evt = evt || window.event;
  if (evt.ctrlKey && evt.keyCode == 90) {
    document.body.requestFullscreen();
  }
};

let socket = new WebSocket("ws://" + location.host + "/ws");
socket.onmessage = function (event) {
  if (event.data != "ping") {
    console.log("Got update", event.data);
    eval(event.data);
  }
};

setInterval(function () {
  socket.send("ping");
}, 4000);

for (var i = 1; i <= 8; i++) {
  eval("window.pp" + i + " = 0;");
  var fn = "";
  fn += "window.p" + i + " = function (from, to) {";
  fn += "  var diffStep = (to - from) / 127;";
  fn += "  return function() {return from + window.pp" + i + " * diffStep}";
  fn += "}";
//  console.log(fn);

  eval(fn);
}
