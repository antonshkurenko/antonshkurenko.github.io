import {CONFIG, GAME_H_DPR, GAME_W_DPR, SCENE_WORLD} from "../../game";
import {toPixels} from "../../utils/devicePixelRationUtils";
import {DutyFreeBehavior} from "../world/behaviors/dutyFreeBehavior";

export class MenuScene extends Phaser.Scene {
    init(data) {
    }

    preload() {
    }

    create() {

        this.cameras.main.setBackgroundColor('#FFFFFF');

        let text = this.add.text(GAME_W_DPR * 0.5, GAME_H_DPR * 0.5, "Press <space> to start", {
            fontFamily: 'Arial',
            fontSize: toPixels(30),
            fill: '#000000'
        });

        text.setOrigin(0.5);

        this.tweens.addCounter({
            from: 30,
            to: 35,
            duration: 500,
            repeat: -1,
            yoyo: true,
            onUpdate: (tween, target) => {
                text.setStyle({
                    fontSize: toPixels(tween.getValue())
                });
            },
        });

        let cursors = this.input.keyboard.createCursorKeys();
        cursors.space.on('down', () => {
            this.game.scene.start(SCENE_WORLD, {
                behavior: new DutyFreeBehavior(),
                data: {
                    playerMeta: {frame: Phaser.Math.RND.between(0, 4), tint: CONFIG.defaultColor}
                }
            });
        });
    }
}