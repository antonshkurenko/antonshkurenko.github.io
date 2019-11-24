import {toPixels} from "../../utils/devicePixelRationUtils";
import {GAME_H_DPR, GAME_W_DPR} from "../../game";

export class EndGameScene extends Phaser.Scene {
    init(data) {
        this.data = data;
    }

    preload() {
    }

    create() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.cameras.main.fadeIn(1000);

        this.add
            .text(GAME_W_DPR * 0.5, GAME_H_DPR * 0.5, `Defeat\n${this.data.msg}`, {
                fontFamily: 'Arial',
                fontSize: toPixels(30),
                fill: '#000000'
            })
            .setOrigin(0.5);
    }
}