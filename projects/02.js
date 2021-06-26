// https://ojack.xyz/hydra-functions/

s0.initVideo("/static/video/img_0132.mp4");
document.body.style.background = "pink";
speed = 0.03;

function st1() {
  return time / 2.5;
}

window.f1 = function () {
  osc(100, 0.9, 30)
    .rotate(10)
    .pixelate(20, 30)
    .modulate(osc(25, 0.1, 0.5).kaleid(50).scale(st1))
    .saturate(({ time }) => Math.sin(time))
    .out();
};

window.f2 = function () {
  osc(100, 0.9, 30)
    .rotate(100)
    .pixelate(20, 30)
    .modulate(osc(25, 0.1, 0.5).kaleid(50).scale(st1))
    .saturate(({ time }) => Math.sin(time))
    .out(o1);

  src(o1).diff(src(o1).color(0.04).repeat(0.4)).scale(5).out();
};

window.f3 = function () {
  osc(100, 0.9, 30)
    .rotate(100)
    .pixelate(20, 30)
    .modulate(osc(25, 0.1, 0.5).kaleid(50).scale(st1))
    .saturate(({ time }) => Math.sin(time))
    .out(o1);

  src(o1)
    .diff(src(o1).color(0.04).repeat(0.4))
    .scale(10)
    .modulateRotate(osc(1, 0.5, 10).kaleid(50).scale(0.5), 15, 0)
    .out();
};

window.f4 = function () {
  osc(100, 0.9, 30)
    .rotate(100)
    .pixelate(20, 30)
    .modulate(osc(25, 0.1, 0.5).kaleid(50).scale(st1))
    .saturate(({ time }) => Math.sin(time))
    .out(o1);

  src(o1)
    .diff(src(o1).color(0.04, 0.3).repeat(0.4))
    .scale(10)
    .modulateRotate(osc(-1, 0.5, 10).kaleid(10).scale(0.5), 15, 0)
    .out();
};

window.f8 = function () {
  solid().out();
};

f8();
