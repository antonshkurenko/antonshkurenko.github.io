export class WorldScene extends Phaser.Scene {
    init(props) {

        this.data = props.data;
        this.behavior = props.behavior;
    }

    preload() {
    }

    create() {

        this.cameras.main.setBackgroundColor('#FFFFFF');

        if (this.behavior.create) {

            console.log(this.data);

            this.behavior.create(this, this.data);
        }
    }

    update(time, delta) {

        if (this.behavior.update) {
            this.behavior.update(this, time, delta);
        }
    }
}