import {animateBetween, clampToRadius, FULL_PI, getTextSize, Point, smallestRotateDirection, toDegrees} from "./utils/utils";

const RADIUS_COEF = 0.8;
const MAX_RADIUS_COEF_SQR = 16 / 9; // 4/3

let MAX_RADIUS;
let MAX_RADIUS_SQR;

function getZ(x, y, radiusSqr) {
    let zSqr = radiusSqr - x * x - y * y;

    /**
     * Sometimes in case of decimals Z can be something like -2
     * ignore such values
     */
    if (zSqr > 0) {
        return Math.sqrt(zSqr);
    } else {
        return 0.01 * Math.sqrt(radiusSqr);
    }
}

function getKx(y, z) {
    return -y / z;
}

function getKy(x, z) {
    return -x / z;
}

function getKz(x, y) {
    return -x / y;
}

function getActualCoord(element, elementSize) {
    let rect = element.getBoundingClientRect();
    return new Point(rect.left + elementSize.x / 2, rect.top - elementSize.y / 2);
}

window.addEventListener('load', function (e) {

    let i;
    let letters = document.getElementsByClassName('letter');
    let body = document.getElementsByTagName('body')[0];

    // const
    let letterSizes = [];
    let letterDataDepths = [];
    // antOn sHkUrENNkO
    let ohuenno = [3, 7, 9, 11, 12, 13, 15];

    // mutable
    let letterRadiusSqrs = new Array(letters.length)
        .fill(0);
    let letterStartPositions = new Array(letters.length)
        .fill(0);
    let letterZAngles = new Array(letters.length)
        .fill(0);

    let totalWidth = 0;
    for (let i = 0; i < letters.length; i++) {
        let current = letters[i];

        let size = getTextSize(current.textContent, "32px Roboto");

        letterSizes.push(size);
        totalWidth += size.x;

        let parent = current.parentElement;

        parent.setAttribute("data-index", i.toString());
        let dataDepth = parent.getAttribute("data-depth");
        letterDataDepths.push(dataDepth);
    }

    MAX_RADIUS = (Math.min(body.clientWidth, body.clientHeight) / 2) * RADIUS_COEF;
    MAX_RADIUS_SQR = MAX_RADIUS * MAX_RADIUS * MAX_RADIUS_COEF_SQR;

    for (let i = 0; i < letters.length; i++) {
        letterRadiusSqrs[i] = letterDataDepths[i] * letterDataDepths[i] * MAX_RADIUS_SQR;
    }

    let scene = document.getElementById('name-scene');
    let parallax = new Parallax(scene, {
        calibrateX: false,
        calibrateY: false,
        invertX: false,
        invertY: false,
        limitX: MAX_RADIUS,
        limitY: MAX_RADIUS,
        scalarX: 2500,
        scalarY: 2500,
        frictionX: 0.3,
        frictionY: 0.3,
        originX: 0.5,
        originY: 0.5,
        clampFunc: function (element, x, y) {
            let index = parseInt(element.getAttribute("data-index"));
            return clampToRadius(new Point(0, 0),
                new Point(x, y), MAX_RADIUS * letterDataDepths[index]);
        }
    });

    let firstNOffset = 0;

    let negativeOffset = -totalWidth / 2;
    let offset = 0;
    for (let i = 0; i < letters.length; i++) {
        let current = letters[i];

        if (current.parentElement.id === "first_n") {
            firstNOffset = (negativeOffset + offset)
        }

        if (current.parentElement.id === "second_n") {
            current.parentElement.style.left = firstNOffset + "px";
        } else {
            current.parentElement.style.left = (negativeOffset + offset) + "px";
            offset += letterSizes[i].x;
        }
    }

    let init = () => {

        for (let i = 0; i < letters.length; i++) {

            let values = letters[i].parentElement.style.transform.split('(')[1];

            let [_a, _b] = values.split(',');
            let a = parseFloat(_a);
            let b = parseFloat(_b);

            letterStartPositions[i] = getActualCoord(letters[i], letterSizes[i])
                .sub(new Point(a, b));
        }
    };

    init();

    window.addEventListener('optimizedResize', () => {
        init();

        MAX_RADIUS = (Math.min(body.clientWidth, body.clientHeight) / 2) * 0.8;
        MAX_RADIUS_SQR = MAX_RADIUS * MAX_RADIUS * MAX_RADIUS_COEF_SQR;

        for (var i = 0; i < letters.length; i++) {
            letterRadiusSqrs[i] = letterDataDepths[i] * letterDataDepths[i] * MAX_RADIUS_SQR;
        }

        parallax.limit(MAX_RADIUS, MAX_RADIUS);
    });

    window.addEventListener('mousemove', () => {

        for (let i = 0; i < letters.length; i++) {
            let current = letters[i];
            let center = letterStartPositions[i];
            let actualCoord = getActualCoord(current, letterSizes[i])
                .sub(center);

            if (ohuenno.indexOf(i) >= 0) {
                let percentage = actualCoord.len() / Math.sqrt(letterRadiusSqrs[i]);
                let r = Math.round(animateBetween(0, 255, percentage));
                let g = Math.round(animateBetween(0, 0, percentage));
                let b = Math.round(animateBetween(0, 0, percentage));
                current.style.color = `rgb(${r},${g},${b})`;
            }

            let z = getZ(actualCoord.x, actualCoord.y, letterRadiusSqrs[i]);

            let kx = getKx(actualCoord.y, z);
            let ky = getKy(actualCoord.x, z);
            let kz = getKz(actualCoord.x, actualCoord.y);

            let xAngle = Math.atan(kx) + Math.PI;
            let yAngle = Math.atan(ky) + Math.PI;
            let zAngle = Math.atan(kz);

            if (actualCoord.y > 0) {
                zAngle += Math.PI;
            } else {
                if (actualCoord.x < 0) {
                    zAngle += FULL_PI;
                }
            }

            xAngle = toDegrees(xAngle);
            yAngle = toDegrees(yAngle);
            zAngle = toDegrees(zAngle);

            zAngle = smallestRotateDirection(letterZAngles[i], zAngle);
            letterZAngles[i] = zAngle;

            current.style.transform = `rotateX(${xAngle}deg) rotateY(${yAngle}deg) rotateZ(${zAngle}deg)`;
        }
    });
});
