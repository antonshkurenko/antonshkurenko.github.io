var WEIGHT_RAD = 10;

function getGrid(n) {
    for (var res = [], i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var near = [];
            i > 0 && near.push((i - 1) * n + j);
            i < n - 1 && near.push((i + 1) * n + j);
            j > 0 && near.push(i * n + j - 1);
            j < n - 1 && near.push(i * n + j + 1);
            res.push({
                i: i,
                j: j,
                near: near
            });
        }
    }
    return res
}

function getGridPos(num, grid, rad, xMid, yMid) {
    return grid.map(function (g) {
        var n = num - 1;
        var x = xMid + (1 - 2 * (g.i / n)) * rad;
        var y = yMid + (1 - 2 * (g.j / n)) * rad;
        return new Point(x, y);
    })
}

function getRndCirc(n, ix, iy, rad) {
    for (var res = [], i = 0; i < n; i++) {
        var a = Math.random() * FULL_PI, x = ix + Math.cos(a) * rad, y = iy + Math.sin(a) * rad;
        res.push(new Point(x, y))
    }
    return res
}

function stroke(ctx, n, a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;

    for (var i = 0; i < n; i++) {
        var rnd = Math.random();
        ctx.beginPath();
        ctx.rect(a.x + rnd * dx, a.y + rnd * dy, 1, 1);
        ctx.fill();
    }
}

function drawGrowth(ctx, options, points, positions, weights, signs, noise) {

    for (var i = 0; i < positions.length; i++) {

        var p = positions[i];

        // ctx.beginPath();
        //
        // ctx.arc(
        //     p.x,
        //     p.y,
        //     weights[i] * WEIGHT_RAD,
        //     0, FULL_PI);
        //
        // if (signs[i] > 0) {
        //     ctx.fill();
        // } else {
        //     ctx.stroke();
        // }

        var gridP = points[i];

        var nearWeight = 0;
        var mx = 0;
        var my = 0;

        gridP.near.forEach(function (nij) {
            var gn = positions[nij];

            if (nij > i) {

                stroke(ctx, 10, p, gn);

                // ctx.beginPath();
                // ctx.moveTo(p.x, p.y);
                // ctx.lineTo(gn.x, gn.y);
                // ctx.stroke();
            }

            nearWeight += weights[nij];
            mx += gn.x * weights[nij];
            my += gn.y * weights[nij];
        });

        mx /= nearWeight;
        my /= nearWeight;

        var dx = mx - p.x;
        var dy = my - p.y;
        var dd = Math.sqrt(dx * dx + dy * dy || 1);

        dx /= dd;
        dy /= dd;

        p.x += tweak(noise) + signs[i] * dx * 0.1;
        p.y += tweak(noise) + signs[i] * dx * 0.1;
    }
}

function goGrow(ctx, options) {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';

    var num = 5;
    var num2 = num * num;

    var points = getGrid(num);
    var positions = getGridPos(num, points, options.center.len() * 0.15, options.center.x, options.center.y);
    //var positions = getRndCirc(num2, options.center.x, options.center.y, options.center.len() * 0.15);
    var weights = getRnd(num2, 0, 1);
    var signs = getRndSign(num2);

    return repeat(function () {
        drawGrowth(ctx, options, points, positions, weights, signs, 0.4);
    }, 16);
}

function launchGrowth(ctx, options) {

    if (launchGrowth.lastAnimation) {
        launchGrowth.lastAnimation.keepAnimating = false;
    }

    launchGrowth.lastAnimation = goGrow(ctx, options);
}