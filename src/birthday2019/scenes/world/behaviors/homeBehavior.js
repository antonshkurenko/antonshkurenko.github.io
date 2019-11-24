import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {Player} from "../../../units/player";
import {InvisibleZone} from "../../../units/invisibleZone";
import {FriendsFactory} from "../../../units/personFactories/friendsFactory";

export class HomeBehavior {

    create(scene, data) {

        this.scene = scene;

        scene.add.image(0, 0, 'home_bg').setOrigin(0);

        this.player = new Player(
            scene,
            toPixels(GAME_W * 0.5),
            toPixels(GAME_H * 0.9),
            'shapes',
            data.playerMeta
        );

        let tableZone = new InvisibleZone(
            scene, toPixels(256), toPixels(224), toPixels(256), toPixels(128)
        );

        let text = tableZone.putTextInside(
            '🍷🍕🍺🥃', {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#000000'
            }
        );

        let collisionHappened = false;
        tableZone.collideWith(this.player, (player, zone) => {

            if (!collisionHappened) {
                collisionHappened = true;

                text.setText("Fancy a drink?\nClick me.")
                    .setInteractive()
                    .on('pointerover', function () {
                        text.setStyle({
                            fill: '#ff0000'
                        });
                        this.scene.sys.canvas.style.cursor = 'pointer';
                    })
                    .on('pointerout', function () {
                        text.setStyle({
                            fill: '#000000'
                        });
                        this.scene.sys.canvas.style.cursor = 'default';
                    })
                    .on('pointerdown', function () {
                        window.open('https://forms.gle/b2WecCA23wfvhnkX7', '_blank');
                    });
            }
        });

        this._addPeople();

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(this.player);
        scene.cameras.main.roundPixels = true;
    }

    update(scene, time, delta) {
        this.player.onUpdate();
    }

    _addPeople() {

        let people = [
            {x: GAME_W_DPR * 0.78, y: GAME_H_DPR * 0.4},
            {x: GAME_W_DPR * 0.78 - toPixels(42), y: GAME_H_DPR * 0.4 - toPixels(32)},
            {x: GAME_W_DPR * 0.78 - toPixels(68), y: GAME_H_DPR * 0.4 + toPixels(2)},
            {x: GAME_W_DPR * 0.78 - toPixels(28), y: GAME_H_DPR * 0.4 + toPixels(44)},

            {x: GAME_W_DPR * 0.56, y: GAME_H_DPR * 0.3},
            {x: GAME_W_DPR * 0.56 - toPixels(36), y: GAME_H_DPR * 0.3 + toPixels(8)},

            {x: GAME_W_DPR * 0.64, y: GAME_H_DPR * 0.22},
            {x: GAME_W_DPR * 0.64 + toPixels(40), y: GAME_H_DPR * 0.22 - toPixels(16)},
            {x: GAME_W_DPR * 0.64 - toPixels(4), y: GAME_H_DPR * 0.22 - toPixels(42)},

            {x: GAME_W_DPR * 0.38, y: GAME_H_DPR * 0.31},
            {x: GAME_W_DPR * 0.38 + toPixels(42), y: GAME_H_DPR * 0.31 - toPixels(12)},
            {x: GAME_W_DPR * 0.38 - toPixels(6), y: GAME_H_DPR * 0.31 - toPixels(40)},

            {x: GAME_W_DPR * 0.4, y: GAME_H_DPR * 0.64},
            {x: GAME_W_DPR * 0.4 + toPixels(36), y: GAME_H_DPR * 0.64 + toPixels(2)},

            {x: GAME_W_DPR * 0.24, y: GAME_H_DPR * 0.42},
            {x: GAME_W_DPR * 0.24 - toPixels(40), y: GAME_H_DPR * 0.42 - toPixels(32)},
            {x: GAME_W_DPR * 0.24 - toPixels(54), y: GAME_H_DPR * 0.42 + toPixels(20)},
            {x: GAME_W_DPR * 0.24 - toPixels(18), y: GAME_H_DPR * 0.42 + toPixels(48)},

            {x: GAME_W_DPR * 0.58, y: GAME_H_DPR * 0.68},

            {x: GAME_W_DPR * 0.22, y: GAME_H_DPR * 0.71},
            {x: GAME_W_DPR * 0.22 + toPixels(2), y: GAME_H_DPR * 0.71 + toPixels(60)},
            {x: GAME_W_DPR * 0.22 + toPixels(58), y: GAME_H_DPR * 0.71 + toPixels(4)},
            {x: GAME_W_DPR * 0.22 + toPixels(58), y: GAME_H_DPR * 0.71 + toPixels(54)},
        ];

        let factory = new FriendsFactory(this.scene);

        people.forEach((person) => {

            let rndPerson = factory.create(person.x, person.y);

            this.scene.physics.add.collider(this.player, rndPerson, () => {
                rndPerson.onCollideWithPlayer(rndPerson, this.player);
            });
        });
    }
}