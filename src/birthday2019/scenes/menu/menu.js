import {SCENE_WORLD} from "../../game";
import {RoadBehavior} from "../world/behaviors/roadBehavior";

export class MenuScene extends Phaser.Scene {
    init(data) {
    }

    preload() {
    }

    create() {
        this.game.scene.start(SCENE_WORLD, {
            behavior: new RoadBehavior(),
            // behavior: new DutyFreeBehavior(),
            // behavior: new KbpBehavior(),
        });
    }
}