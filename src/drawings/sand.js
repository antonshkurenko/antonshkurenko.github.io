import {FULL_PI, polarToX, polarToY, repeat} from "../utils/utils";

let SAND_RADIUS = 0;
const ANGLE_STEP = Math.PI / (180 * 4);
const STEP_AMOUNT = 100;

let prevDelta = 0;
let prevAngle = 0;

function drawSand(ctx, options) {

    ctx.fillStyle = "rgba(0,0,0,0.05)";

    for (let i = 0; i < STEP_AMOUNT; i++) {
        ctx.beginPath();

        prevDelta = prevDelta + (-1 + Math.random() * 2);

        let newR = SAND_RADIUS + prevDelta;

        ctx.arc(
            options.center.x + polarToX(newR, prevAngle),
            options.center.y + polarToY(newR, prevAngle),
            1, 0, FULL_PI);
        ctx.fill();

        prevAngle += (1 / newR);
    }
}

export function launchSand(ctx, options) {

    SAND_RADIUS = Math.min(options.height, options.width) * 0.4;

    if (launchSand.lastAnimation) {
        launchSand.lastAnimation.keepAnimating = false;
    }

    launchSand.lastAnimation = repeat(
        () => {
            drawSand(ctx, options);
        }, 16
    );
}
