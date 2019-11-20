import {TalkingPerson} from "../talkingPerson";

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
        return new TalkingPerson(this.scene, x, y, emojis, true, {
            start: ["Hi, please dress up"],
            late: ["You can't proceed\nwithout being dressed up"],
            rare: ["C'mon man, dress up"]
        });
    }
}