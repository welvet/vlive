s0.initVideo("/static/video/img_0132.mp4");

window.f0 = function() {
    osc(10, 0, 0.7)
        .pixelate(p1(3, 30))
        .modulateRotate(o1, 0.1)
        .color(p2(0.1, 1), p2(-0.5, 1))
        .out(o0);

    osc(33)
        .modulateRotate(
            shape(3)
            .scale(() => (Math.cos(time) * 2))
            .rotate(0, -0.25)
        )
        .rotate(2, 0.2)
        .out(o1);
};

window.f1 = function() {
    osc(10, 0, 0.7)
        .pixelate(p1(3, 30))
        .modulateRotate(o1, 0.1)
        .color(p2(0.1, 1), p2(-0.5, 1))

        .out(o2);

    osc(33)
        .modulateRotate(
            shape(3)
            .scale(() => (Math.cos(time) * 2))
            .rotate(0, -0.25)
        )
        .rotate(2, 0.2)
        .out(o1);

    src(o2)
        .modulateKaleid(osc(3), 0.1, 1)
        .out();
};

window.f2 = function() {
    osc(10, 0, 0.7)
        .pixelate(p1(3, 30))
        .modulateRotate(o1, 0.1)
        .color(p2(0.1, 1), p2(-0.5, 1))

        .out(o2);

    osc(33)
        .modulateRotate(
            shape(3)
            .scale(() => (Math.cos(time) * 2))
            .rotate(0, -0.25)
        )
        .rotate(2, 0.2)
        .out(o1);

    src(o2)
        .color(0.9, 0.7, 0.8)

        .scrollX(10)
        .colorama()
        .repeatX(4)
        .repeatY(4)
        .modulate(
            osc(1, -0.9, 300)
        )
        .scale(2)
        .out()
};


window.f3 = function() {
    osc(10, 0, 0.7)
        .pixelate(p1(3, 30))
        .modulateRotate(o1, 0.1)
        .color(p2(0.1, 1), p2(-0.5, 1))

        .out(o2);

    osc(33)
        .modulateRotate(
            shape(3)
            .scale(() => (Math.cos(time) * 2))
            .rotate(0, -0.25)
        )
        .rotate(2, 0.2)
        .out(o1);

    src(o2)
        .color(0.9, 0.7, 0.8)

        .scrollX(10)
        .colorama()
        .repeatX(4)
        .repeatY(4)
        .modulate(
            osc(1, -0.9, 300)
        )
        .scale(2)
        .out(o3);

    src(o3)
        .saturate(0.7)
        .colorama([0.005, 0.33, 0.66, 1.0].fast(0.125))
        .out();
};


window.f4 = function() {
    osc(10, 0, 0.7)
        .pixelate(p1(3, 30))
        .modulateRotate(o1, 0.1)
        .color(p2(0.1, 1), p2(-0.5, 1))

        .out(o2);

    osc(33)
        .modulateRotate(
            shape(3)
            .scale(() => (Math.cos(time) * 2))
            .rotate(0, -0.25)
        )
        .rotate(2, 0.2)
        .out(o1);

    src(o2)
        .color(0.9, 0.7, 0.8)

        .scrollX(10)
        .colorama()
        .repeatX(4)
        .repeatY(4)
        .modulate(
            osc(1, -0.9, 300)
        )
        .scale(2)
        .out(o3);

    src(o3)
        .saturate(0.7)
        .colorama([0.005, 0.33, 0.66, 1.0].fast(0.125))
        .pixelate(p3(
            10, 100))
        .out();
};





window.f8 = function() {
    solid().out();
};


f0();
