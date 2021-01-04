export class InvisibleZone extends Phaser.GameObjects.Zone {

    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);

        this.scene = scene;

        this.setOrigin(0);

        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.body.setEnable(true);
        this.body.setImmovable(true);
    }

    collideWith(obj, callback) {
        this.scene.physics.add.collider(obj, this, callback, null, this.scene);
    }

    putTextInside(text, config) {

        let textObj = this.scene.add.text(this.x + this.width * 0.5, this.y + this.height * 0.5, text, config);
        textObj.setAlign('center');
        textObj.setOrigin(0.5);
        return textObj;
    }

}