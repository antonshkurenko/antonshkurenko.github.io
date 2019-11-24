import {CONFIG, SCENE_WORLD} from "../../game";
import {PrehomeBehavior} from "../world/behaviors/prehomeBehavior";

export class MenuScene extends Phaser.Scene {
    init(data) {
    }

    preload() {
    }

    create() {
        this.game.scene.start(SCENE_WORLD, {
            // behavior: new DutyFreeBehavior(),
            behavior: new PrehomeBehavior(),
            data: {
                playerMeta: {frame: Phaser.Math.RND.between(0, 4), tint: CONFIG.defaultColor}
            }
        });
    }
}