import {TalkingPerson} from "../talkingPerson";

export const FRIENDS_EMOJIS = [
    {
        ch: '🍺',
        vAlign: 'center',
        hAlign: 'right'
    },
    {
        ch: '🍺',
        vAlign: 'center',
        hAlign: 'left'
    },
    {
        ch: '🍷',
        vAlign: 'center',
        hAlign: 'right'
    },
    {
        ch: '🍷',
        vAlign: 'center',
        hAlign: 'left'
    },
    {
        ch: '🍸',
        vAlign: 'center',
        hAlign: 'right'
    },
    {
        ch: '🍸',
        vAlign: 'center',
        hAlign: 'left'
    },
    {
        ch: '🥃',
        vAlign: 'center',
        hAlign: 'right'
    },
    {
        ch: '🥃',
        vAlign: 'center',
        hAlign: 'left'
    },
    {
        ch: '☕️',
        vAlign: 'center',
        hAlign: 'right'
    },
    {
        ch: '☕️',
        vAlign: 'center',
        hAlign: 'left'
    },
    {
        ch: '🍕️',
        vAlign: 'center',
        hAlign: 'right'
    },
    {
        ch: '🍕️',
        vAlign: 'center',
        hAlign: 'left'
    },
    {
        ch: '🍹',
        vAlign: 'center',
        hAlign: 'right'
    },
    {
        ch: '🍹',
        vAlign: 'center',
        hAlign: 'left'
    }
];

const START_PHRASES = [
    "Hey!",
    "Howdy?",
    "Hello",
    "Hi",
    "What's up?",
];
const LATE_PHRASES = [
    "Fancy beer?",
    "Fancy cocktail?",
    "Fancy wine?",
    "Fancy pizza?",
];
const RARE_PHRASES = [
    "We're no strangers to love\n" +
    "You know the rules and so do I",
];

export class FriendsFactory {

    constructor(scene) {
        this.scene = scene;
    }

    create(x, y) {
        return new TalkingPerson(this.scene, x, y, Phaser.Math.RND.pick([
            0xF44336, 0xE91E63, 0x9C27B0, 0x2196F3, 0x00BCD4, 0x4CAF50, 0xFFEB3B, 0xFFC107
        ]), FRIENDS_EMOJIS, false, {
            start: START_PHRASES,
            late: LATE_PHRASES,
            rare: RARE_PHRASES
        }, (person, player) => {
            person.conversation.hit();
        });
    }
}