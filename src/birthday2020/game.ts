import 'phaser';
import {BootScene} from "./scenes/boot/boot";
import {GameScene} from "./scenes/game/game";

export const DPR = window.devicePixelRatio;

export const GAME_W = 768;
export const GAME_H = 576;

export const GAME_W_DPR = GAME_W * DPR;
export const GAME_H_DPR = GAME_H * DPR;

export const BIRTHDAY_2020_CONFIG = {
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.NONE,
        width: GAME_W_DPR,
        height: GAME_H_DPR,
        zoom: 1 / DPR
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200},
            debug: true
        }
    }
};

export const SCENE_BOOT = "boot";
export const SCENE_GAME = "game";

export class SimpleGame {

    constructor() {

        this.game = new Phaser.Game(BIRTHDAY_2020_CONFIG);

        this.game.scene.add(SCENE_BOOT, new BootScene(null));
        this.game.scene.add(SCENE_GAME, new GameScene(null));
    }

    game: Phaser.Game;

    start() {
        this.game.scene.start(SCENE_BOOT);
    }

}

export function startGame() {
    let birthday2020 = new SimpleGame();

    birthday2020.start();
}