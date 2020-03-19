export const FULL_PI = Math.PI * 2;

export function throttle(type, name, obj) {
    obj = obj || window;
    let running = false;
    let func = () => {
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(() => {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    };
    obj.addEventListener(type, func);
}

export const REPEAT_COUNT_INVERSE = -1;
export const REPEAT_COUNT_INFINITY = -2;

/**
 *
 * @param options
 *        - duration
 *        - timing convert time to progress
 *        - draw
 *        - repeatCount
 * @returns {{keepAnimating: boolean}} set keepAnimating to false, if you want to stop animation
 */
export function animate(options) {

    let animation = {
        keepAnimating: true,
    };

    let start = performance.now();
    requestAnimationFrame(function animate(time) {

        let timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;
        if (timeFraction < 0) timeFraction = 0;

        let progress = options.timing(timeFraction);

        options.draw(progress);

        if (animation.keepAnimating) {
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            } else {
                let restart = true;
                if (options.repeatCount === REPEAT_COUNT_INVERSE) {
                    let prevTiming = options.timing;
                    options.timing = t => prevTiming(1 - t);
                    options.repeatCount = 0;
                } else if (options.repeatCount === REPEAT_COUNT_INFINITY) {

                } else if (options.repeatCount > 0) {
                    options.repeatCount--;
                } else {
                    restart = false;
                }

                if (restart) {
                    start = performance.now();
                    requestAnimationFrame(animate);
                }
            }
        }
    });

    return animation;
}

export function repeat(drawFunc, repeat) {
    let animation = {
        keepAnimating: true
    };
    let id = setInterval(() => {
        if (!animation.keepAnimating) {
            clearInterval(id);
        } else {
            requestAnimationFrame(drawFunc);
        }
    }, repeat);

    return animation;
}

export function animateBetween(a, b, u) {
    return (1 - u) * a + u * b;
}

export class Point {

    constructor(x, y) {
        this.x = parseFloat(x.toFixed(4));
        this.y = parseFloat(y.toFixed(4));
    }

    connect(other, ctx) {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(other.x, other.y);
    }

    add(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }

    sub(other) {
        return new Point(this.x - other.x, this.y - other.y);
    }

    dist(other) {
        return Math.hypot(this.x - other.x, this.y - other.y);
    }

    len() {
        return Math.hypot(this.x, this.y);
    }

    mult(k) {
        return new Point(this.x * k, this.y * k);
    }

    div(k) {
        return new Point(this.x / k, this.y / k);
    }

    isInside(center, radius) {
        return this.dist(center) <= radius;
    }
}

export function angleBetweenTwoDots(first, second) {
    return Math.atan2(second.y - first.y, second.x - first.x);
}

export function toDegrees(rad) {
    return rad * (180 / Math.PI);
}

export function toRadians(angle) {
    return angle * (Math.PI / 180);
}

export function polarToX(r, theta) {
    return r * Math.cos(theta);
}

export function polarToY(r, theta) {
    return r * Math.sin(theta);
}

export function smallestRotateDirection(current, newAngle) {
    let aR;
    current = current || 0; // if rot undefined or 0, make 0, else rot
    aR = current % 360;
    if (aR < 0) {
        aR += 360;
    }
    if (aR < 180 && (newAngle > (aR + 180))) {
        current -= 360;
    }
    if (aR >= 180 && (newAngle <= (aR - 180))) {
        current += 360;
    }
    current += (newAngle - aR);

    return current;
}

export function clampToRadius(center, actualPoint, radius) {
    let offset = actualPoint.sub(center);
    let distance = offset.len();

    if (distance < radius) {
        return actualPoint;
    } else {
        let direction = offset.div(distance);
        return center.add(direction.mult(radius));
    }
}

export function clamp(val, min, max) {
    if (val <= min) {
        return min;
    } else if (val >= max) {
        return max;
    } else {
        return val;
    }
}

export function getTextSize(text, font) {
    // re-use canvas object for better performance
    let canvas = getTextSize.canvas || (getTextSize.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);

    return new Point(metrics.width, 32);
}

export function createCirclePoints(radius, startAngle, amount) {
    let step = FULL_PI / amount;
    let currentAngle = startAngle;
    let steps = [];
    for (let i = 0; i < amount; i++) {
        steps.push(new Point(polarToX(radius, currentAngle), polarToY(radius, currentAngle)));
        currentAngle += step;
    }

    return steps;
}

export function tweak(k) {
    return k * (-1 + Math.random() * 2)
}

export function getRnd(n, min, max) {
    let res = [];
    for (let i = 0; i < n; i++) {
        res.push(min + Math.random() * (max - min));
    }
    return res
}

export function getRndSign(n) {
    let res = [];
    for (let i = 0; i < n; i++) {
        Math.random() >= 0.5 ? res.push(-1) : res.push(1);
    }
    return res
}

// bezier code from: https://stackoverflow.com/a/31169371/4142087

// from: http://rosettacode.org/wiki/Evaluate_binomial_coefficients#JavaScript
export function binom(n, k) {
    let coeff = 1;
    for (let i = n - k + 1; i <= n; i++) coeff *= i;
    for (let i = 1; i <= k; i++) coeff /= i;
    return coeff;
}

// based on: https://stackoverflow.com/questions/16227300
export function bezier(t, plist) {
    let order = plist.length - 1;

    let y = 0;
    let x = 0;

    for (let i = 0; i <= order; i++) {
        x = x + (binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i].x));
        y = y + (binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i].y));
    }

    return {x, y};
}

// based on incovergent impl, but I think he took it from stackoverflow (I saw it there :) )
export function drawAsSpline(ctx, points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 2; i++) {
        let xm = (points[i].x + points[i + 1].x) / 2
            , ym = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xm, ym);
    }
    let end = points.length - 2;
    ctx.quadraticCurveTo(points[end].x, points[end].y, points[end + 1].x, points[end + 1].y);
    ctx.stroke();
}