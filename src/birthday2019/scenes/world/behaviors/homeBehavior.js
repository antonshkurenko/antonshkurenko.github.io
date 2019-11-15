import {toPixels} from "../../../utils/devicePixelRationUtils";
import {GAME_H, GAME_H_DPR, GAME_W, GAME_W_DPR} from "../../../game";
import {InvisibleZone} from "../../../units/invisibleZone";

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


        let text = scene.add.text(0, toPixels(60), '😜 Text', {
            fontFamily: 'Arial',
            fontSize: toPixels(24),
            fill: '#ff0000'
        });
        let textObj = scene.physics.add.existing(text);
        textObj.body.setEnable(true);
        textObj.body.setCollideWorldBounds(true);
        textObj.body.setImmovable(true);

        scene.physics.add.collider(this.player, textObj);

        let randomPerson = scene.add.image(0, 0, 'shapes', 3);
        let randomText = scene.add.text(0, 0, '🍺', {fontFamily: 'Arial', fontSize: toPixels(24), fill: '#ff0000'});

        let randomContainer = scene.add.container(toPixels(100), toPixels(100), [randomPerson, randomText]);
        let containerObj = scene.physics.add.existing(randomContainer);
        containerObj.body.setEnable(true);
        containerObj.body.setCollideWorldBounds(true);

        scene.physics.add.collider(this.player, containerObj);

        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.cameras.main.setBounds(0, 0, GAME_W_DPR, GAME_H_DPR);
        scene.cameras.main.startFollow(this.player);
        scene.cameras.main.roundPixels = true;

        this.spawns = scene.physics.add.group({classType: Phaser.GameObjects.Zone});
        for (let i = 0; i < 10; i++) {
            let x = Phaser.Math.RND.between(0, scene.physics.world.bounds.width);
            let y = Phaser.Math.RND.between(0, scene.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, toPixels(20), toPixels(20));
        }
        scene.physics.add.overlap(
            this.player, this.spawns,
            this.onMeetEnemy,
            () => true, this
        );
    }

    onMeetEnemy(player, zone) {

        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.scene.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.scene.physics.world.bounds.height);

        // shake the world

        let camera = this.scene.cameras.main;

        camera.shake(100, 0.005);
        //camera.flash(400);
        // camera.fade(400);
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