import {Person} from "../person";

const emojis = [
    {
        ch: '🔫',
        vAlign: 'center',
        hAlign: 'left'
    },
    {
        ch: '🔪',
        vAlign: 'btm',
        hAlign: 'right'
    },
    {
        ch: '🎈',
        vAlign: 'top',
        hAlign: 'left'
    }
];

export class ManiacFactory {

    constructor(scene) {
        this.scene = scene;

    }


    create(x, y) {
        return new Person(this.scene, x, y, emojis, true);
    }
}