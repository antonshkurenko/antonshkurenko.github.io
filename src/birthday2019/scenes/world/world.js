import {toPixels} from "../../utils/devicePixelRationUtils";

export class WorldScene extends Phaser.Scene {
    init(data) {
        this.behavior = data.behavior;
    }

    preload() {
    }

    create() {

        this.cameras.main.setBackgroundColor('#FFFFFF');

        // must create this.player and setup a map

        if (this.behavior.create) {
            this.behavior.create(this);
        }
    }

    update(time, delta) {

        if (this.behavior.update) {
            this.behavior.update(this, time, delta);
        }
    }
}