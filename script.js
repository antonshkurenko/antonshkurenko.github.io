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

    console.log("Text: " + current.textContent);

    var size = getTextSize(current.textContent, "32px Roboto");

    letterSizes.push(size);
    totalWidth += size.x;
  }

  console.log(letterSizes);
  console.log("Total width: " + totalWidth);

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
      frictionX: 0.4,
      frictionY: 0.4,
      originX: 0.5,
      originY: 0.5
  });

  var offset = 0;
  var negativeOffset = -totalWidth / 2;
  for (var i = 0; i < letters.length; i++) {
    var current = letters[i];

    current.style.top = "0px";

    current.style.left = negativeOffset + offset + "px";
    offset += letterSizes[i].x;
  }

  //parallax.updateLayers();
}
