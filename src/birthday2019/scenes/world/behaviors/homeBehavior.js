import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {Player} from "../../../units/player";
import {InvisibleZone} from "../../../units/invisibleZone";
import {KbpBehavior} from "./kbpBehavior";

export class HomeBehavior {

    create(scene, data) {

        this.scene = scene;

        scene.add.image(0, 0, 'home_bg').setOrigin(0);

        this.player = new Player(
            scene,
            toPixels(GAME_W * 0.5),
            toPixels(GAME_H * 0.9),
            'shapes',
            data.playerMeta
        );

        let tableZone = new InvisibleZone(
            scene, toPixels(256), toPixels(224), toPixels(256), toPixels(128)
        );

        tableZone.putTextInside(
            '🍷', {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#000000'
            }
        );

        tableZone.collideWith(this.player, (player, zone) => {
            console.log(`Collided player: ${player} with table zone: ${zone}`);
        });

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(this.player);
        scene.cameras.main.roundPixels = true;
    }

    update(scene, time, delta) {
        this.player.onUpdate();
    }
}