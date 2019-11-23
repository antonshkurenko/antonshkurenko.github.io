import {CONFIG, SCENE_WORLD} from "../../game";
import {DutyFreeBehavior} from "../world/behaviors/dutyFreeBehavior";

export class MenuScene extends Phaser.Scene {
    init(data) {
    }

    preload() {
    }

    create() {
        this.game.scene.start(SCENE_WORLD, {
            behavior: new DutyFreeBehavior(),
            data: {
                playerMeta: {frame: Phaser.Math.RND.between(0, 4), tint: CONFIG.defaultColor}
            }
        });
    }
}