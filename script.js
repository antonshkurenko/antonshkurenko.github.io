window.onload = function() {

	for (var i = 0; i < 25; i++) {
		getRandomName();
	};

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
