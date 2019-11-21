import {CONFIG, SCENE_WORLD} from "../../game";
import {DutyFreeBehavior} from "../world/behaviors/dutyFreeBehavior";
import {HomeBehavior} from "../world/behaviors/homeBehavior";

export class MenuScene extends Phaser.Scene {
    init(data) {
    }

    preload() {
    }

    create() {
        this.game.scene.start(SCENE_WORLD, {
            // behavior: new RoadBehavior(),
            // behavior: new DutyFreeBehavior(),
            // behavior: new KbpBehavior(),
            behavior: new HomeBehavior(),
            data: {
                playerMeta: {frame: Phaser.Math.RND.between(0, 4), tint: CONFIG.defaultColor}
            }
        });
    }
}