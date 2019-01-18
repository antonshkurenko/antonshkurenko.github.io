RADIUS = 200;
POINTS_AMOUNT = Math.random() * 30 + 25;

// simple
function randomTweaksV2V1(points) {
    return points.map(function (p) {
        return p.add(
            new Point(
                tweak(3),
                tweak(3)
            ));
    });
}

// idx matters
function randomTweaksV2V2(points) {
    return points.map(function (p, idx, arr) {
        return p.add(
            new Point(
                tweak(5 * idx / arr.length),
                tweak(5 * idx / arr.length)
            ));
    });
}

var tweaks = [randomTweaksV2V1, randomTweaksV2V2];

var points = createCirclePoints(RADIUS, Math.random() * FULL_PI, POINTS_AMOUNT);

function drawBezierV2(ctx, options, tweakFunc) {

    ctx.setLineDash([1, 1 + 6 * Math.random()]);
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.strokeStyle = "rgba(0,0,0,0.05)",
    ctx.lineJoin = "round",
    ctx.lineWidth = 1;

    points = tweakFunc(points);

    drawAsSpline(ctx, points.map(function(p) {
        return p.add(options.center);
    }));
}

function launchBezierV2(ctx, options) {

    if (launchBezierV2.lastAnimation) {
        launchBezierV2.lastAnimation.keepAnimating = false;
    }

    var tweakFunc = tweaks[Math.floor(Math.random() * tweaks.length)];

    launchBezierV2.lastAnimation = repeat(
        function() {
            drawBezierV2(ctx, options, tweakFunc);
        }, 16
    );
}

