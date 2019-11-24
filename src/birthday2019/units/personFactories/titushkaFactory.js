import {TalkingPerson} from "../talkingPerson";
import {CONFIG} from "../../game";

const emojis = [
    {
        ch: '💩',
        vAlign: 'center',
        hAlign: 'center'
    }
];

const START_PHRASES = [
    "...",
];
const LATE_PHRASES = [
    "...",
];
const RARE_PHRASES = [
    "...",
];

export class TitushkasFactory {

    constructor(scene) {
        this.scene = scene;
    }

    create(x, y) {
        return new TalkingPerson(this.scene, x, y, CONFIG.defaultColor, emojis, true, {
            start: START_PHRASES,
            late: LATE_PHRASES,
            rare: RARE_PHRASES
        }, (person, player) => {
            person.conversation.hit();
        });
    }
}