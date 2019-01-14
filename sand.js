
SAND_RADIUS = 0;
ANGLE_STEP = Math.PI / (180 * 4);
STEP_AMOUNT = 100;

var prevDelta = 0;
var prevAngle = 0;

function drawSand(ctx, options) {

    ctx.fillStyle = "rgba(0,0,0,0.05)";

    for (var i = 0; i < STEP_AMOUNT; i++) {
        ctx.beginPath();

        prevDelta = prevDelta + (-1 + Math.random() * 2);

        ctx.arc(
            options.center.x + polarToX(SAND_RADIUS + prevDelta, prevAngle),
            options.center.y + polarToY(SAND_RADIUS + prevDelta, prevAngle),
            1, 0, FULL_PI);
        ctx.fill();
    
        prevAngle += ANGLE_STEP;
    }
}

function launchSand(ctx, options) {

    SAND_RADIUS = Math.min(options.height, options.width) * 0.4;

    if (launchSand.lastAnimation) {
        launchSand.lastAnimation.keepAnimating = false;
    }
    var lastAnimation = animate({
        duration: 1000.0,
        timing: function(t) {
            return t; 
        },
        draw: function(fraction) {
            drawSand(ctx, options);
        },
        repeatCount: REPEAT_COUNT_INFINITY,
    });
}
