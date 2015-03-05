var MAX_IMAGES = 25;

window.onload = function() {
	for (var i = 0; i < 25; i++) {
		getRandomName();
	};

	$('#bg').backstretch(arrayOfRandomBackgrounds, {duration: 3000, fade: 1500});

	// Tooltip only Text
	$('.hovered').hover(function(){
	    // Hover over code
	    var title = $(this).attr('title');
	    $(this).data('tipText', title).removeAttr('title');
	    $('<p class="tooltip"></p>')
	    	.text(title)
	    	.appendTo('body')
	    	.fadeIn('slow');
	}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
	}).mousemove(function(e) {
        var mousex = e.pageX + 15; //Get X coordinates
        var mousey = e.pageY + 5; //Get Y coordinates
        $('.tooltip')
        	.css({ top: mousey, left: mousex })
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
