RADIUS = 200;
POINTS_AMOUNT = Math.random() * 30 + 50;//25;

// simple
function randomTweaksV1(points) {
    return points.map(function (p) {
        return p.add(
            new Point(
                tweak(20),
                tweak(20)
            ));
    });
}

var points = createCirclePoints(RADIUS, Math.random() * FULL_PI, POINTS_AMOUNT);

function drawBezier(ctx, options) {

    ctx.fillStyle = "rgba(0,0,0,0.05)";

    points = randomTweaksV1(points);

    for(var i = 0; i < 1; i += 0.001) {

        ctx.beginPath();

        var point = bezier(i, points);

        ctx.arc(
            options.center.x + point.x,
            options.center.y + point.y,
            1, 0, FULL_PI);
        ctx.fill();
    }
}

function launchBezier(ctx, options) {

    if (launchBezier.lastAnimation) {
        launchBezier.lastAnimation.keepAnimating = false;
    }

    launchBezier.lastAnimation = repeat(
        function() {
            drawBezier(ctx, options);
        }, 100
    );
}

