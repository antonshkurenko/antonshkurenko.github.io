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

        // pool.addObject(this._onGrab)
    }

    move(velocity: number) {

        this.pool.group.getChildren().forEach((el) => {

            console.log(`move platform, x: ${(el as T).x}, vel: ${velocity}`);

            console.log(`velocity; ${(el.body as Phaser.Physics.Arcade.Body).velocity.x}`);
            el.body.position.x -= velocity;
            (el as T).x -= velocity;
            // (el.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
        });
    }

    updateStates() {

        let coords = this.pool.group.getChildren().map(
            (el) => {
                return (el as unknown as Phaser.GameObjects.Components.Transform).x;
            });

        // TODO: play with it
        let minX = Math.max(...coords);

        console.log(`update states: ${minX}`);

        this.pool.group.getChildren().forEach((el) => {
            let el1 = (el as T);
            if (GAME_W_DPR < el1.x - el1.width) {
                this.pool.release(el1);
            }
        });

        if (minX > toPixels(this.rBetweenDpi)) {
            this.pool.addObject((el: T) => {
                el.x = toPixels(Phaser.Math.RND.between(-this.rBetweenDpi * 0.75, -this.rBetweenDpi * 1.25));
                el.y = toPixels(Phaser.Math.RND.between(-this.rBetweenDpi * 0.75, -this.rBetweenDpi * 1.25));
                el.visible = true;
            });
        }
    }
}