import {Person} from "../person";

const emojis = [
    {
        ch: '👮‍',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '💂️‍',
        vAlign: 'center',
        hAlign: 'center'
    }
];

export class GuardFactory {

    constructor(scene) {
        this.scene = scene;
    }

    create(x, y) {
        return new Person(this.scene, x, y, emojis, true);
    }
}