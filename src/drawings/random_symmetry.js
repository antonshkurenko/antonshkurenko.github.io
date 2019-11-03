// list for connections between nodes
import {Point} from "../utils/utils";

const connections = [[0, 1], [0, 3],
    [1, 2], [1, 3], [1, 4],
    [2, 4], [2, 6],
    [3, 4], [3, 5],
    [4, 5], [4, 6],
    [5, 6], [5, 7],
    [6, 7], [6, 8],
    [7, 8]];


class Grid {
    constructor(size) {

        this.nodes = [];
        this.mirrornodes = [];

        // create the nodes in the grid
        this.nodes.push(new Point(0, 0));
        this.nodes.push(new Point(0, -size));
        this.nodes.push(new Point(0, -2 * size));
        this.nodes.push(new Point(size / 2.0, -size / 2.0));
        this.nodes.push(new Point(0.5 * size, -1.5 * size));
        this.nodes.push(new Point(size, -size));
        this.nodes.push(new Point(size, -2 * size));
        this.nodes.push(new Point(1.5 * size, -1.5 * size));
        this.nodes.push(new Point(2 * size, -2 * size));

        // create the nodes which mirror over the diagonal line
        this.mirrornodes.push(new Point(0, 0));
        this.mirrornodes.push(new Point(size, 0));
        this.mirrornodes.push(new Point(2 * size, 0));
        this.mirrornodes.push(new Point(size / 2.0, -size / 2.0));
        this.mirrornodes.push(new Point(1.5 * size, -0.5 * size));
        this.mirrornodes.push(new Point(size, -size));
        this.mirrornodes.push(new Point(2 * size, -size));
        this.mirrornodes.push(new Point(1.5 * size, -1.5 * size));
        this.mirrornodes.push(new Point(2 * size, -2 * size));

        // randomly choose which nodes are connecting
        this.connectChoices = new Array(16);
        for (let i = 0; i < this.connectChoices.length; i++) {
            this.connectChoices[i] = Math.random() >= 0.5;
        }
    }

    connectDraw(ctx) {
        for (let i = 0; i < this.connectChoices.length; i++) {
            if (this.connectChoices[i]) {
                this.nodes[connections[i][0]].connect(this.nodes[connections[i][1]], ctx);
                this.mirrornodes[connections[i][0]].connect(this.mirrornodes[connections[i][1]], ctx);
            }
        }
    }

    display(ctx) {

        for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.rotate((Math.PI / 2) * i);
            this.connectDraw(ctx);
            ctx.restore();
        }
    }
}

function drawSymmetry(ctx, options, fitX, fitY, spaceX, spaceY, gridSize, fullGridSize) {

    ctx.beginPath();
    for (let i = 0; i < fitX; i++) {
        for (let j = 0; j < fitY; j++) {
            ctx.save();
            ctx.translate(i * (spaceX + fullGridSize), j * (spaceY + fullGridSize));
            new Grid(gridSize).display(ctx);
            ctx.restore();
        }
    }
    ctx.stroke();
}

export function launchRandomSymmetryArt(ctx, options) {

    const GRID_SIZE = 10;
    const FULL_GRID_SIZE = 3 * GRID_SIZE;
    let SPACE_Y = 50;
    let SPACE_X = 50;

    const FIT_AMOUNT_X = Math.floor(options.width / (FULL_GRID_SIZE + SPACE_X) + 1);
    const FIT_AMOUNT_Y = Math.floor(options.height / (FULL_GRID_SIZE + SPACE_Y) + 1);

    SPACE_X = options.width / (FIT_AMOUNT_X - 1) - FULL_GRID_SIZE;
    SPACE_Y = options.height / (FIT_AMOUNT_Y - 1) - FULL_GRID_SIZE;

    ctx.strokeStyle = 'rgba(0,0,0,0.5)';

    ctx.clearRect(0, 0, options.width, options.height);
    drawSymmetry(ctx, options, FIT_AMOUNT_X, FIT_AMOUNT_Y, SPACE_X, SPACE_Y, GRID_SIZE, FULL_GRID_SIZE);
}