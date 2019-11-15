import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {InvisibleZone} from "../../../units/invisibleZone";
import {RoadBehavior} from "./roadBehavior";

export class KbpBehavior {

    create(scene) {

        this.scene = scene;

        scene.add.image(0, 0, 'kbp_bg').setOrigin(0);

        this.player = scene.physics.add.sprite(toPixels(GAME_W * 0.5), toPixels(GAME_H * 0.9), 'shapes', 0);
        this.player.tint = 0xEF5350;

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;
        this.player.setCollideWorldBounds(true);

        let kbpZone = new InvisibleZone(
            scene, toPixels(256), toPixels(0), toPixels(256), toPixels(64)
        );

        kbpZone.collideWith(this.player, (player, zone) => {
            console.log(`Collided player: ${player} with kbp zone: ${zone}`);

            scene.scene.restart({
                behavior: new RoadBehavior(),
            });
        });

        kbpZone.putTextInside(
            '🛬 Arrivals', {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#000000'
            }
        );

        let flowersZone = new InvisibleZone(
            scene, toPixels(112), toPixels(200), toPixels(144), toPixels(144)
        );

        flowersZone.collideWith(this.player, (player, zone) => {
            console.log(`Collided player: ${player} with flowers zone: ${zone}`);
        });

        flowersZone.putTextInside(
            '💐 Flowers', {
                fontFamily: 'Arial',
                fontSize: toPixels(22),
                fill: '#000000'
            }
        );

        let exchZone = new InvisibleZone(
            scene, toPixels(512), toPixels(200), toPixels(144), toPixels(144)
        );

        exchZone.collideWith(this.player, (player, zone) => {
            console.log(`Collided player: ${player} with exch zone: ${zone}`);
        });

        exchZone.putTextInside(
            '💸 Exchange', {
                fontFamily: 'Arial',
                fontSize: toPixels(22),
                fill: '#000000'
            }
        );

        let entranceZone = new InvisibleZone(
            scene, toPixels(180), toPixels(475), toPixels(408), toPixels(1)
        );

        entranceZone.collideWith(this.player, (player, zone) => {
            console.log(`Collided player: ${player} with entrance zone: ${zone}`);
        });

        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(this.player);
        scene.cameras.main.roundPixels = true;
    }

    update(scene, time, delta) {
        this.player.body.setVelocity(toPixels(0));

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(toPixels(-80));
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(toPixels(80));
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(toPixels(-80));
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(toPixels(80));
        }
    }
}