import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {InvisibleZone} from "../../../units/invisibleZone";
import {KbpBehavior} from "./kbpBehavior";
import {Player} from "../../../units/player";
import {Conversation} from "../../../units/conversation";
import {RandomPerson} from "../../../units/randomPerson";

const START_PHRASES = [
    "Hey!",
    "Howdy?",
    "Hello",
    "Hi",
    "What's up?",
    "Good Day Sir",
];
const LATE_PHRASES = [
    "Don't push me 💢",
];
const RARE_PHRASES = [
    "We're no strangers to love\n" +
    "You know the rules and so do I",
];

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

        let dfZone = new InvisibleZone(
            scene, toPixels(256), toPixels(0), toPixels(256), toPixels(64)
        );

        dfZone.collideWith(this.player, (player, zone) => {
            console.log(`Collided player: ${player} with df zone: ${zone}`);

            scene.scene.restart({
                behavior: new KbpBehavior(),
                data: {
                    playerMeta: this.player.meta
                }
            });
        });

        dfZone.putTextInside(
            '🍷👗🕶 Duty Free', {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#000000'
            }
        );

        this._addShops();
        this._addPeople();

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(this.player);
        scene.cameras.main.roundPixels = true;
    }

    update(scene, time, delta) {
        this.player.onUpdate();
    }

    _addShops() {
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
        let emojis = [
            {
                ch: '👜',
                vAlign: 'btm',
                hAlign: 'right'
            },
            {
                ch: '💼',
                vAlign: 'btm',
                hAlign: 'right'
            },
            {
                ch: '🌂',
                vAlign: 'btm',
                hAlign: 'right'
            },
            {
                ch: '👒',
                vAlign: 'top',
                hAlign: 'center'
            },
            {
                ch: '🧢',
                vAlign: 'top',
                hAlign: 'center'
            },
            {
                ch: '🎩',
                vAlign: 'top',
                hAlign: 'center'
            },
            {
                ch: '👓',
                vAlign: 'top',
                hAlign: 'center'
            },
            {
                ch: '🕶',
                vAlign: 'top',
                hAlign: 'center'
            },
            {
                ch: '🔫',
                vAlign: 'center',
                hAlign: 'left'
            },
            {
                ch: '🔪',
                vAlign: 'btm',
                hAlign: 'right'
            },
            {
                ch: '🎈',
                vAlign: 'top',
                hAlign: 'left'
            },
            {
                ch: '💤',
                vAlign: 'top',
                hAlign: 'right'
            }
        ];

        let people = [
            {x: GAME_W_DPR * 0.4, y: GAME_H_DPR * 0.4},
            {x: GAME_W_DPR * 0.4 + toPixels(40), y: GAME_H_DPR * 0.4 + toPixels(5)},
        ];

        people.forEach((person) => {

            let rndPerson = new RandomPerson(this.scene, person.x, person.y, emojis);

            let conversation = new Conversation(this.scene, rndPerson.getBounds(), START_PHRASES, LATE_PHRASES, RARE_PHRASES);

            this.scene.physics.add.collider(this.player, rndPerson, () => {
                console.log(`Collided player with person: ${person}`);
                conversation.hit();
            });
        });
    }
}