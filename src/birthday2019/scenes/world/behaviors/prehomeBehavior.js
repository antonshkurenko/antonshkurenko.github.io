import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {InvisibleZone} from "../../../units/invisibleZone";
import {Player} from "../../../units/player";
import {HomeBehavior} from "./homeBehavior";
import {TitushkasFactory} from "../../../units/personFactories/titushkaFactory";
import {ProtestFactory} from "../../../units/personFactories/protestFactory";

export class PrehomeBehavior {

    create(scene, data) {

        this.scene = scene;

        scene.add.image(0, 0, 'prehome_bg').setOrigin(0);

        this.player = new Player(
            scene,
            toPixels(GAME_W * 0.5),
            toPixels(GAME_H * 0.9),
            'shapes',
            data.playerMeta
        );

        scene.physics.world.bounds.width = GAME_W_DPR;
        scene.physics.world.bounds.height = GAME_H_DPR;


        let streetZone = new InvisibleZone(
            scene, toPixels(256), toPixels(0), toPixels(256), toPixels(64)
        );

        streetZone.collideWith(this.player, (player, zone) => {
            console.log(`Collided player: ${player} with street zone: ${zone}`);

            scene.scene.restart({
                behavior: new HomeBehavior(),
                data: {
                    playerMeta: this.player.meta
                }
            });
        });

        streetZone.putTextInside(
            'Christer\'s Hill Park', {
                fontFamily: 'Arial',
                fontSize: toPixels(24),
                fill: '#000000'
            }
        );

        this._addPeople();
        this._addBanner();
        this._addTrees();
        this._addTitushkas();

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(this.player);
        scene.cameras.main.roundPixels = true;
    }

    update(scene, time, delta) {
        this.player.onUpdate();
    }

    _addPeople() {

        let people = [
            {x: GAME_W_DPR * 0.17, y: GAME_H_DPR * 0.15},
            {x: GAME_W_DPR * 0.2, y: GAME_H_DPR * 0.4},
            {x: GAME_W_DPR * 0.21, y: GAME_H_DPR * 0.22},
            {x: GAME_W_DPR * 0.05, y: GAME_H_DPR * 0.22},
            {x: GAME_W_DPR * 0.3, y: GAME_H_DPR * 0.3},
            {x: GAME_W_DPR * 0.32, y: GAME_H_DPR * 0.44},
            {x: GAME_W_DPR * 0.31, y: GAME_H_DPR * 0.51},
            {x: GAME_W_DPR * 0.32, y: GAME_H_DPR * 0.64},
            {x: GAME_W_DPR * 0.30, y: GAME_H_DPR * 0.72},
            {x: GAME_W_DPR * 0.11, y: GAME_H_DPR * 0.65},
            {x: GAME_W_DPR * 0.25, y: GAME_H_DPR * 0.82},
            {x: GAME_W_DPR * 0.06, y: GAME_H_DPR * 0.56},
        ];

        const factories = [
            new ProtestFactory(this.scene),
        ];

        people.forEach((person) => {

            let factory = Phaser.Math.RND.pick(factories);

            let rndPerson = factory.create(person.x, person.y);

            this.scene.physics.add.collider(this.player, rndPerson, () => {
                rndPerson.onCollideWithPlayer(rndPerson, this.player);
            });
        });
    }

    _addTrees() {

        let trees = [
            {x: GAME_W_DPR * 0.1, y: GAME_H_DPR * 0.15},
            {x: GAME_W_DPR * 0.3, y: GAME_H_DPR * 0.2},
            {x: GAME_W_DPR * 0.12, y: GAME_H_DPR * 0.4},
            {x: GAME_W_DPR * 0.2, y: GAME_H_DPR * 0.6},
            {x: GAME_W_DPR * 0.27, y: GAME_H_DPR * 0.67},
            {x: GAME_W_DPR * 0.12, y: GAME_H_DPR * 0.8},
        ];

        trees.forEach((tree) => {
            this.scene.add.image(tree.x, tree.y, Phaser.Math.RND.pick([
                'tree1', 'tree2', 'tree3', 'tree4'
            ]), 0);
        });
    }

    _addBanner() {
        let bannerImage = this.scene.add.image(0, 0, 'banner', 0);
        bannerImage.setOrigin(0);
        let text = this.scene.add.text(0, 0, ['🌳Let\'s\nPark!🌲'], {
            fontFamily: 'Arial',
            fontSize: toPixels(16),
            fill: '#000000'
        });

        text.x = bannerImage.width * 0.5 - text.width * 0.5;
        text.y = bannerImage.height * 0.5 - text.height * 0.5;

        let container = this.scene.add.container(GAME_W_DPR * 0.1, GAME_H_DPR * 0.2, [bannerImage, text]);
        this.scene.physics.add.existing(container);
        container.body.setSize(bannerImage.width, bannerImage.height);
        container.body.setImmovable(true);

        this.scene.physics.add.collider(this.player, container);
    }

    _addTitushkas() {

        let text = this.scene.add
            .text(GAME_W_DPR * 0.69, GAME_H_DPR * 0.5,
                ['We want to create here another one cheloveinick. Fuck park. Click me.'], {
                    fontFamily: 'Arial',
                    fontSize: toPixels(20),
                    fill: '#000000',
                    wordWrap: {width: 450, useAdvancedWrap: true}
                }
            )
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
                window.open('https://www.facebook.com/groups/1235321513268172/', '_blank');
            });

        let titushkas = [
            {x: GAME_W_DPR * 0.95, y: GAME_H_DPR * 0.20},
            {x: GAME_W_DPR * 0.90, y: GAME_H_DPR * 0.20},
            {x: GAME_W_DPR * 0.85, y: GAME_H_DPR * 0.20},
            {x: GAME_W_DPR * 0.80, y: GAME_H_DPR * 0.20},
            {x: GAME_W_DPR * 0.75, y: GAME_H_DPR * 0.20},
            {x: GAME_W_DPR * 0.70, y: GAME_H_DPR * 0.20},
            {x: GAME_W_DPR * 0.65, y: GAME_H_DPR * 0.20},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.20},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.27},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.34},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.41},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.48},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.55},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.62},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.69},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.76},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.83},
            {x: GAME_W_DPR * 0.60, y: GAME_H_DPR * 0.90},
            {x: GAME_W_DPR * 0.65, y: GAME_H_DPR * 0.90},
            {x: GAME_W_DPR * 0.70, y: GAME_H_DPR * 0.90},
            {x: GAME_W_DPR * 0.75, y: GAME_H_DPR * 0.90},
            {x: GAME_W_DPR * 0.80, y: GAME_H_DPR * 0.90},
            {x: GAME_W_DPR * 0.85, y: GAME_H_DPR * 0.90},
            {x: GAME_W_DPR * 0.90, y: GAME_H_DPR * 0.90},
            {x: GAME_W_DPR * 0.95, y: GAME_H_DPR * 0.90},
        ];

        const factories = [
            new TitushkasFactory(this.scene),
        ];

        titushkas.forEach((titushka) => {

            let factory = Phaser.Math.RND.pick(factories);

            let t = factory.create(titushka.x, titushka.y);

            this.scene.physics.add.collider(this.player, t, () => {
                t.onCollideWithPlayer(t, this.player);
            });
        });
    }
}