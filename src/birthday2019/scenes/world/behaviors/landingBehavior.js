import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {MovingObjectsPool} from "../../../units/movingObjectsPool";
import {KbpBehavior} from "./kbpBehavior";

export class LandingBehavior {

    create(scene, data) {

        this.scene = scene;
        this.playerMeta = data.playerMeta;

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;

        this.roadSprite = scene.add.tileSprite(toPixels(GAME_W * 0.5), 0, toPixels(175), GAME_H_DPR, 'road');
        this.roadSprite.setOrigin(0.5, 0);
        this.roadSprite.setAlpha(0);

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

        this.cloudAlpha = 1;

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
                from: 1,
                to: 0,
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

        this.velocity = 5;
        scene.time.delayedCall(3000, () => {
            scene.tweens.addCounter({
                from: 5,
                to: 0,
                duration: 5000,
                onUpdate: (tween, target) => {
                    this.velocity = tween.getValue();
                },
                onComplete: () => {
                    scene.time.delayedCall(1000, () => {
                        scene.scene.restart({
                            behavior: new KbpBehavior(),
                            data: {
                                playerMeta: this.playerMeta
                            }
                        });
                    });
                }
            });
        });
    }

    update(scene, time, delta) {

        const velocity = toPixels(this.velocity);

        this.roadSprite.tilePositionY -= velocity;

        this.leftClouds.move(velocity);
        this.rightClouds.move(velocity);

        this.leftClouds.updateStates();
        this.rightClouds.updateStates();
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