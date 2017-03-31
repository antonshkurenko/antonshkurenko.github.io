var RADIUS_KOEF = 0.8;
var MAX_RADIUS_KOEF_SQR = 16/9; // 4/3

function throttle(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
      if (running) { return; }
      running = true;
       requestAnimationFrame(function() {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
      });
  };
  obj.addEventListener(type, func);
}

function Point(x, y) {
  this.x = parseFloat(x.toFixed(4));
  this.y = parseFloat(y.toFixed(4));
}

Point.prototype.add = function (other) {
  return new Point(this.x + other.x, this.y + other.y);
}

Point.prototype.sub = function (other) {
  return new Point(this.x - other.x, this.y - other.y);
};

Point.prototype.dist = function(other) {
  return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
}

Point.prototype.len = function() {
  return Math.sqrt(this.x*this.x + this.y*this.y);
}

Point.prototype.mult = function(k) {
  return new Point(this.x*k, this.y*k);
}

Point.prototype.div = function(k) {
  return new Point(this.x/k, this.y/k);
}

function getTextSize(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextSize.canvas || (getTextSize.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);

    return new Point(metrics.width, 32);
}

function clampToRadius(center, actualPoint, radius) {
  var offset = actualPoint.sub(center);
  var distance = offset.len();

  if(distance < radius) {
    return actualPoint;
  } else {
    var direction = offset.div(distance);
    return center.add(direction.mult(radius));
  }
}

function getZ(x, y, radiusSqr) {
  var zSqr = radiusSqr - x*x - y*y;

  /**
   * Sometimes in case of decimals Z can be something like -2
   * ignore such values
   */
  if(zSqr > 0) {
    return Math.sqrt(zSqr);
  } else {
    return 0.01 * Math.sqrt(radiusSqr);
  }
}

function getKx(y, z) {
  return -y/z;
}

function getKy(x, z) {
  return -x/z;
}

function getKz(x, y) {
  return -x/y;
}

function toDegrees (rad) {
  return rad * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function getActualCoord(element, elementSize) {
  var rect = element.getBoundingClientRect();
  return new Point(rect.left + elementSize.x/2, rect.top - elementSize.y/2);
}

function smallestRotateDirection(current, newAngle) {
      var aR;
      current = current || 0; // if rot undefined or 0, make 0, else rot
      aR = current % 360;
      if ( aR < 0 ) { aR += 360; }
      if ( aR < 180 && (newAngle > (aR + 180)) ) { current -= 360; }
      if ( aR >= 180 && (newAngle <= (aR - 180)) ) { current += 360; }
      current += (newAngle - aR);

      return current;
}

window.addEventListener('load', function(e) {

  var letters = document.getElementsByClassName('letter');
  var body = document.getElementsByTagName('body')[0];

  // const
  var letterSizes = [];
  var letterDataDepths = [];

  // mutable
  var letterRadiusSqrs = new Array(letters.length).fill(0);
  var letterStartPositions = new Array(letters.length).fill(0);
  var letterZAngles = new Array(letters.length).fill(0);

  var totalWidth = 0;
  for (var i = 0; i < letters.length; i++) {
    var current = letters[i];

    var size = getTextSize(current.textContent, "32px Roboto");

    letterSizes.push(size);
    totalWidth += size.x;

    var parent = current.parentElement;

    parent.setAttribute("data-index", i);
    var dataDepth = parent.getAttribute("data-depth");
    letterDataDepths.push(dataDepth);
  }

  MAX_RADIUS = (Math.min(body.clientWidth, body.clientHeight) / 2) * RADIUS_KOEF;
  MAX_RADIUS_SQR = MAX_RADIUS * MAX_RADIUS * MAX_RADIUS_KOEF_SQR;

  for (var i = 0; i < letters.length; i++) {
    letterRadiusSqrs[i] = letterDataDepths[i] * letterDataDepths[i] * MAX_RADIUS_SQR;
  }

  var negativeOffset = -totalWidth / 2;

  var scene = document.getElementById('name-scene');
  var parallax = new Parallax(scene, {
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
        var index = parseInt(element.getAttribute("data-index"));
        return clampToRadius(new Point(0, 0),
           new Point(x, y), MAX_RADIUS * letterDataDepths[index]);
      }
  });

  var offset = 0;
  for (var i = 0; i < letters.length; i++) {
    var current = letters[i];

    current.parentElement.style.left = (negativeOffset + offset) + "px";
    offset += letterSizes[i].x;
  }

  var init = function() {

    for (var i = 0; i < letters.length; i++) {

      var values = letters[i].parentElement.style.transform.split('(')[1];

      values = values.split(',');
      var a = parseFloat(values[0], 10);
      var b = parseFloat(values[1], 10);

      letterStartPositions[i] = getActualCoord(letters[i], letterSizes[i])
        .sub(new Point(a, b));
    }
  }

  init();

  throttle("resize", "optimizedResize", window);

  window.addEventListener('optimizedResize', function(e) {
    init();

    MAX_RADIUS = (Math.min(body.clientWidth, body.clientHeight) / 2) * 0.8;
    MAX_RADIUS_SQR = MAX_RADIUS * MAX_RADIUS * MAX_RADIUS_KOEF_SQR;

    for (var i = 0; i < letters.length; i++) {
      letterRadiusSqrs[i] = letterDataDepths[i] * letterDataDepths[i] * MAX_RADIUS_SQR;
    }

    parallax.limit(MAX_RADIUS, MAX_RADIUS);
  });

  window.addEventListener('mousemove', function(e) {

    for (var i = 0; i < letters.length; i++) {
      var current = letters[i];
      var center = letterStartPositions[i];
      var actualCoord = getActualCoord(current, letterSizes[i]).sub(center);

      var z = getZ(actualCoord.x, actualCoord.y, letterRadiusSqrs[i]);

      var kx = getKx(actualCoord.y, z);
      var ky = getKy(actualCoord.x, z);
      var kz = getKz(actualCoord.x, actualCoord.y);

      var xAngle = Math.atan(kx) + Math.PI;
      var yAngle = Math.atan(ky) + Math.PI;
      var zAngle = Math.atan(kz);

      if (actualCoord.y > 0) {
        zAngle += Math.PI;
      } else {
        if (actualCoord.x < 0) {
          zAngle += 2 * Math.PI;
        }
      }

      xAngle = toDegrees(xAngle);
      yAngle = toDegrees(yAngle);
      zAngle = toDegrees(zAngle);

      zAngle = smallestRotateDirection(letterZAngles[i], zAngle);
      letterZAngles[i] = zAngle;

      current.style.transform = "rotateX(" + xAngle +
        "deg) rotateY(" + yAngle +
        "deg) rotateZ(" + zAngle +
        "deg)";
    }
  });
});
