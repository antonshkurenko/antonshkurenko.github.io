var MAX_IMAGES = 25;

window.onload = function() {
	for (var i = 0; i < 25; i++) {
		getRandomName();
	};

	$('#bg').backstretch(arrayOfRandomBackgrounds, {duration: 3000, fade: 1500});

	$('.target').blurjs({
    	source: '#bg .backstretch img',
    	radius: 7,
   		overlay: 'rgba(255,255,255,0.4)'
	});
}

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

	imageName = "img/" + imageName + ".jpg";
	
	arrayOfRandomBackgrounds[arrayOfRandomBackgrounds.length] = imageName;

	if(arrayOfRandomBackgrounds.length == MAX_IMAGES + 1) {
		arrayOfRandomBackgrounds = [];
		arrayOfRandomBackgrounds[0] = imageName;
	}

	return imageName;
}
