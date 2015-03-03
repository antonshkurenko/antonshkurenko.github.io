var MAX_IMAGES = 26;

function randomBackground () {

	nextImage = $('#next-image');
	currImage = $('#current-image');

	var name = nextImage.css('background-image');

	if(name == 'none') {
		name = getRandomName();
		currImage.css("background-image", name).fadeIn(2000, function() {
			nextImage.css("background-image", "url('" + getRandomName() + "')");
		});
	} else {
		currImage.fadeOut(
	    	2000,
	    	function() {
	    		currImage.css("background-image", name).fadeIn(2000, function() {
	    			name = getRandomName();
	    			nextImage.css("background-image", "url('" + name + "')");
	    		}); 
			}
		);
	}

	var images = document.getElementsByClassName("swapped");
	for (var i = images.length - 1; i >= 0; i--) {
	
		images[i].style.backgroundRepeat = "no-repeat";

		var cover = "cover";
		images[i].style['-webkit-background-size'] = cover;
		images[i].style['-moz-background-size'] = cover;
		images[i].style['-o-background-size'] = cover;
		images[i].style['background-size'] = cover;

		images[i].style.backgroundAttachment = "fixed";

		images[i].style.backgroundPosition = "left bottom";
	};
}

window.onload = randomBackground;
window.setInterval(randomBackground, 15000);

var arrayOfRandomBackgrounds = [];
function findInArray (name) {
	for (var i = arrayOfRandomBackgrounds.length - 1; i >= 0; i--) {
		if(name == arrayOfRandomBackgrounds[i]) {
			return name;
		}
	};
	return -1;
}

function getRandomName() {
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

	return imageName;
}