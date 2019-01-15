CIRCLE_RADIUS = 5;
CIRCLES_BY_STEP = 1;

function drawCircles(ctx, options) {

    for (var i = 0; i < CIRCLES_BY_STEP; i++) {

        var point = new Point(Math.random() * options.width, Math.random() * options.height);
        var radius = Math.floor(Math.random() * 50) + CIRCLE_RADIUS; 

        var grd;
        if (center.isInside(point, radius)) {
            grd = ctx.createRadialGradient(
                center.x,
                center.y,
                1,
                point.x,
                point.y,
                radius
            );
        } else {
            var alpha = angleBetweenTwoDots(point, center);
            var cosAlphaR = Math.cos(alpha) * radius;
            var sinAlphaR = Math.sin(alpha) * radius;

            grd = ctx.createLinearGradient(
                point.x + cosAlphaR,
                point.y + sinAlphaR,
                point.x - cosAlphaR,
                point.y - sinAlphaR,
            );
        }

        grd.addColorStop(0, 'rgba(0,0,0,0.05)');
        grd.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grd;

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            radius, 0, FULL_PI);
        ctx.fill();
    }
}

function launchCircles(ctx, options) {

    if (launchCircles.lastAnimation) {
        launchCircles.lastAnimation.keepAnimating = false;
    }
    launchCircles.lastAnimation = animate({
        duration: 100.0,
        timing: function(t) {
            return t;
        },
        draw: function(fraction) {
            drawCircles(ctx, options, fraction);
        },
        repeatCount: REPEAT_COUNT_INFINITY,
        
    });
}

