import {TalkingPerson} from "../talkingPerson";
import {CONFIG, SCENE_DEFEAT} from "../../game";

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
            if (person.conversation.hit()) {
                if (Phaser.Math.RND.frac() > 0.5) {
                    this.scene.game.scene.start(SCENE_DEFEAT, {
                        msg: "It was a low probability,\nbut maniac killed you ☠️"
                    });
                }
            }
        });
    }
}