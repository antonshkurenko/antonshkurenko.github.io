import {angleBetweenTwoDots, FULL_PI, Point, repeat} from "../utils/utils";

const CIRCLE_RADIUS = 5;
const CIRCLES_BY_STEP = 1;

function drawCircles(ctx, options) {

    for (let i = 0; i < CIRCLES_BY_STEP; i++) {

        let point = new Point(Math.random() * options.width, Math.random() * options.height);
        let radius = Math.floor(Math.random() * 50) + CIRCLE_RADIUS;

        let grd;
        if (options.center.isInside(point, radius)) {
            grd = ctx.createRadialGradient(
                options.center.x,
                options.center.y,
                1,
                point.x,
                point.y,
                radius
            );
        } else {
            let alpha = angleBetweenTwoDots(point, options.center);
            let cosAlphaR = Math.cos(alpha) * radius;
            let sinAlphaR = Math.sin(alpha) * radius;

            grd = ctx.createLinearGradient(
                point.x + cosAlphaR,
                point.y + sinAlphaR,
                point.x - cosAlphaR,
                point.y - sinAlphaR
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

// todo: improve
function drawCirclesV2(ctx, options) {

    for (let i = 0; i < CIRCLES_BY_STEP; i++) {

        let point = new Point(Math.random() * options.width, Math.random() * options.height);
        let radius = Math.floor(Math.random() * 50) + CIRCLE_RADIUS;

        let grd = ctx.createRadialGradient(
            options.center.x,
            options.center.y,
            1,
            options.center.x,
            options.center.y,
            options.center.len()
        );

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

export function launchCircles(ctx, options) {

    if (launchCircles.lastAnimation) {
        launchCircles.lastAnimation.keepAnimating = false;
    }

    launchCircles.lastAnimation = repeat(
        () => {
            drawCircles(ctx, options);
        }, 25
    );
}

