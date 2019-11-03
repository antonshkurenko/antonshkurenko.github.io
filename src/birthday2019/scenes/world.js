import {GAME_H, GAME_W} from "../game";
import {toPixels} from "../utils/devicePixelRationUtils";

export class WorldScene extends Phaser.Scene {
    init(data) {
    }

    preload() {
    }

    create() {

        // let map = this.make.tilemap({key: 'tilesMap'});

        // let tiles = map.addTilesetImage('spritesheet', 'tiles');
        //
        // let grass = map.createStaticLayer('Grass', tiles, 0, 0);
        //
        // let obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        // obstacles.setCollisionByExclusion([-1]);

        this.player = this.physics.add.sprite(toPixels(50), toPixels(100), 'shapes', 0);
        this.player.tint = 0xEF5350;

        this.physics.world.bounds.width = GAME_W;
        this.physics.world.bounds.height = GAME_H;
        this.player.setCollideWorldBounds(true);

        // let text = this.add.text(0, toPixels(60), '😜 Text', {
        //     fontFamily: 'Arial',
        //     fontSize: toPixels(24),
        //     fill: '#ff0000'
        // });
        // let textObj = this.physics.add.existing(text);
        // textObj.body.setEnable(true);
        // textObj.body.setCollideWorldBounds(true);
        // textObj.body.setImmovable(true);

        //this.physics.add.collider(this.player, textObj);

        let randomPerson = this.add.image(0, 0, 'shapes', 3);
        // let randomText = this.add.text(0, 0, '🍺', {fontFamily: 'Arial', fontSize: toPixels(24), fill: '#ff0000'});

        let randomContainer = this.add.container(toPixels(100), toPixels(100), [randomPerson/*, randomText*/]);
        let containerObj = this.physics.add.existing(randomContainer);
        containerObj.body.setEnable(true);
        containerObj.body.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, containerObj);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, GAME_W, GAME_H);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        // this.physics.add.collider(this.player, obstacles);

        this.spawns = this.physics.add.group({classType: Phaser.GameObjects.Zone});
        for (let i = 0; i < 10; i++) {
            let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, toPixels(20), toPixels(20));
        }
        this.physics.add.overlap(
            this.player, this.spawns,
            this.onMeetEnemy,
            () => true, this
        );
    }

    update(time, delta) {
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

    onMeetEnemy(player, zone) {

        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

        // shake the world

        let camera = this.cameras.main;

        camera.shake(100, 0.005);
        //camera.flash(400);
        // camera.fade(400);

        // start battle
        //this.scene.switch(SCENE_BATTLE);
    }
}