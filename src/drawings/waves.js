import {animate, animateBetween, polarToX, polarToY, REPEAT_COUNT_INFINITY} from "../utils/utils";

let MAX_RADIUS_WAVES = 0;
let INIT_RADIUS_WAVES = 0;
const WAVE_GAP = 100;
const WAVE_AMPLITUDE = 30;

function drawCircleWaves(ctx, options, waveOffset) {
    ctx.clearRect(0, 0, options.width, options.height);

    let currentRadius = INIT_RADIUS_WAVES + waveOffset;

    while (currentRadius < MAX_RADIUS_WAVES) {

        let distanceFromCenter = currentRadius / MAX_RADIUS_WAVES;

        ctx.strokeStyle = 'rgba(0,0,0,' + distanceFromCenter + ')';

        drawWave(ctx, currentRadius, options.center, WAVE_AMPLITUDE * distanceFromCenter);

        currentRadius += WAVE_GAP;
    }
}

function calculateWaveR(offset, theta, nodeCount, amplitude) {
    return offset + amplitude * Math.sin(nodeCount * theta);
}

function drawWave(ctx, radius, offsetPoint, amplitude) {
    let increase = Math.PI / (180 * 1);

    let counter = 0;
    let x = polarToX(calculateWaveR(radius, counter, 10, amplitude), counter) + offsetPoint.x;
    let y = polarToY(calculateWaveR(radius, counter, 10, amplitude), counter) + offsetPoint.y;

    ctx.beginPath();
    while (counter < 2 * Math.PI) {

        ctx.moveTo(x, y);

        x = polarToX(calculateWaveR(radius, counter, 10, amplitude), counter) + offsetPoint.x;
        y = polarToY(calculateWaveR(radius, counter, 10, amplitude), counter) + offsetPoint.y;

        counter += increase;

        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

export function launchWaves(ctx, options) {

    let radius = options.center.len();

    MAX_RADIUS_WAVES = radius;
    INIT_RADIUS_WAVES = radius / WAVE_GAP;

    if (launchWaves.lastAnimation) {
        launchWaves.lastAnimation.keepAnimating = false;
    }
    launchWaves.lastAnimation = animate({
        duration: 5000.0,
        timing: t => animateBetween(0, WAVE_GAP, Math.abs(t)),
        draw: fraction => {
            drawCircleWaves(ctx, options, fraction);
        },
        repeatCount: REPEAT_COUNT_INFINITY,
    });
}

