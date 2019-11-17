import {toPixels} from "../utils/devicePixelRationUtils";

export class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, meta) {
        super(scene, x, y, texture, meta.frame);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.meta = meta;

        if (this.meta.tint) {
            this.dressUp(this.meta.tint);
        }
    }

    dressUp(color) {
        this.tint = color;
        this.meta.tint = color;
    }

    currentDress() {
        return this.meta.tint;
    }

    onUpdate() {
        this.body.setVelocity(toPixels(0));

        const velocity = 120;

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(toPixels(-velocity));
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(toPixels(velocity));
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.body.setVelocityY(toPixels(-velocity));
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(toPixels(velocity));
        }
        if (this.body.velocity.lengthSq() > 0) {
            this.setRotation(this.body.velocity.angle() + Phaser.Math.TAU);
        }
    }
}