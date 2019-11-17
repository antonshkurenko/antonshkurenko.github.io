import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";

export class RoadBehavior {

    create(scene, data) {

        this.scene = scene;

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;

        this.roadSprite = scene.add.tileSprite(toPixels(GAME_W * 0.5), 0, toPixels(175), GAME_H_DPR, 'road');
        this.roadSprite.setOrigin(0.5, 0);

        let car = scene.add.image(0, 0, 'car');
        car.setOrigin(0);

        const playerMeta = data.playerMeta;

        let player = scene.add.image(car.width * 0.2, car.height * 0.2, 'shapes', playerMeta.frame);
        player.setOrigin(0);
        player.tint = playerMeta.tint;
        let text = scene.add.text(car.width * 0.55, car.height * 0.55, '🧳', {
            fontFamily: 'Arial',
            fontSize: toPixels(24),
            fill: '#ff0000'
        });
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
                    playerInCar.body.setVelocityY(Phaser.Math.Easing.Back.In(tween.progress) * toPixels(-500));
                }
            });
        });

        // billboards
        this.billboardsGroup = scene.add.group({
            removeCallback: (billboard) => {
                this.billboardsPool.add(billboard);
            }
        });

        this.billboardsPool = scene.add.group({
            removeCallback: (billboard) => {
                this.billboardsGroup.add(billboard);
            }
        });

        this.addBillboard(toPixels(Phaser.Math.RND.between(-100, -200)));
    }

    update(scene, time, delta) {

        const velocity = toPixels(2.5);

        this.roadSprite.tilePositionY -= velocity;
        this.billboardsGroup.getChildren().forEach((billboard) => {
            billboard.y += velocity;
        });

        this.updateBillboardsStates();
    }

    addBillboard(posY) {
        let billboard;
        if (this.billboardsPool.getLength()) {
            billboard = this.billboardsPool.getFirst();
            billboard.y = posY;
            billboard.active = true;
            billboard.visible = true;
            this.billboardsPool.remove(billboard);
        } else {

            let billboardImage = this.scene.add.image(0, 0, 'billboard');
            billboardImage.setOrigin(0);
            let text = this.scene.add.text(0, 0, '🍆🍑', {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#ff0000'
            });

            text.x = billboardImage.width * 0.5 - text.width * 0.5;
            text.y = billboardImage.height * 0.35 - text.height * 0.5;

            let billboard = this.scene.add.container(toPixels(100), posY, [billboardImage, text]);

            this.billboardsGroup.add(billboard);
        }
    }

    updateBillboardsStates() {

        let coords = this.billboardsGroup.getChildren().map((billboard) => billboard.y);

        let minY = Math.min(...coords);

        this.billboardsGroup.getChildren().forEach((billboard) => {
            if (GAME_H_DPR < billboard.y - billboard.height) {
                this.billboardsGroup.killAndHide(billboard);
                this.billboardsGroup.remove(billboard);
            }
        });

        if (minY > toPixels(200)) {
            this.addBillboard(toPixels(Phaser.Math.RND.between(-100, -200)));
        }
    }

}