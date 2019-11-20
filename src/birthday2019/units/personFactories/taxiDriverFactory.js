import {TalkingPerson} from "../talkingPerson";

const emojis = [
    {
        ch: '🚕',
        vAlign: 'btm',
        hAlign: 'right'
    },
    {
        ch: '🇺🇦',
        vAlign: 'top',
        hAlign: 'right'
    },
    {
        ch: '🏁',
        vAlign: 'top',
        hAlign: 'right'
    }
];

const START_PHRASES = [
    "Hey!",
    "Howdy?",
    "Hello",
    "Hi",
    "What's up?",
    "Good Day Sir",
];
const LATE_PHRASES = [
    "Welcome home!",
    "Taxi! 🚕"
];
const RARE_PHRASES = [
    "Oy na hori dva dubky",
];

export class TaxiDriverFactory {

    constructor(scene) {
        this.scene = scene;

    }


    create(x, y) {
        return new TalkingPerson(this.scene, x, y, emojis, true, {
            start: START_PHRASES,
            late: LATE_PHRASES,
            rare: RARE_PHRASES
        });
    }
}