var MAX_IMAGES = 25;

window.onload = function() {

	var left = localStorage.getItem("left") - 8; // magic numbers, it moved right for 8 px, I don't know why
    var top = localStorage.getItem("top");
    
    $('.draggable').css({ left: left + "px", top: top + "px", visibility: "visible" });
 
	for (var i = 0; i < 25; i++) {
		getRandomName();
	};

	$('#bg').backstretch(arrayOfRandomBackgrounds, {duration: 10000, fade: 1500});

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

	$('.draggable').draggable({ 
		drag: function () {
			$('.follower').css('left', ($(this).position().left + 474));
			$('.follower').css('top', $(this).position().top);
		},
		stop: function () {

        var left = $(this).position().left;
        var top = $(this).position().top;

        localStorage.setItem("left", left);
        localStorage.setItem("top", top);

        }, 
        scroll: 'false'
    });


	$('#songs-content').load('songs/songs.html');
	$('#songs-content').perfectScrollbar({
		suppressScrollX: true
	});
}

var arrayOfRandomBackgrounds = [];

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
	} while(arrayOfRandomBackgrounds.indexOf(imageName) != -1)

	imageName = "img/" + imageName + ".jpg";
	
	arrayOfRandomBackgrounds[arrayOfRandomBackgrounds.length] = imageName;

	if(arrayOfRandomBackgrounds.length == MAX_IMAGES + 1) {
		arrayOfRandomBackgrounds = [];
		arrayOfRandomBackgrounds[0] = imageName;
	}

	return imageName;
}
