import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {MovingObjectsPool} from "../../../units/movingObjectsPool";
import {LandingBehavior} from "./landingBehavior";

export class TakingOffBehavior {

    create(scene, data) {

        this.scene = scene;
        this.playerMeta = data.playerMeta;

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;

        this.roadSprite = scene.add.tileSprite(toPixels(GAME_W * 0.5), 0, toPixels(175), GAME_H_DPR, 'road');
        this.roadSprite.setOrigin(0.5, 0);

        let plane = scene.add.image(0, 0, 'plane');
        plane.setOrigin(0);

        this.plane = scene.add.container(
            toPixels(GAME_W * 0.5) - plane.width * 0.5,
            toPixels(GAME_H * 0.6),
            [plane]
        );

        scene.physics.add.existing(this.plane);
        this.plane.body.setSize(plane.width, plane.height);
        this.plane.body.setEnable(true);

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.roundPixels = true;

        scene.time.delayedCall(5000, () => {
            scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: 2000,
                onUpdate: (tween, target) => {
                    this.plane.body.setVelocityY(Phaser.Math.Easing.Cubic.InOut(tween.progress) * toPixels(-1000));
                }
            });
        });

        this.cloudAlpha = 0;

        this.leftClouds = new MovingObjectsPool(
            scene,
            this._cloudFactory(toPixels(100)),
            (obj) => {
                obj.setAlpha(this.cloudAlpha);
            },
            100,
        );
        this.rightClouds = new MovingObjectsPool(
            scene,
            this._cloudFactory(toPixels(500)),
            (obj) => {
                obj.setAlpha(this.cloudAlpha);
            },
            100
        );

        scene.time.delayedCall(1000, () => {
            scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: 3000,
                onUpdate: (tween, target) => {

                    this.cloudAlpha = tween.getValue();

                    this.roadSprite.setAlpha(1 - this.cloudAlpha);

                    this.leftClouds.group.getChildren().forEach((el) => {
                        el.setAlpha(this.cloudAlpha);
                    });

                    this.rightClouds.group.getChildren().forEach((el) => {
                        el.setAlpha(this.cloudAlpha);
                    });
                }
            });
        });
    }

    update(scene, time, delta) {

        const velocity = toPixels(5);

        this.roadSprite.tilePositionY -= velocity;

        this.leftClouds.move(velocity);
        this.rightClouds.move(velocity);

        this.leftClouds.updateStates();
        this.rightClouds.updateStates();

        // use some amount of pixels to let plane cross them instead of delayedCall with time
        // and boolean variable handled or not
        if (this.plane.y + this.plane.height < toPixels(-2500)) {
            scene.scene.restart({
                behavior: new LandingBehavior(),
                data: {
                    playerMeta: this.playerMeta
                }
            });
        }
    }

    _cloudFactory(xCoord) {

        return (scene, posY) => {
            let cloudImage = this.scene.add.image(0, 0, Phaser.Math.RND.pick([
                'cloud1', 'cloud2', 'cloud3', 'cloud4'
            ]));
            cloudImage.setOrigin(0);

            let obj = this.scene.add.container(xCoord, posY, [cloudImage])

            obj.setAlpha(this.cloudAlpha);

            return obj;
        }
    }
}