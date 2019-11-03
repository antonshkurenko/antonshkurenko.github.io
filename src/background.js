import {Point} from "./utils/utils";
import {launchWaves} from "./drawings/waves";
import {launchSand} from "./drawings/sand";
import {launchCircles} from "./drawings/circles";
import {launchBezier} from "./drawings/bezier_jokes";
import {launchBezierV2} from "./drawings/bezier_jokes_v2";
import {launchRandomSymmetryArt} from "./drawings/random_symmetry";

const animations = [
    launchWaves, // credits to https://medium.com/s23nyc-tech/geometric-android-animations-using-the-canvas-dd687c43f3f4
    launchSand, // credits to incovergent
    launchCircles,
    launchBezier,
    launchBezierV2, // credits to incovergent
    launchRandomSymmetryArt // credits to atticusbones
];

const center = new Point(0, 0);

window.addEventListener('load', () => {

    let canvas = document.getElementById('bg-canvas');
    let ctx = canvas.getContext('2d');

    let body = document.getElementsByTagName('body')[0];

    let animation = animations[Math.floor(Math.random() * animations.length)];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        center.x = body.clientWidth * 0.5;
        center.y = body.clientHeight * 0.5;

        animation(ctx, {
            center: center,
            height: canvas.height,
            width: canvas.width
        });
    }

    resizeCanvas();

    window.addEventListener('optimizedResize', () => {
        resizeCanvas();
    });
});

