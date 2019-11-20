import {Person} from "../person";

const emojis = [
    {
        ch: '👜',
        vAlign: 'btm',
        hAlign: 'right'
    },
    {
        ch: '💼',
        vAlign: 'btm',
        hAlign: 'right'
    },
    {
        ch: '🌂',
        vAlign: 'btm',
        hAlign: 'right'
    },
    {
        ch: '👒',
        vAlign: 'top',
        hAlign: 'center'
    },
    {
        ch: '🧢',
        vAlign: 'top',
        hAlign: 'center'
    },
    {
        ch: '🎩',
        vAlign: 'top',
        hAlign: 'center'
    },
    {
        ch: '👓',
        vAlign: 'top',
        hAlign: 'center'
    },
    {
        ch: '🕶',
        vAlign: 'top',
        hAlign: 'center'
    },
    {
        ch: '💤',
        vAlign: 'top',
        hAlign: 'right'
    }
];

export class RandomPersonFactory {

    constructor(scene) {
        this.scene = scene;

    }


    create(x, y) {
        return new Person(this.scene, x, y, emojis, false);
    }
}