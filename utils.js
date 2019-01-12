
function throttle(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(function() {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    };
    obj.addEventListener(type, func);
}

function animate(options) {

    var animation = {
        keepAnimating: true,
    };

    var start = performance.now();  
    requestAnimationFrame(function animate(time) {
      
      var timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;
  
      var progress = options.timing(timeFraction)
  
      options.draw(progress);
  
      if (timeFraction < 1 && animation.keepAnimating) {
        requestAnimationFrame(animate);
      }
    });

    return animation;
}

function animateBetween(a, b, u) {
    return (1 - u) * a + u * b;
}

function Point(x, y) {
    this.x = parseFloat(x.toFixed(4));
    this.y = parseFloat(y.toFixed(4));
}

Point.prototype.add = function(other) {
    return new Point(this.x + other.x, this.y + other.y);
}

Point.prototype.sub = function(other) {
    return new Point(this.x - other.x, this.y - other.y);
};

Point.prototype.dist = function(other) {
    return Math.hypot(this.x - other.x, this.y - other.y);
}

Point.prototype.len = function() {
    return Math.hypot(this.x, this.y);
}

Point.prototype.mult = function(k) {
    return new Point(this.x * k, this.y * k);
}

Point.prototype.div = function(k) {
    return new Point(this.x / k, this.y / k);
}

function toDegrees(rad) {
    return rad * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
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

function getTextSize(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextSize.canvas || (getTextSize.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);

    return new Point(metrics.width, 32);
}