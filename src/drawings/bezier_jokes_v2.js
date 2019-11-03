import {createCirclePoints, drawAsSpline, FULL_PI, Point, repeat, tweak} from "../utils/utils";

const RADIUS = 200;
const POINTS_AMOUNT = Math.random() * 30 + 25;

// simple
function randomTweaksV2V1(points) {
    return points.map(p => p.add(
        new Point(
            tweak(3),
            tweak(3)
        )));
}

// idx matters
function randomTweaksV2V2(points) {
    // not now, invent something better later
    return randomTweaksV2V1(points);
    // return points.map(function (p, idx, arr) {
    //     return p.add(
    //         new Point(
    //             tweak(5 * idx / arr.length),
    //             tweak(5 * idx / arr.length)
    //         ));
    // });
}

const tweaks = [randomTweaksV2V1, randomTweaksV2V2];

let points = createCirclePoints(RADIUS, Math.random() * FULL_PI, POINTS_AMOUNT);

function drawBezierV2(ctx, options, tweakFunc) {

    ctx.setLineDash([1, 1 + 6 * Math.random()]);
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.strokeStyle = "rgba(0,0,0,0.05)";
    ctx.lineJoin = "round";
    ctx.lineWidth = 1;

    points = tweakFunc(points);

    drawAsSpline(ctx, points.map(p => p.add(options.center)));
}

export function launchBezierV2(ctx, options) {

    if (launchBezierV2.lastAnimation) {
        launchBezierV2.lastAnimation.keepAnimating = false;
    }

    let tweakFunc = tweaks[Math.floor(Math.random() * tweaks.length)];

    launchBezierV2.lastAnimation = repeat(
        () => {
            drawBezierV2(ctx, options, tweakFunc);
        }, 16
    );
}

