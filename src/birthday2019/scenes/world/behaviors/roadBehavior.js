import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";

export class RoadBehavior {

    create(scene) {

        this.scene = scene;

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;

        this.roadSprite = scene.add.tileSprite(toPixels(GAME_W * 0.5), 0, toPixels(175), GAME_H_DPR, 'road');
        this.roadSprite.setOrigin(0.5, 0);

        let car = scene.add.image(0, 0, 'car');
        car.setOrigin(0);
        let player = scene.add.image(car.width * 0.2, car.height * 0.2, 'shapes', 0);
        player.setOrigin(0);
        player.tint = 0xEF5350;
        let text = scene.add.text(car.width * 0.55, car.height * 0.55, '🧳', {fontFamily: 'Arial', fontSize: toPixels(24), fill: '#ff0000'});
        text.setOrigin(0);

        let playerInCar = scene.add.container(toPixels(GAME_W * 0.5) + this.roadSprite.width * 0.05, toPixels(GAME_H * 0.8), [car, player, text]);
        scene.physics.add.existing(playerInCar);
        playerInCar.body.setSize(car.width, car.height);
        playerInCar.body.setEnable(true);
        playerInCar.body.setCollideWorldBounds(true);

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(playerInCar);
        scene.cameras.main.roundPixels = true;

        scene.time.delayedCall(5000, () => {
            scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: 2000,
                onUpdate: (tween, target) => {
                    playerInCar.body.setVelocityY(Phaser.Math.Easing.Back.In(tween.progress) * -750);
                }
            });
        });
    }

    update(scene, time, delta) {
        this.roadSprite.tilePositionY -= 5;
    }

}