import {toPixels} from "../utils/devicePixelRationUtils";

export class Platform extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x: number, y: number, children: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);

        let arcadeBody: Phaser.Physics.Arcade.StaticBody = this.body as Phaser.Physics.Arcade.StaticBody;

        arcadeBody.setSize(toPixels(80), toPixels(20));
    }
}