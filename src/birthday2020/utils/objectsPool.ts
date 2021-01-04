export class ObjectsPool<T extends Phaser.GameObjects.GameObject> {

    public readonly group: Phaser.GameObjects.Group;

    private readonly scene: Phaser.Scene;
    private readonly factory: (scene: Phaser.Scene) => T;
    private readonly onRecycle: (obj: T) => void;
    private readonly rBetweenDpi: number;

    private readonly pool: Phaser.GameObjects.Group;

    constructor(
        scene: Phaser.Scene,
        factory: (scene: Phaser.Scene) => T,
        onRecycle: (obj: T) => void,
        rBetweenDpi: number
    ) {

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
    }

    addObject(onGrab: (obj: T) => void) {
        if (this.pool.getLength()) {
            let obj = this.pool.getFirst() as T;
            onGrab(obj);
            obj.active = true;

            this.onRecycle(obj);

            this.pool.remove(obj);
        } else {
            let obj = this.factory(this.scene);
            this.group.add(obj);
        }
    }

    release(obj: T) {
        this.group.killAndHide(obj);
        this.group.remove(obj);
    }
}