import {SCENE_GAME} from "../../game";

export class BootScene extends Phaser.Scene {
    init() {
        // set scale mode
        this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
        this.game.scale.autoCenter = Phaser.Scale.Center.CENTER_BOTH;
    }

    preload() {
        // load assets here
    }

    create() {

        this.game.scene.start(SCENE_GAME);
    }
}