import {SCENE_MENU} from "../game";
import {imageName, toPixels} from "../utils/devicePixelRationUtils";

export class BootScene extends Phaser.Scene {
    init(data) {
        // set scale mode
        this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
        this.game.scale.autoCenter = Phaser.Scale.Center.CENTER_BOTH;
    }

    preload() {
        // map tiles
        // this.load.image('tiles', 'assets/birthday2019/map/spritesheet.png');

        // map in json format
        // this.load.tilemapTiledJSON('tilesMap', 'assets/birthday2019/map/map.json');

        this.load.spritesheet('shapes', imageName('assets/birthday2019/players/shapes@<size>x.png'),
            {frameWidth: toPixels(32), frameHeight: toPixels(32), margin: 0, spacing: 0}
        );
    }

    create() {

        this.game.scene.start(SCENE_MENU);
    }
}