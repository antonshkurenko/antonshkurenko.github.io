import {TalkingPerson} from "../talkingPerson";
import {CONFIG} from "../../game";

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
        return new TalkingPerson(this.scene, x, y, CONFIG.defaultColor, emojis, true, {
            start: ["Hello 😈"],
            late: ["Run, run"],
            rare: ["Here's Johnny!"]
        }, (person, player) => {
            person.conversation.hit();
        });
    }
}