function Point(x, y) {
  this.x = x;
  this.y = y;
}

function getTextSize(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextSize.canvas || (getTextSize.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);

    return new Point(metrics.width, 32);
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
      limitX: false,
      limitY: false,
      scalarX: 2500,
      scalarY: 2500,
      frictionX: 0.2,
      frictionY: 0.2,
      originX: 0.5,
      originY: 0.5
  });

  var offset = 0;
  var negativeOffset = -totalWidth / 2;
  for (var i = 0; i < letters.length; i++) {
    var current = letters[i];

    current.parentElement.style.left = (negativeOffset + offset) + "px";
    offset += letterSizes[i].x;
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
  http://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
  */
  body.onmousemove = function(e) {
    console.log("Mouse move: " + e.clientX + ", " + e.clientY);
  };
}
