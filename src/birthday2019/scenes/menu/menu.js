import {SCENE_WORLD} from "../../game";
import {DutyFreeBehavior} from "../world/behaviors/dutyFreeBehavior";

export class MenuScene extends Phaser.Scene {
    init(data) {
    }

    preload() {
    }

    create() {
        this.game.scene.start(SCENE_WORLD, {
            // behavior: new RoadBehavior(),
            behavior: new DutyFreeBehavior(),
            // behavior: new KbpBehavior(),
            data: {
                playerMeta: {frame: Phaser.Math.RND.between(0, 4), tint: 0x9E9E9E}
            }
        });
    }
}