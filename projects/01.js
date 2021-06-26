s0.initVideo("/static/video/img_0132.mp4");
speed = 0.4;

window.f1 = function () {
  src(s0)
    .saturate(({ time }) => Math.sin(time) * 10)
    .out(o1);

  src(o1).repeat(3).out();
};

window.f2 = function () {
  src(s0)
    .saturate(({ time }) => Math.sin(time) * 10)
    .repeat(3)
    .modulateScrollX(osc(10), 0.5, 0)
    .out();
};

window.f3 = function () {
  src(s0)
    .saturate(({ time }) => Math.sin(time) * 10)
    .repeat(4, 2)
    .modulateScrollX(osc(10), 0.1, 0)
    .mult(osc(13, 0.5, 4))
    .modulateRepeatY(
      osc(10),
      ({ time }) => time * 0.0003,
      ({ time }) => Math.sin(time) * 0.1
    )
    .out();
};

window.f4 = function () {
  osc(100, 0, 1)
    .saturate(({ time }) => Math.sin(time) * 10)
    .out(o1);

  src(o1).modulateScrollY(osc(10), 0.5, 0).out(o0);
};

window.f5 = function () {
  osc(100, 0, 1)
    .saturate(({ time }) => Math.sin(time) * 10)
    .out(o1);

  src(o1).modulateScrollX(osc(10), 0.5, 0).out(o0);
};

window.f6 = function () {
  solid().out(o0);
};

f();
