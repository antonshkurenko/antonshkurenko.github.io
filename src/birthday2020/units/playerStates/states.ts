import {Player} from "../player";

export interface State {

    /**
     *
     * @param player is a context of the action
     * todo: @param currentPlatform must be a current platform, runner is running on, to produce another action
     * or maybe add another method, like collider?
     */
    action(player: Player): void;
}

export class RunningState implements State {
    action(player: Player): void {

        (player.body as Phaser.Physics.Arcade.Body).velocity.y = -350;
        // player.changeState(new JumpingState());
    }
}

export class JumpingState implements State {
    action(player: Player): void {
    }
}

export class DoubleJumpingState implements State {
    action(player: Player): void {
    }
}

export class CrouchState implements State {
    action(player: Player): void {
    }
}

export class FastDashState implements State {
    action(player: Player): void {
    }
}

