import {toPixels} from "../../utils/devicePixelRationUtils";
import {Player} from "../../units/player";
import {Platform} from "../../units/platform";
import {MovingObjectsPool} from "../../utils/movingObjectsPool";
import {ObjectsPool} from "../../utils/objectsPool";

export class GameScene extends Phaser.Scene {

    private pool: MovingObjectsPool<Platform>;

    // private platform: Platform;

    init() {
        // set scale mode
        this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
        this.game.scale.autoCenter = Phaser.Scale.Center.CENTER_BOTH;
    }

    preload() {

    }

    create() {

        console.log("create");

        this.cameras.main.setBackgroundColor('#FFFFFF');

        let player = new Player(this, toPixels(50), toPixels(50), []);

        // this.platform = new Platform(this, toPixels(20), toPixels(100), []);

        // this.physics.add.collider(player, this.platform, null, null, this);

        this.pool = new MovingObjectsPool<Platform>(
            new ObjectsPool<Platform>(
                this,
                (scene) => {

                    console.log("new platform");

                    let platform = new Platform(this, toPixels(20), toPixels(100), []);

                    this.physics.add.collider(player, platform, null, null, this);

                    return platform;
                },
                () => {
                },
                toPixels(100)
            ),
            toPixels(100)
        );
    }

    update(time: number, delta: number) {

        const velocity = toPixels(1);

        // (this.platform.body as Phaser.Physics.Arcade.StaticBody).position.x -= 5;

        this.pool.move(velocity);
        this.pool.updateStates();
    }
}