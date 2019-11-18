export class WorldScene extends Phaser.Scene {
    init(props) {

        this.data = props.data;
        this.behavior = props.behavior;
    }

    preload() {
    }

    create() {

        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.cameras.main.fadeIn(1000);
        if (this.behavior.create) {
            this.behavior.create(this, this.data);
        }
    }

    update(time, delta) {

        if (this.behavior.update) {
            this.behavior.update(this, time, delta);
        }
    }
}