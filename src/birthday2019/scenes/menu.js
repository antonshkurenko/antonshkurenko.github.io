import {SCENE_WORLD} from "../game";

export class MenuScene extends Phaser.Scene {
    init(data) {
    }

    preload() {
    }

    create() {
        this.game.scene.start(SCENE_WORLD);
    }
}