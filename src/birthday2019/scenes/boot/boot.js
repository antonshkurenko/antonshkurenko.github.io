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
        this.load.image('home_bg', imageName('assets/birthday2019/home/home@<size>x.png'));
        this.load.image('prehome_bg', imageName('assets/birthday2019/prehome/prehome@<size>x.png'));

        this.load.image('road', imageName('assets/birthday2019/road/road@<size>x.png'));
        this.load.image('car', imageName('assets/birthday2019/car/car@<size>x.png'));
        this.load.image('billboard', imageName('assets/birthday2019/billboard/billboard@<size>x.png'));

        this.load.image('plane', imageName('assets/birthday2019/plane/plane@<size>x.png'));
        this.load.image('cloud1', imageName('assets/birthday2019/cloud1/cloud1@<size>x.png'));
        this.load.image('cloud2', imageName('assets/birthday2019/cloud2/cloud2@<size>x.png'));
        this.load.image('cloud3', imageName('assets/birthday2019/cloud3/cloud3@<size>x.png'));
        this.load.image('cloud4', imageName('assets/birthday2019/cloud4/cloud4@<size>x.png'));

        this.load.image('banner', imageName('assets/birthday2019/banner/banner@<size>x.png'));
        this.load.image('tree1', imageName('assets/birthday2019/tree1/tree1@<size>x.png'));
        this.load.image('tree2', imageName('assets/birthday2019/tree2/tree2@<size>x.png'));
        this.load.image('tree3', imageName('assets/birthday2019/tree3/tree3@<size>x.png'));
        this.load.image('tree4', imageName('assets/birthday2019/tree4/tree4@<size>x.png'));

        this.load.spritesheet('shapes', imageName('assets/birthday2019/players/shapes@<size>x.png'),
            {frameWidth: toPixels(32), frameHeight: toPixels(32), margin: 0, spacing: 0}
        );
    }

    create() {

        this.game.scene.start(SCENE_MENU);
    }
}