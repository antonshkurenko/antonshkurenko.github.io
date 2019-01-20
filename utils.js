FULL_PI = Math.PI * 2;

function throttle(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function () {
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(function () {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    };
    obj.addEventListener(type, func);
}

REPEAT_COUNT_INVERSE = -1;
REPEAT_COUNT_INFINITY = -2;

function animate(options) {

    var animation = {
        keepAnimating: true,
    };

    var start = performance.now();
    requestAnimationFrame(function animate(time) {

        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;
        if (timeFraction < 0) timeFraction = 0;

        var progress = options.timing(timeFraction);

        options.draw(progress);

        if (animation.keepAnimating) {
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            } else {
                var restart = true;
                if (options.repeatCount == REPEAT_COUNT_INVERSE) {
                    var prevTiming = options.timing;
                    options.timing = function (t) {
                        return prevTiming(1 - t);
                    };
                    options.repeatCount = 0;
                } else if (options.repeatCount == REPEAT_COUNT_INFINITY) {

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

function repeat(drawFunc, repeat) {
    var animation = {
        keepAnimating: true
    };
    var id = setInterval(function () {
        if (!animation.keepAnimating) {
            clearInterval(id);
        } else {
            requestAnimationFrame(drawFunc);
        }
    }, repeat);

    return animation;
}

function animateBetween(a, b, u) {
    return (1 - u) * a + u * b;
}

function Point(x, y) {
    this.x = parseFloat(x.toFixed(4));
    this.y = parseFloat(y.toFixed(4));
}

Point.prototype.add = function (other) {
    return new Point(this.x + other.x, this.y + other.y);
};

Point.prototype.sub = function (other) {
    return new Point(this.x - other.x, this.y - other.y);
};

Point.prototype.dist = function (other) {
    return Math.hypot(this.x - other.x, this.y - other.y);
};

Point.prototype.len = function () {
    return Math.hypot(this.x, this.y);
};

Point.prototype.mult = function (k) {
    return new Point(this.x * k, this.y * k);
};

Point.prototype.div = function (k) {
    return new Point(this.x / k, this.y / k);
};

Point.prototype.isInside = function (center, radius) {
    return this.dist(center) <= radius;
};

function angleBetweenTwoDots(first, second) {
    return Math.atan2(second.y - first.y, second.x - first.x);
}

function toDegrees(rad) {
    return rad * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function polarToX(r, theta) {
    return r * Math.cos(theta);
}

function polarToY(r, theta) {
    return r * Math.sin(theta);
}

function smallestRotateDirection(current, newAngle) {
    var aR;
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

function clampToRadius(center, actualPoint, radius) {
    var offset = actualPoint.sub(center);
    var distance = offset.len();

    if (distance < radius) {
        return actualPoint;
    } else {
        var direction = offset.div(distance);
        return center.add(direction.mult(radius));
    }
}

function clamp(val, min, max) {
    if (val <= min) {
        return min;
    } else if (val >= max) {
        return max;
    } else {
        return val;
    }
}

function getTextSize(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextSize.canvas || (getTextSize.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);

    return new Point(metrics.width, 32);
}

function createCirclePoints(radius, startAngle, amount) {
    var step = FULL_PI / amount;
    var currentAngle = startAngle;
    var steps = [];
    for (var i = 0; i < amount; i++) {
        steps.push(new Point(polarToX(radius, currentAngle), polarToY(radius, currentAngle)));
        currentAngle += step;
    }

    return steps;
}

function tweak(k) {
    return k * (-1 + Math.random() * 2)
}

function getRnd(n, min, max) {
    for (var res = [], i = 0; i < n; i++) {
        res.push(min + Math.random() * (max - min));
    }
    return res
}

function getRndSign(n) {
    for (var res = [], i = 0; i < n; i++) {
        Math.random() >= 0.5 ? res.push(-1) : res.push(1);
    }
    return res
}

// bezier code from: https://stackoverflow.com/a/31169371/4142087

// from: http://rosettacode.org/wiki/Evaluate_binomial_coefficients#JavaScript
function binom(n, k) {
    var coeff = 1;
    for (var i = n - k + 1; i <= n; i++) coeff *= i;
    for (var i = 1; i <= k; i++) coeff /= i;
    return coeff;
}

// based on: https://stackoverflow.com/questions/16227300
function bezier(t, plist) {
    var order = plist.length - 1;

    var y = 0;
    var x = 0;

    for (i = 0; i <= order; i++) {
        x = x + (binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i].x));
        y = y + (binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i].y));
    }

    return {
        x: x,
        y: y
    };
}

// based on incovergent impl, but I think he took it from stackoverflow (I saw it there :) )
function drawAsSpline(ctx, points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length - 2; i++) {
        var xm = (points[i].x + points[i + 1].x) / 2
            , ym = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xm, ym);
    }
    var end = points.length - 2;
    ctx.quadraticCurveTo(points[end].x, points[end].y, points[end + 1].x, points[end + 1].y);
    ctx.stroke();
}