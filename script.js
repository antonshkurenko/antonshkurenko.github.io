var MAX_RADIUS = 400;
var MAX_RADIUS_SQR = MAX_RADIUS * MAX_RADIUS;

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.add = function (other) {
  return new Point(this.x + other.x, this.y + other.y);
}

Point.prototype.sub = function (other) {
  return new Point(this.x - other.x, this.y - other.y);
};

Point.prototype.dist = function(other) {
  return Math.sqrt(Math.pow(this.x - other.x, 2) +
   Math.pow(this.y - other.y, 2));
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
    return 0;
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

function getActualCoord(element) {
  var rect = element.getBoundingClientRect();
  return new Point(rect.left, rect.top);
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

window.onload = function(e) {

  var letters = document.getElementsByClassName('letter');

  var letterSizes = [];

  var totalWidth = 0;

  for (var i = 0; i < letters.length; i++) {
    var current = letters[i];

    var size = getTextSize(current.textContent, "32px Roboto");

    letterSizes.push(size);
    totalWidth += size.x;
  }

  var scene = document.getElementById('name-scene');
  var parallax = new Parallax(scene, {
      calibrateX: false,
      calibrateY: false,
      invertX: false,
      invertY: false,
      limitX: MAX_RADIUS, // false
      limitY: MAX_RADIUS, // false
      scalarX: 2500,
      scalarY: 2500,
      frictionX: 0.2,
      frictionY: 0.2,
      originX: 0.5,
      originY: 0.5,
      clampFunc: function (element, x, y) {
        var index = parseInt(element.getAttribute("data-index"));
        return clampToRadius(new Point(0, 0),
           new Point(x, y), MAX_RADIUS * letterDataDepths[index]);
      }
  });

  var letterDataDepths = [];
  var letterRadiusSqrs = [];

  var offset = 0;
  var negativeOffset = -totalWidth / 2;
  for (var i = 0; i < letters.length; i++) {
    var current = letters[i];
    var parent = current.parentElement;

    parent.setAttribute("data-index", i);

    parent.style.left = (negativeOffset + offset) + "px";
    offset += letterSizes[i].x;

    var dataDepth = parent.getAttribute("data-depth");
    letterDataDepths.push(dataDepth);
    letterRadiusSqrs.push(dataDepth * dataDepth * MAX_RADIUS_SQR);
  }

  var letterStartPositions = [];

  for (var i = 0; i < letters.length; i++) {
    var current = letters[i];
    letterStartPositions.push(getActualCoord(current));
  }

  var body = document.getElementsByTagName('body')[0];

  /**
  Взять что-то за радиус?

  https://github.com/wagerfield/parallax

  data-depth коеффициент?
  посмотреть сферу. В нуле все находится изначально,
  после начинает оборачиваться и менять угол
  смотреть координаты каждого элемента и крутить его
  в зависимости от удаления от центра крутить по x, y, z?

  сделать радиус -- лимит? взять меньшее высота--ширина экрана на 2

  через радиус и координаты на плоскости ХУ вывести З

  угол наклона:

  взять радиус от нуля до точки,
  http://www.cleverstudents.ru/line_and_plane/line_passes_through_2_points.html
  через 0 и точку
  далее угол наклона через проекции на XY, YZ, XZ

  http://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
  */

  var letterZAngles = new Array(letters.length).fill(0);

  body.onmousemove = function(e) {

    for (var i = 0; i < letters.length; i++) {
      var current = letters[i];
      var center = letterStartPositions[i];
      var actualCoord = getActualCoord(current).sub(center);

      var z = getZ(actualCoord.x, actualCoord.y, MAX_RADIUS_SQR * letterDataDepths[i] * letterDataDepths[i]);

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

      xAngle = xAngle.clamp(120, 230);
      yAngle = yAngle.clamp(120, 230);

      zAngle = smallestRotateDirection(letterZAngles[i], zAngle);
      letterZAngles[i] = zAngle;

      current.style.transform = "rotateX(" + xAngle +
        "deg) rotateY(" + yAngle +
        "deg) rotateZ(" + zAngle +
        "deg)";
    }
  };
}
