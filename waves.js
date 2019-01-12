MAX_RADIUS_WAVES = 0;
INIT_RADIUS_WAVES = 0;
WAVE_GAP = 50;

CENTER = new Point(0, 0);

CANVAS_WIDTH = 0;
CANVAS_HEIGHT = 0;

var waveOffset = 0;

function drawCircleWaves(ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    var currentRadius = INIT_RADIUS_WAVES + waveOffset
    while (currentRadius < MAX_RADIUS_WAVES) {
        ctx.beginPath();
        ctx.arc(CENTER.x, CENTER.y, currentRadius, 0, 2 * Math.PI);
        ctx.stroke();
        currentRadius += WAVE_GAP;
    }
}

function go(ctx) {

    if (go.lastAnimation) {
        go.lastAnimation.keepAnimating = false;
    }
    var lastAnimation = animate({
        duration: 5000.0,
        timing: function(t) {
            return animateBetween(0, WAVE_GAP, Math.abs(t)); 
        },
        draw: function(fraction) {
            waveOffset = fraction;
            drawCircleWaves(ctx);
        }
    });
}

window.addEventListener('load', function(e) {

    var canvas = document.getElementById('waves-canvas');
    var ctx = canvas.getContext('2d');

    var body = document.getElementsByTagName('body')[0];

    function resizeCanvas() {
        canvas.width = CANVAS_WIDTH = window.innerWidth;
        canvas.height = CANVAS_HEIGHT = window.innerHeight;

        CENTER.x = body.clientWidth * 0.5;
        CENTER.y = body.clientHeight * 0.5;

        var radius = CENTER.len();

        MAX_RADIUS_WAVES = radius;
        INIT_RADIUS_WAVES = radius / WAVE_GAP; 
    
        go(ctx); 
    }
    resizeCanvas();

    window.addEventListener('optimizedResize', function(e) {
        resizeCanvas();
    });
});
