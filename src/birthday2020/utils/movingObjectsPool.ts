import {toPixels} from "../utils/devicePixelRationUtils";
import {GAME_H_DPR, GAME_W_DPR} from "../game";
import {ObjectsPool} from "./objectsPool";

export class MovingObjectsPool<T extends Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform & Phaser.GameObjects.Components.Visible & Phaser.GameObjects.Components.ComputedSize> {

    private readonly pool: ObjectsPool<T>;
    private readonly rBetweenDpi: number;

    // private readonly _onGrab: (el: T) => void = (el: T) => {
    //     el.x = toPixels(Phaser.Math.RND.between(-this.rBetweenDpi * 0.75, -this.rBetweenDpi * 1.25));
    //     el.y = toPixels(Phaser.Math.RND.between(-this.rBetweenDpi * 0.75, -this.rBetweenDpi * 1.25));
    //     el.visible = true;
    // }

    constructor(
        pool: ObjectsPool<T>,
        rBetweenDpi: number
    ) {

        this.pool = pool;
        this.rBetweenDpi = rBetweenDpi;

        this.pool.addObject((el: T) => {
            el.x = toPixels(Phaser.Math.RND.between(-this.rBetweenDpi * 0.75, -this.rBetweenDpi * 1.25));
            el.y = toPixels(Phaser.Math.RND.between(-this.rBetweenDpi * 0.75, -this.rBetweenDpi * 1.25));
        });
    }

    move(velocity: number) {

        this.pool.group.getChildren().forEach((el) => {

            el.body.position.x -= velocity;
            // (el as T).x -= velocity;
            // (el.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
        });
    }

    updateStates() {

        let coords = this.pool.group.getChildren().map(
            (el) => {
                return el.body.position.x;
            });

        console.log(`COORDS: ${coords}`);

        // TODO: play with it
        let maxX = Math.max(...coords);

        console.log(`update states: maxX ${maxX}, GAME_W_DPR: ${GAME_W_DPR}`);

        this.pool.group.getChildren().forEach((el) => {
            let el1 = (el as T);

            let width = (el.body as Phaser.Physics.Arcade.Body).width;
            let x = el.body.position.x;

            if (0 > x + width) {
                this.pool.release(el1);
            }
        });

        if (maxX < GAME_W_DPR) {
            this.pool.addObject((el: T) => {
                el.body.position.x = maxX + toPixels(80) + toPixels(Phaser.Math.RND.between(this.rBetweenDpi * 0.75, this.rBetweenDpi * 1.25));
                el.body.position.y = toPixels(Phaser.Math.RND.between(-this.rBetweenDpi * 0.75, -this.rBetweenDpi * 1.25));

                console.log(`new object: x: ${el.body.position.x}`);
            });
        }
    }
}