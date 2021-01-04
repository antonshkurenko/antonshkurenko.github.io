import {toPixels} from "../utils/devicePixelRationUtils";
import {RunningState, State} from "./playerStates/states";

export class Player extends Phaser.GameObjects.Container {

    private playerState: State;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        children: Phaser.GameObjects.GameObject[]
    ) {
        super(scene, x, y, children);

        this.playerState = new RunningState();

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        let arcadeBody: Phaser.Physics.Arcade.Body = this.body as Phaser.Physics.Arcade.Body;

        arcadeBody.setSize(toPixels(20), toPixels(20));
        arcadeBody.setEnable(true);

        arcadeBody.setCollideWorldBounds(true);

        scene.input.keyboard.on('keydown', (e: KeyboardEvent) => {
            this.playerState.action(this);
        }, this);
    }

    changeState(newState: State): void {
        this.playerState = newState;
    }
}