import {toPixels} from "../utils/devicePixelRationUtils";
import {GAME_H_DPR} from "../game";

export class MovingObjectsPool {

    constructor(scene, factory, onRecycle, rBetweenDpi) {

        this.scene = scene;
        this.factory = factory;
        this.onRecycle = onRecycle;
        this.rBetweenDpi = rBetweenDpi;

        this.group = scene.add.group({
            removeCallback: (el) => {
                this.pool.add(el);
            }
        });

        this.pool = scene.add.group({
            removeCallback: (el) => {
                this.group.add(el);
            }
        });

        this.addObject(toPixels(Phaser.Math.RND.between(-this.rBetweenDpi * 0.75, -this.rBetweenDpi * 1.25)));
    }

    move(velocity) {
        this.group.getChildren().forEach((el) => {
            el.y += velocity;
        });
    }

    addObject(posY) {
        if (this.pool.getLength()) {
            let obj = this.pool.getFirst();
            obj.y = posY;
            obj.active = true;
            obj.visible = true;

            this.onRecycle(obj);

            this.pool.remove(obj);
        } else {
            let obj = this.factory(this.scene, posY);
            this.group.add(obj);
        }
    }

    updateStates() {

        let coords = this.group.getChildren().map((el) => el.y);

        let minY = Math.min(...coords);

        this.group.getChildren().forEach((el) => {
            if (GAME_H_DPR < el.y - el.height) {
                this.group.killAndHide(el);
                this.group.remove(el);
            }
        });

        if (minY > toPixels(this.rBetweenDpi)) {
            this.addObject(toPixels(Phaser.Math.RND.between(-this.rBetweenDpi * 0.75, -this.rBetweenDpi * 1.25)));
        }
    }

}