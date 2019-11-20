import {toPixels} from "../../../utils/devicePixelRationUtils";
import {CONFIG, GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {InvisibleZone} from "../../../units/invisibleZone";
import {KbpBehavior} from "./kbpBehavior";
import {Player} from "../../../units/player";
import {RandomPersonFactory} from "../../../units/personFactories/randomPersonFactory";
import {GuardFactory} from "../../../units/personFactories/guardFactory";

export class DutyFreeBehavior {

    create(scene, data) {

        this.scene = scene;

        scene.add.image(0, 0, 'df_bg').setOrigin(0);

        this.player = new Player(
            scene,
            toPixels(GAME_W * 0.5),
            toPixels(GAME_H * 0.9),
            'shapes',
            data.playerMeta
        );

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;

        let guard = this._addGuard();
        this._addShops(guard);
        this._addPeople();

        let dfZone = new InvisibleZone(
            scene, toPixels(256), toPixels(0), toPixels(256), toPixels(64)
        );

        dfZone.collideWith(this.player, (player, zone) => {
            console.log(`Collided player: ${player} with df zone: ${zone}`);

            if (this.player.currentDress() === CONFIG.defaultColor) {
                guard.conversation.hit("❗️", {
                    fontFamily: 'Arial',
                    fontSize: toPixels(24),
                    fill: '#000000'
                });
            } else {
                scene.scene.restart({
                    behavior: new KbpBehavior(),
                    data: {
                        playerMeta: this.player.meta
                    }
                });
            }
        });

        dfZone.putTextInside(
            '🍷👗🕶 Duty Free', {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#000000'
            }
        );

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(this.player);
        scene.cameras.main.roundPixels = true;
    }

    update(scene, time, delta) {
        this.player.onUpdate();
    }

    _addShops(guard) {
        let shops = [
            {name: "YSL", x: 0, y: 0, color: 0xF44336},
            {name: "Gucci", x: 0, y: 144, color: 0xE91E63},
            {name: "Balenciaga", x: 0, y: 288, color: 0x9C27B0},
            {name: "Nike", x: 0, y: 432, color: 0x2196F3},
            {name: "Versace", x: 624, y: 0, color: 0x00BCD4},
            {name: "Lacoste", x: 624, y: 144, color: 0x4CAF50},
            {name: "Louis Vuitton", x: 624, y: 288, color: 0xFFEB3B},
            {name: "Valentino", x: 624, y: 432, color: 0xFFC107},
        ];

        shops.forEach((shop) => {
            let shopZone = new InvisibleZone(
                this.scene, toPixels(shop.x), toPixels(shop.y), toPixels(144), toPixels(144)
            );

            shopZone.collideWith(this.player, (player, zone) => {
                console.log(`Collided player: ${player} with shop zone: ${shop.name}, color: ${shop.color}`);

                if (player.currentDress() !== shop.color) {
                    this.scene.cameras.main.flash(400);
                    player.dressUp(shop.color);
                }

                if (player.currentDress() !== CONFIG.defaultColor) {
                    guard.conversation.changePhrases(
                        ["You're good"],
                        ["Come in, come in"],
                        ["So hot 🔥"]
                    );
                }
            });

            shopZone.putTextInside(
                shop.name, {
                    fontFamily: 'Arial',
                    fontSize: toPixels(22),
                    fill: '#000000'
                }
            );
        });
    }

    _addPeople() {
        let people = [
            {x: GAME_W_DPR * 0.4, y: GAME_H_DPR * 0.4},
            {x: GAME_W_DPR * 0.4 + toPixels(40), y: GAME_H_DPR * 0.4 + toPixels(5)},
            {x: GAME_W_DPR * 0.25, y: GAME_H_DPR * 0.3},
            {x: GAME_W_DPR * 0.6, y: GAME_H_DPR * 0.5},
            {x: GAME_W_DPR * 0.6 + toPixels(40), y: GAME_H_DPR * 0.5 + toPixels(30)},
            {x: GAME_W_DPR * 0.6 + toPixels(5), y: GAME_H_DPR * 0.5 + toPixels(60)},
            {x: GAME_W_DPR * 0.3, y: GAME_H_DPR * 0.55},
            {x: GAME_W_DPR * 0.3 + toPixels(-5), y: GAME_H_DPR * 0.55 + toPixels(40)},
        ];

        let factory = new RandomPersonFactory(this.scene);

        people.forEach((person) => {

            let rndPerson = factory.create(person.x, person.y);

            this.scene.physics.add.collider(this.player, rndPerson, () => {
                rndPerson.onCollideWithPlayer(rndPerson, this.player);
            });
        });
    }

    _addGuard() {

        let factory = new GuardFactory(this.scene);

        let guard = factory.create(toPixels(500), toPixels(72));

        this.scene.physics.add.collider(this.player, guard, () => {
            guard.onCollideWithPlayer(guard, this.player);
        });

        return guard;
    }
}