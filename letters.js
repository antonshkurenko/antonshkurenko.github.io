var RADIUS_COEF = 0.8;
var MAX_RADIUS_COEF_SQR = 16 / 9; // 4/3

function getZ(x, y, radiusSqr) {
    var zSqr = radiusSqr - x * x - y * y;

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
    var rect = element.getBoundingClientRect();
    return new Point(rect.left + elementSize.x / 2, rect.top - elementSize.y / 2);
}

window.addEventListener('load', function(e) {

    var letters = document.getElementsByClassName('letter');
    var body = document.getElementsByTagName('body')[0];

    // const
    var letterSizes = [];
    var letterDataDepths = [];
    // antOn sHkUrENNkO
    var ohuenno = [3,7,9,11,12,13,15];

    // mutable
    var letterRadiusSqrs = new Array(letters.length)
        .fill(0);
    var letterStartPositions = new Array(letters.length)
        .fill(0);
    var letterZAngles = new Array(letters.length)
        .fill(0);

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

    MAX_RADIUS = (Math.min(body.clientWidth, body.clientHeight) / 2) * RADIUS_COEF;
    MAX_RADIUS_SQR = MAX_RADIUS * MAX_RADIUS * MAX_RADIUS_COEF_SQR;

    for (var i = 0; i < letters.length; i++) {
        letterRadiusSqrs[i] = letterDataDepths[i] * letterDataDepths[i] * MAX_RADIUS_SQR;
    }

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
        clampFunc: function(element, x, y) {
            var index = parseInt(element.getAttribute("data-index"));
            return clampToRadius(new Point(0, 0),
                new Point(x, y), MAX_RADIUS * letterDataDepths[index]);
        }
    });

    var firstNOffset = 0;

    var negativeOffset = -totalWidth / 2;
    var offset = 0;
    for (var i = 0; i < letters.length; i++) {
        var current = letters[i];

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

    window.addEventListener('optimizedResize', function(e) {
        init();

        MAX_RADIUS = (Math.min(body.clientWidth, body.clientHeight) / 2) * 0.8;
        MAX_RADIUS_SQR = MAX_RADIUS * MAX_RADIUS * MAX_RADIUS_COEF_SQR;

        for (var i = 0; i < letters.length; i++) {
            letterRadiusSqrs[i] = letterDataDepths[i] * letterDataDepths[i] * MAX_RADIUS_SQR;
        }

        parallax.limit(MAX_RADIUS, MAX_RADIUS);
    });

    window.addEventListener('mousemove', function(e) {

        for (var i = 0; i < letters.length; i++) {
            var current = letters[i];
            var center = letterStartPositions[i];
            var actualCoord = getActualCoord(current, letterSizes[i])
                .sub(center);

            if (ohuenno.indexOf(i) >= 0) {
              var percentage = actualCoord.len() / Math.sqrt(letterRadiusSqrs[i]);
              var r = Math.round(animateBetween(0, 255, percentage));
              var g = Math.round(animateBetween(0, 0, percentage));
              var b = Math.round(animateBetween(0, 0, percentage));
              current.style.color = "rgb(" + r + "," + g + "," + b + ")";
            }

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
