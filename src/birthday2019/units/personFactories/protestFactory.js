import {TalkingPerson} from "../talkingPerson";
import {CONFIG} from "../../game";

const emojis = [
    {
        ch: '🐶',
        vAlign: 'btm',
        hAlign: 'right'
    },
    {
        ch: '🐕',
        vAlign: 'btm',
        hAlign: 'right'
    },
    {
        ch: '🐩',
        vAlign: 'btm',
        hAlign: 'right'
    },
    {
        ch: '👪',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👩‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👩‍👧‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👩‍👦‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👩‍👧‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👩‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👩‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👩‍👧‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👩‍👦‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👩‍👧‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👨‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👨‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👨‍👧‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👨‍👦‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👨‍👧‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👧‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👦‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👩‍👧‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👧‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👦‍👦',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👨‍👧‍👧',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👫',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👭',
        vAlign: 'center',
        hAlign: 'center'
    },
    {
        ch: '👬',
        vAlign: 'center',
        hAlign: 'center'
    },
];

const START_PHRASES = [
    "Hey!",
    "Howdy?",
    "Hello",
    "Hi",
    "What's up?",
];
const LATE_PHRASES = [
    "Let's park",
];
const RARE_PHRASES = [
    "We're no strangers to love\n" +
    "You know the rules and so do I",
];

export class ProtestFactory {

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