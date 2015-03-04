var MAX_IMAGES = 25;

function randomBackground () {

	var active = $('#background .active');
	var next = ($('#background .active').next().length > 0) ? $('#background .active').next() : $('#background img:first');
	next.attr('src', getRandomName());

	var imgHeight = next.height();
	var windowHeight = $(window).height();

	var diff = imgHeight - windowHeight;

	if(diff > 0) {
		next.css('top', -diff*0.6);
	}

	next.css('z-index', 2);

	active.fadeOut(1500, function() {
		active.css('z-index', 1).show().removeClass('active');
		next.css('z-index', 3).addClass('active');
	})
}

window.onload = function() {
	$('#background .active').attr('src', getRandomName());
	$('#background').fadeIn(1500);
	setInterval(randomBackground, 5000)
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
	
	arrayOfRandomBackgrounds[arrayOfRandomBackgrounds.length] = imageName;

	if(arrayOfRandomBackgrounds.length == MAX_IMAGES) {
		arrayOfRandomBackgrounds = [];
	}

	imageName = "img/" + imageName + ".jpg";

	return imageName;
}