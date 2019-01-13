var animations = [
    launchWaves,
];

center = new Point(0, 0);

canvasWidth = 0;
canvasHeight = 0;


window.addEventListener('load', function(e) {

    var canvas = document.getElementById('bg-canvas');
    var ctx = canvas.getContext('2d');

    var body = document.getElementsByTagName('body')[0];

    var animation = animations[0];

    function resizeCanvas() {
        canvas.width = canvasWidth = window.innerWidth;
        canvas.height = canvasHeight = window.innerHeight;

        center.x = body.clientWidth * 0.5;
        center.y = body.clientHeight * 0.5;
    
        animation(ctx, {
            center: center,
            height: canvasHeight,
            width: canvasWidth,
        });
    }
    resizeCanvas();

    window.addEventListener('optimizedResize', function(e) {
        resizeCanvas();
    });
});

