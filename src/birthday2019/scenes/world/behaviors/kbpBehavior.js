import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR, SCENE_DEFEAT} from "../../../game";
import {InvisibleZone} from "../../../units/invisibleZone";
import {RoadBehavior} from "./roadBehavior";
import {Player} from "../../../units/player";
import {TaxiDriverFactory} from "../../../units/personFactories/taxiDriverFactory";
import {RandomPersonFactory} from "../../../units/personFactories/randomPersonFactory";
import {ManiacFactory} from "../../../units/personFactories/maniacFactory";

export class KbpBehavior {

    create(scene, data) {

        this.scene = scene;

        scene.add.image(0, 0, 'kbp_bg').setOrigin(0);

        this.player = new Player(
            scene,
            toPixels(GAME_W * 0.5),
            toPixels(GAME_H * 0.9),
            'shapes',
            data.playerMeta
        );

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;

        let kbpZone = new InvisibleZone(
            scene, toPixels(256), toPixels(0), toPixels(256), toPixels(64)
        );

        kbpZone.collideWith(this.player, (player, zone) => {

            scene.scene.restart({
                behavior: new RoadBehavior(),
                data: {
                    playerMeta: this.player.meta
                }
            });
        });

        kbpZone.putTextInside(
            '🛬 Arrivals', {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#000000'
            }
        );

        let flowersZone = new InvisibleZone(
            scene, toPixels(112), toPixels(200), toPixels(144), toPixels(144)
        );

        flowersZone.collideWith(this.player, (player, zone) => {
        });

        flowersZone.putTextInside(
            '💐 Flowers', {
                fontFamily: 'Arial',
                fontSize: toPixels(22),
                fill: '#000000'
            }
        );

        let exchZone = new InvisibleZone(
            scene, toPixels(512), toPixels(200), toPixels(144), toPixels(144)
        );

        exchZone.collideWith(this.player, (player, zone) => {
            this.scene.game.scene.start(SCENE_DEFEAT, {
                msg: "Exchange rate is fatal ☠️"
            });
        });

        exchZone.putTextInside(
            '💸 Exchange', {
                fontFamily: 'Arial',
                fontSize: toPixels(22),
                fill: '#000000'
            }
        );

        let entranceZone = new InvisibleZone(
            scene, toPixels(180), toPixels(475), toPixels(408), toPixels(1)
        );

        entranceZone.collideWith(this.player, (player, zone) => {
        });

        this._addPeople();

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(this.player);
        scene.cameras.main.roundPixels = true;
    }

    update(scene, time, delta) {
        this.player.onUpdate();
    }

    _addPeople() {

        let people = [
            {x: GAME_W_DPR * 0.21, y: GAME_H_DPR * 0.74},
            {x: GAME_W_DPR * 0.26, y: GAME_H_DPR * 0.75},
            {x: GAME_W_DPR * 0.31, y: GAME_H_DPR * 0.76},
            {x: GAME_W_DPR * 0.37, y: GAME_H_DPR * 0.764},
            {x: GAME_W_DPR * 0.44, y: GAME_H_DPR * 0.755},
            {x: GAME_W_DPR * 0.49, y: GAME_H_DPR * 0.743},
            {x: GAME_W_DPR * 0.55, y: GAME_H_DPR * 0.752},
            {x: GAME_W_DPR * 0.61, y: GAME_H_DPR * 0.751},
            {x: GAME_W_DPR * 0.66, y: GAME_H_DPR * 0.742},
            {x: GAME_W_DPR * 0.72, y: GAME_H_DPR * 0.753},
            {x: GAME_W_DPR * 0.77, y: GAME_H_DPR * 0.763},

            {x: GAME_W_DPR * 0.3, y: GAME_H_DPR * 0.64},
            {x: GAME_W_DPR * 0.36, y: GAME_H_DPR * 0.62},
            {x: GAME_W_DPR * 0.4, y: GAME_H_DPR * 0.51},
        ];

        let maniacFactory = new ManiacFactory(this.scene);
        let taxiFactory = new TaxiDriverFactory(this.scene);
        let randomFactory = new RandomPersonFactory(this.scene);

        people.forEach((person) => {

            const result = Phaser.Math.RND.frac();
            let factory;

            if (result < 0.1) {
                factory = maniacFactory;
            } else if (result < 0.25) {
                factory = taxiFactory;
            } else {
                factory = randomFactory;
            }

            let rndPerson = factory.create(person.x, person.y);

            this.scene.physics.add.collider(this.player, rndPerson, () => {
                rndPerson.onCollideWithPlayer(rndPerson, this.player);
            });
        });
    }
}