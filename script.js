window.onload = function() {

	var entries = [ 

	{ label: 'Back to top', url: 'http://www.jqueryscript.net/tags.php?/Back%20to%20top/', target: '_top' },
	{ label: 'Bootstrap', url: 'http://www.jqueryscript.net/tags.php?/Bootstrap/', target: '_top' },
	{ label: 'Carousel', url: 'http://www.jqueryscript.net/tags.php?/carousel/', target: '_top' },
	{ label: 'Countdown', url: 'http://www.jqueryscript.net/tags.php?/countdown/', target: '_top' },
	{ label: 'Dropdown Menu', url: 'http://www.jqueryscript.net/tags.php?/Drop%20Down%20Menu/', target: '_top' },
	{ label: 'CodePen', url: 'http://codepen.io/', target: '_top' },
	{ label: 'three.js', url: 'http://threejs.org/', target: '_top' },
	{ label: 'Form Validation', url: 'http://www.jqueryscript.net/tags.php?/form%20validation/', target: '_top' },
	{ label: 'JS Compress', url: 'http://jscompress.com/', target: '_top' },
	{ label: 'TinyPNG', url: 'https://tinypng.com/', target: '_top' },
	{ label: 'Can I Use', url: 'http://caniuse.com/', target: '_top' },
	{ label: 'URL shortener', url: 'https://goo.gl/', target: '_top' },
	{ label: 'Grid Layout', url: 'http://www.jqueryscript.net/tags.php?/grid%20layout/', target: '_top' },
	{ label: 'Twitter', url: 'https://twitter.com/niklaswebdev', target: '_top' },
	{ label: 'deviantART', url: 'http://nkunited.deviantart.com/', target: '_top' },
	{ label: 'Gulp', url: 'http://gulpjs.com/', target: '_top' },
	{ label: 'Browsersync', url: 'https://www.browsersync.io/', target: '_top' },
	{ label: 'GitHub', url: 'https://github.com/', target: '_top' },
	{ label: 'Shadertoy', url: 'https://www.shadertoy.com/', target: '_top' },
	{ label: 'Tree View', url: 'http://www.jqueryscript.net/tags.php?/tree%20view/', target: '_top' },
	{ label: 'jsPerf', url: 'http://jsperf.com/', target: '_top' },
	{ label: 'Foundation', url: 'http://foundation.zurb.com/', target: '_top' },
	{ label: 'CreateJS', url: 'http://createjs.com/', target: '_top' },
	{ label: 'Velocity.js', url: 'http://julian.com/research/velocity/', target: '_top' },
	{ label: 'TweenLite', url: 'https://greensock.com/docs/#/HTML5/GSAP/TweenLite/', target: '_top' },
	{ label: 'jQuery', url: 'https://jquery.com/', target: '_top' },
	{ label: 'Notification', url: 'http://www.jqueryscript.net/tags.php?/Notification/', target: '_top' },
	{ label: 'Parallax', url: 'http://www.jqueryscript.net/tags.php?/parallax/', target: '_top' }

	];

	var settings = {

		entries: entries,
		width: 480,
		height: 480,
		radius: '65%',
		radiusMin: 75,
		bgDraw: false,
		opacityOver: 1.00,
		opacityOut: 0.05,
		opacitySpeed: 8,
		fov: 800,
		speed: 1,
		fontFamily: 'Oswald, Arial, sans-serif',
		fontSize: '15',
		fontColor: '#f00',
    	fontWeight: 'normal',//bold
    	fontStyle: 'normal',//italic 
    	fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    	fontToUpperCase: true
	};
    $( '#tag-cloud' ).svg3DTagCloud( settings );

}