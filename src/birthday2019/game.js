import {BootScene} from "./scenes/boot";
import {MenuScene} from "./scenes/menu";
import {WorldScene} from "./scenes/world";

export const SIZE = 600;

export const DPR = window.devicePixelRatio;

export const GAME_W = SIZE * DPR;
export const GAME_H = SIZE * DPR;

console.log(`Game size: ${GAME_W}/${GAME_H}`);

export const SCENE_BOOT = "boot";
export const SCENE_MENU = "menu";
export const SCENE_WORLD = "world";

export const BIRTHDAY_2019_CONFIG = {
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.NONE,
        width: GAME_W,
        height: GAME_H,
        zoom: 1 / DPR
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: true
        }
    }
};

export function startGame() {
    let birthday2019 = new Phaser.Game(BIRTHDAY_2019_CONFIG);

    birthday2019.scene.add(SCENE_BOOT, new BootScene(null));
    birthday2019.scene.add(SCENE_MENU, new MenuScene(null));
    birthday2019.scene.add(SCENE_WORLD, new WorldScene(null));

    birthday2019.scene.start(SCENE_BOOT);
}