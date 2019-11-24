import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {MovingObjectsPool} from "../../../units/movingObjectsPool";
import {PrehomeBehavior} from "./prehomeBehavior";

export class RoadBehavior {

    create(scene, data) {

        this.scene = scene;

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;

        this.roadSprite = scene.add.tileSprite(toPixels(GAME_W * 0.5), 0, toPixels(175), GAME_H_DPR, 'road');
        this.roadSprite.setOrigin(0.5, 0);

        let car = scene.add.image(0, 0, 'car');
        car.setOrigin(0);

        this.playerMeta = data.playerMeta;

        let player = scene.add.image(car.width * 0.2, car.height * 0.2, 'shapes', this.playerMeta.frame);
        player.setOrigin(0);
        player.tint = this.playerMeta.tint;
        let text = scene.add.text(car.width * 0.55, car.height * 0.55, '🧳', {
            fontFamily: 'Arial',
            fontSize: toPixels(24),
            fill: '#ff0000'
        });
        text.setOrigin(0);

        this.playerInCar = scene.add.container(toPixels(GAME_W * 0.5) + this.roadSprite.width * 0.05, toPixels(GAME_H * 0.8), [car, player, text]);
        scene.physics.add.existing(this.playerInCar);
        this.playerInCar.body.setSize(car.width, car.height);
        this.playerInCar.body.setEnable(true);

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.roundPixels = true;

        scene.time.delayedCall(5000, () => {
            scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: 2000,
                onUpdate: (tween, target) => {
                    this.playerInCar.body.setVelocityY(Phaser.Math.Easing.Back.In(tween.progress) * toPixels(-500));
                }
            });
        });


        this.leftBillboards = new MovingObjectsPool(
            scene,
            this._billboardFactory(toPixels(100)),
            (_) => {
            },
            150
        );
        this.rightBillboards = new MovingObjectsPool(
            scene,
            this._billboardFactory(toPixels(500)),
            (_) => {
            },
            150
        );
    }

    update(scene, time, delta) {

        const velocity = toPixels(2.5);

        this.roadSprite.tilePositionY -= velocity;

        this.leftBillboards.move(velocity);
        this.rightBillboards.move(velocity);

        this.leftBillboards.updateStates();
        this.rightBillboards.updateStates();

        // use some amount of pixels to let car cross them instead of delayedCall with time
        // and boolean variable handled or not
        if (this.playerInCar.y + this.playerInCar.height < toPixels(-1000)) {
            scene.scene.restart({
                behavior: new PrehomeBehavior(),
                data: {
                    playerMeta: this.playerMeta
                }
            });
        }
    }

    _billboardFactory(xCoord) {

        const billboards = [
            '🍆🍑',
            '⚽️🏀💸',
        ];

        return (scene, posY) => {
            let billboardImage = this.scene.add.image(0, 0, 'billboard');
            billboardImage.setOrigin(0);
            let text = this.scene.add.text(0, 0, Phaser.Math.RND.pick(billboards), {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#ff0000'
            });

            text.x = billboardImage.width * 0.5 - text.width * 0.5;
            text.y = billboardImage.height * 0.35 - text.height * 0.5;

            return this.scene.add.container(xCoord, posY, [billboardImage, text]);
        }
    }
}