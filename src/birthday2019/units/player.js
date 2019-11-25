import {toPixels} from "../utils/devicePixelRationUtils";

export class Player extends Phaser.GameObjects.Container {

    constructor(scene, x, y, texture, meta) {
        super(scene, x, y);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.personSprite = this.scene.add.image(0, 0, 'shapes', meta.frames);
        this.personSprite.x = this.personSprite.width * 0.5;
        this.personSprite.y = this.personSprite.height * 0.5;
        this.personSprite.setRotation(Phaser.Math.RND.rotation());

        this.add(this.personSprite);

        this.body.setSize(this.personSprite.width, this.personSprite.height);
        this.body.setEnable(true);

        this.body.setCollideWorldBounds(true);

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.meta = meta;

        if (this.meta.tint) {
            this.dressUp(this.meta.tint);
        }

        if (this.meta.personEmoji) {
            this.personalize(this.meta.personEmoji);
        }

        if (this.meta.drinkEmoji) {
            this.drink(this.meta.drinkEmoji);
        }
    }

    personalize(emoji) {
        this.meta.personEmoji = emoji;

        if (this.personalizeEmoji) {
            this.personalizeEmoji.destroy();
        }

        this.personalizeEmoji = this._addEmoji(emoji);
    }

    drink(emoji) {
        this.meta.drinkEmoji = emoji;

        if (this.drinkEmoji) {
            this.drinkEmoji.destroy();
        }

        this.drinkEmoji = this._addEmoji(emoji);
    }

    dressUp(color) {
        this.personSprite.tint = color;
        this.meta.tint = color;
    }

    currentDress() {
        return this.meta.tint;
    }

    onUpdate() {
        this.body.setVelocity(toPixels(0));

        const velocity = 120;

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(toPixels(-velocity));
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(toPixels(velocity));
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.body.setVelocityY(toPixels(-velocity));
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(toPixels(velocity));
        }
        if (this.body.velocity.lengthSq() > 0) {
            this.personSprite.setRotation(this.body.velocity.angle() + Phaser.Math.TAU);
        }
    }

    _addEmoji(emoji) {

        let text = this.scene.add.text(0, 0, emoji.ch, {
            fontFamily: 'Arial',
            fontSize: toPixels(20),
            fill: '#ff0000'
        });

        switch (emoji.vAlign) {
            case "center":
                text.y = this.personSprite.height * 0.5 - text.height * 0.5;
                break;
            case "btm":
                text.y = this.personSprite.height - text.height;
                break;
            case "top":
                text.y = 0;
                break;
            default:
                throw "Unsupported vAlign"
        }

        switch (emoji.hAlign) {
            case "center":
                text.x = this.personSprite.width * 0.5 - text.width * 0.5;
                break;
            case "right":
                text.x = this.personSprite.width - text.width;
                break;
            case "left":
                text.x = 0;
                break;
            default:
                throw "Unsupported hAlign"
        }

        this.add(text);

        return text;
    }
}