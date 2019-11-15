import {SCENE_MENU} from "../../game";
import {imageName, toPixels} from "../../utils/devicePixelRationUtils";

export class BootScene extends Phaser.Scene {
    init(data) {
        // set scale mode
        this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
        this.game.scale.autoCenter = Phaser.Scale.Center.CENTER_BOTH;
    }

    preload() {

        this.load.image('kbp_bg', imageName('assets/birthday2019/kbp/kbp@<size>x.png'));
        this.load.image('df_bg', imageName('assets/birthday2019/dutyFree/df@<size>x.png'));

        this.load.image('road', imageName('assets/birthday2019/road/road@<size>x.png'));
        this.load.image('car', imageName('assets/birthday2019/car/car@<size>x.png'));
        this.load.image('billboard', imageName('assets/birthday2019/billboard/billboard@<size>x.png'));

        this.load.spritesheet('shapes', imageName('assets/birthday2019/players/shapes@<size>x.png'),
            {frameWidth: toPixels(32), frameHeight: toPixels(32), margin: 0, spacing: 0}
        );
    }

    create() {

        this.game.scene.start(SCENE_MENU);
    }
}