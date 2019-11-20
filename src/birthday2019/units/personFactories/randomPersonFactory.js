import {TalkingPerson} from "../talkingPerson";

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

const START_PHRASES = [
    "Hey!",
    "Howdy?",
    "Hello",
    "Hi",
    "What's up?",
    "Good Day Sir",
];
const LATE_PHRASES = [
    "Don't push me 💢",
];
const RARE_PHRASES = [
    "We're no strangers to love\n" +
    "You know the rules and so do I",
];

export class RandomPersonFactory {

    constructor(scene) {
        this.scene = scene;
    }


    create(x, y) {
        return new TalkingPerson(this.scene, x, y, emojis, false, {
            start: START_PHRASES,
            late: LATE_PHRASES,
            rare: RARE_PHRASES
        });
    }
}