import {TalkingPerson} from "../talkingPerson";
import {CONFIG, SCENE_DEFEAT} from "../../game";

const emojis = [
    {
        ch: '🚕',
        vAlign: 'btm',
        hAlign: 'right'
    },
    {
        ch: '🚖',
        vAlign: 'center',
        hAlign: 'center'
    }
];

const START_PHRASES = [
    "Taxi! 🚕",
];
const LATE_PHRASES = [
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
        return new TalkingPerson(this.scene, x, y, CONFIG.defaultColor, emojis, true, {
            start: START_PHRASES,
            late: LATE_PHRASES,
            rare: RARE_PHRASES
        }, (person, player) => {
            if (person.conversation.hit()) {
                if (Phaser.Math.RND.frac() > 0.5) {
                    this.scene.game.scene.start(SCENE_DEFEAT, {
                        msg: "Who ever used taxi at KBP? ☠️"
                    });
                }
            }
        });
    }
}