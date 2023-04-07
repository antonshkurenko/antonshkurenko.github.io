import p5 from "p5";

let sketchPerlinNoiseBezier = (p: p5) => {
    let t = 0;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.stroke(0, 18);
        p.noFill();
    };

    p.draw = () => {
        var x1 = p.width * p.noise(t + 15);
        var x2 = p.width * p.noise(t + 25);
        var x3 = p.width * p.noise(t + 35);
        var x4 = p.width * p.noise(t + 45);
        var y1 = p.height * p.noise(t + 55);
        var y2 = p.height * p.noise(t + 65);
        var y3 = p.height * p.noise(t + 75);
        var y4 = p.height * p.noise(t + 85);

        p.bezier(x1, y1, x2, y2, x3, y3, x4, y4);

        t += 0.005;

        // clear the background every 500 frames using mod (%) operator
        if (p.frameCount % 500 == 0) {
            p.background(255);
        }
    };
};

let sketchPerlinNoiseBezierCircle = (p: p5) => {
    let t = 0;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(255);
        p.stroke(0, 15);
        p.noFill();
    };

    p.draw = () => {
        p.translate(p.width / 2, p.height / 2);
        p.beginShape();
        for (var i = 0; i < 200; i++) {
            var ang = p.map(i, 0, 200, 0, p.TWO_PI);
            var rad = 200 * p.noise(i * 0.01, t * 0.005);
            var x = rad * p.cos(ang);
            var y = rad * p.sin(ang);
            p.curveVertex(x, y);
        }
        p.endShape(p.CLOSE);

        t += 1;

        // clear the background every 600 frames using mod (%) operator
        if (p.frameCount % 600 == 0) {
            p.background(255);
        }
    };
};

let sketchPerlinNoiseBezierCircle2 = (p: p5) => {
    let t = 0;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(255);
        p.stroke(0, 15);
        p.noFill();
    };

    p.draw = () => {
        p.translate(p.width / 2, p.height / 2);
        p.beginShape();
        for (var i = 0; i < 200; i++) {
            var ang = p.map(i, 0, 200, 0, p.TWO_PI);
            var rad = 200 + p.map(p.noise(p.sin(ang / 2), t * 0.005), 0, 1, -100, 100);
            var x = rad * p.cos(ang);
            var y = rad * p.sin(ang);
            p.curveVertex(x, y);
        }
        p.endShape(p.CLOSE);

        t += 1;

        // clear the background every 600 frames using mod (%) operator
        if (p.frameCount % 600 == 0) {
            p.background(255);
        }
    };
};

let sketchPerlinNoiseBezierCircleCoords = (p: p5) => {
    const TOTAL = 200;
    // const TOTAL = 5;
    const RADIUS = p.min(p.windowWidth, p.windowHeight) * 0.3;
    // const DELTA_RADIUS = p.min(p.windowWidth, p.windowHeight) * 0.05;
    const DELTA_RADIUS = 5;
    let points: any[] = [];
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        // p.frameRate(1);

        p.stroke(0, 18);
        p.noFill();

        let angleDelta = p.TWO_PI / TOTAL;

        for (let i = 0; i < TOTAL; i++) {

            // let angle = p.random(p.TWO_PI)
            let angle = i * angleDelta;
            let x = p.width / 2 + RADIUS * p.sin(angle)
            let y = p.height / 2 + RADIUS * p.cos(angle)

            points.push({
                pos: new p5.Vector(x, y)
            });

            // p.circle(x, y, 10);

            console.log(points[i]);
        }
    };

    p.draw = () => {
        p.beginShape();
        for (let i = 0; i < points.length; i++) {

            let point = points[i];
            console.log("looop!");
            console.log(point);

            let noiseX = p.noise(point.pos.x, p.millis() * 0.01);
            let noiseY = p.noise(point.pos.y, p.millis() * 0.01);
            let deltaX = p.map(noiseX, 0, 1, -DELTA_RADIUS, DELTA_RADIUS);
            let deltaY = p.map(noiseY, 0, 1, -DELTA_RADIUS, DELTA_RADIUS);

            console.log(`noiseX=${noiseX}, deltaX=${deltaX}`);
            console.log(`noiseY=${noiseY}, deltaY=${deltaY}`);

            point.pos.x = point.pos.x + deltaX;
            point.pos.y = point.pos.y + deltaY;

            console.log(point);
            console.log("endlooop!");

            p.curveVertex(point.pos.x, point.pos.y);
        }
        p.endShape(p.CLOSE);

        // if (p.frameCount > 5) {
        //     p.noLoop();
        // }

        // clear the background every 600 frames using mod (%) operator
        if (p.frameCount % 600 == 0) {
            p.background(255);
        }
    };
};

let sketchRandomCurveCircle = (p: p5) => {
    let t = 0;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(255);
        p.stroke(0, 15);
        p.noFill();
    };

    p.draw = () => {
        p.translate(p.width / 2, p.height / 2);
        p.beginShape();
        for (var i = 0; i < 200; i++) {
            var ang = p.map(i, 0, 200, 0, p.TWO_PI);
            var rad = 200 * p.random() * (t * 0.005);
            var x = rad * p.cos(ang);
            var y = rad * p.sin(ang);
            p.curveVertex(x, y);
        }
        p.endShape(p.CLOSE);

        t += 5;

        // clear the background every 300 frames using mod (%) operator
        if (p.frameCount % 300 == 0) {
            p.background(255);
        }
    };
};


let sketchOrganicTrail1 = (p: p5) => {
    const TOTAL = 200;
    let points: any[] = [];
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for (let i = 0; i < TOTAL; i++) {
            points.push({
                pos: p.createVector(p.width / 2, p.height / 2), // center
                dir: p.random(p.TWO_PI) // random angle on the circle
            });
        }
    };

    p.draw = () => {
        for (let i = 0; i < TOTAL; i++) {
            let point = points[i];

            // trick 1
            point.pos.x += p.cos(point.dir);
            point.pos.y += p.sin(point.dir);

            p.circle(point.pos.x, point.pos.y, 10);
        }
    };
};

let sketchOrganicTrail2 = (p: p5) => {
    const TOTAL = 200;
    let points: any[] = [];
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for (let i = 0; i < TOTAL; i++) {
            points.push({
                pos: p.createVector(p.width / 2, p.height / 2), // center
                dir: p.random(p.TWO_PI) // random angle on the circle
            });
        }
    };

    p.draw = () => {
        var time = p.millis() / 1000;
        for (var i = 0; i < TOTAL; i++) {
            var point = points[i];

            /*
            For some reason, the noise function in p5.js is not well calibrated.
            It tends to have values smaller than 0.5.
            So, instead of subtracting 0.5, we subtract by 0.477 and compensate for that.
             */
            // trick 2
            // point.dir += p.noise(point.pos.x, point.pos.y/*, time*/) - 0.477;
            point.dir += p.noise(point.pos.x, point.pos.y, time) - 0.477;

            point.pos.x += p.cos(point.dir);
            point.pos.y += p.sin(point.dir);

            p.circle(point.pos.x, point.pos.y, 10);
        }
    };
};


window.onload = function () {
    let myp5 = new p5(sketchPerlinNoiseBezierCircle2);
    // const click = document.getElementById("temp-id");
    // click.addEventListener('click', function(){
    //     // remove and add new sketch, that's it
    //     myp5.remove()
    //     myp5 = new p5(sketch2);
    // });
}



