var MAX_IMAGES = 26;

function randomBackground () {
	var imageName;
	do{
		var random = Math.floor(Math.random() * MAX_IMAGES)  + 1;
		imageName = "image_";
		if (random < 10) {
			imageName = imageName + "00" + random;
		} else if (random < 100) {
			imageName = imageName + "0" + random;
		}
	} while(findInArray(imageName) != -1)
	
	arrayOfRandomBackgrounds[arrayOfRandomBackgrounds.length] = imageName;

	if(arrayOfRandomBackgrounds.length == MAX_IMAGES) {
		arrayOfRandomBackgrounds = [];
	}

	imageName = "img/" + imageName + ".jpg";

	var images = document.getElementsByClassName("swapped");

	$('#next-image').css("background-image", "url('" + imageName + "')");
	$('#current-image').fadeOut(
	    2000,
	    function() { $(this).css("background-image", $('#next-image').css('background-image')).fadeIn(2000); }
	);

	for (var i = images.length - 1; i >= 0; i--) {
	
		images[i].style.backgroundRepeat = "no-repeat";

		var cover = "cover";
		images[i].style['-webkit-background-size'] = cover;
		images[i].style['-moz-background-size'] = cover;
		images[i].style['-o-background-size'] = cover;
		images[i].style['background-size'] = cover;

		images[i].style.backgroundAttachment = "fixed";

		images[i].style.backgroundPosition = "left bottom";

		images[i].innerHTML = imageName + " " + arrayOfRandomBackgrounds.length + 
			" array: " + arrayOfRandomBackgrounds;
	};
}

window.onload = randomBackground;
window.setInterval(randomBackground, 10000);

var arrayOfRandomBackgrounds = [];
function findInArray (name) {
	for (var i = arrayOfRandomBackgrounds.length - 1; i >= 0; i--) {
		if(name == arrayOfRandomBackgrounds[i]) {
			return name;
		}
	};
	return -1;
}