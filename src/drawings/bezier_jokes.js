import {bezier, createCirclePoints, FULL_PI, Point, repeat, tweak} from "../utils/utils";

const RADIUS = 200;
const POINTS_AMOUNT = Math.random() * 30 + 50;//25;

// simple
function randomTweaksV1(points) {
    return points.map(p => p.add(
        new Point(
            tweak(20),
            tweak(20)
        )));
}

let points = createCirclePoints(RADIUS, Math.random() * FULL_PI, POINTS_AMOUNT);

function drawBezier(ctx, options) {

    ctx.fillStyle = "rgba(0,0,0,0.05)";

    points = randomTweaksV1(points);

    for (let i = 0; i < 1; i += (Math.random() * 0.006 + 0.001)) {

        ctx.beginPath();

        let point = bezier(i, points);

        ctx.arc(
            options.center.x + point.x,
            options.center.y + point.y,
            1, 0, FULL_PI);
        ctx.fill();
    }
}

export function launchBezier(ctx, options) {

    if (launchBezier.lastAnimation) {
        launchBezier.lastAnimation.keepAnimating = false;
    }

    launchBezier.lastAnimation = repeat(
        () => {
            drawBezier(ctx, options);
        }, 100
    );
}

