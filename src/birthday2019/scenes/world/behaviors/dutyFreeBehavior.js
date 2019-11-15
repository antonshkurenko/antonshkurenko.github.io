import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {InvisibleZone} from "../../../units/invisibleZone";
import {KbpBehavior} from "./kbpBehavior";

export class DutyFreeBehavior {

    create(scene) {

        this.scene = scene;

        scene.add.image(0, 0, 'df_bg').setOrigin(0);

        this.player = scene.physics.add.sprite(toPixels(GAME_W * 0.5), toPixels(GAME_H * 0.9), 'shapes', 0);
        this.player.tint = 0xEF5350;

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;
        this.player.setCollideWorldBounds(true);

        let dfZone = new InvisibleZone(
            scene, toPixels(256), toPixels(0), toPixels(256), toPixels(64)
        );

        dfZone.collideWith(this.player, (player, zone) => {
            console.log(`Collided player: ${player} with df zone: ${zone}`);

            let camera = this.scene.cameras.main;

            // camera.shake(100, 0.005);

            // DOESNT WORK!!!
            camera.flash(400);
            // camera.fade(400);

            scene.scene.restart({
                behavior: new KbpBehavior(),
            });
        });

        dfZone.putTextInside(
            '🍷👗🕶 Duty Free', {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#000000'
            }
        );

        let shops = [
            {name: "YSL", x: 0, y: 0},
            {name: "Gucci", x: 0, y: 144},
            {name: "Balenciaga", x: 0, y: 288},
            {name: "Nike", x: 0, y: 432},
            {name: "Versace", x: 624, y: 0},
            {name: "Lacoste", x: 624, y: 144},
            {name: "Louis Vuitton", x: 624, y: 288},
            {name: "Valentino", x: 624, y: 432},
        ];

        shops.forEach((shop) => {
            let shopZone = new InvisibleZone(
                scene, toPixels(shop.x), toPixels(shop.y), toPixels(144), toPixels(144)
            );

            shopZone.collideWith(this.player, (player, zone) => {
                console.log(`Collided player: ${player} with shop zone: ${shop.name}`);
            });

            shopZone.putTextInside(
                shop.name, {
                    fontFamily: 'Arial',
                    fontSize: toPixels(22),
                    fill: '#000000'
                }
            );
        });

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
            }, {
                ch: '🌂',
                vAlign: 'btm',
                hAlign: 'right'
            }, {
                ch: '👒',
                vAlign: 'top',
                hAlign: 'center'
            }, {
                ch: '🧢',
                vAlign: 'top',
                hAlign: 'center'
            }
        ];

        let people = [
            {x: GAME_W_DPR * 0.4, y: GAME_H_DPR * 0.4},
            {x: GAME_W_DPR * 0.4 + toPixels(40), y: GAME_H_DPR * 0.4 + toPixels(5)},
        ];

        people.forEach((person) => {
            let personSprite = scene.add.image(0, 0, 'shapes', 0);
            personSprite.x = personSprite.width * 0.5;
            personSprite.y = personSprite.height * 0.5;
            personSprite.setRotation(Phaser.Math.RND.rotation());

            let personObj = scene.add.container(person.x, person.y, [personSprite]);

            if (Phaser.Math.RND.between(0, 4) > 2) {

                let emoji = Phaser.Math.RND.pick(emojis);

                let text = scene.add.text(0, 0, emoji.ch, {
                    fontFamily: 'Arial',
                    fontSize: toPixels(20),
                    fill: '#ff0000'
                });

                switch (emoji.vAlign) {
                    case "center":
                        text.y = personSprite.height * 0.5 - text.height * 0.5;
                        break;
                    case "btm":
                        text.y = personSprite.height - text.height;
                        break;
                    case "top":
                        text.y = 0;
                        break;
                    default:
                        throw "Unsupported vAlign"
                }

                switch (emoji.hAlign) {
                    case "center":
                        text.x = personSprite.width * 0.5 - text.width * 0.5;
                        break;
                    case "right":
                        text.x = personSprite.width - text.width;
                        break;
                    case "left":
                        text.x = 0;
                        break;
                    default:
                        throw "Unsupported hAlign"
                }

                personObj.add(text);
            }

            scene.physics.add.existing(personObj);
            personObj.body.setSize(personSprite.width, personSprite.height);
            personObj.body.setEnable(true);
            personObj.body.setImmovable(true);

            scene.physics.add.collider(this.player, personObj, () => {
                console.log(`Collided player with person: ${person}`);
            });
        });

        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(this.player);
        scene.cameras.main.roundPixels = true;
    }

    update(scene, time, delta) {
        this.player.body.setVelocity(toPixels(0));

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(toPixels(-80));
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(toPixels(80));
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(toPixels(-80));
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(toPixels(80));
        }
    }
}