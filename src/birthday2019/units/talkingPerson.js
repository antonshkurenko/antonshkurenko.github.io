import {toPixels} from "../utils/devicePixelRationUtils";
import {Conversation} from "./conversation";

export class TalkingPerson extends Phaser.GameObjects.Container {
    constructor(scene, x, y, color, emojis, forceEmoji, phrases, onCollideWithPlayer) {
        super(scene, x, y);

        this.onCollideWithPlayer = onCollideWithPlayer;

        forceEmoji = forceEmoji || false;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.personSprite = this.scene.add.image(0, 0, 'shapes', Phaser.Math.RND.between(0, 4));
        this.personSprite.x = this.personSprite.width * 0.5;
        this.personSprite.y = this.personSprite.height * 0.5;
        this.personSprite.setRotation(Phaser.Math.RND.rotation());
        this.personSprite.tint = color;

        this.add(this.personSprite);

        if (forceEmoji || Phaser.Math.RND.frac() > 0.85) {

            let emoji = Phaser.Math.RND.pick(emojis);

            this._addEmoji(emoji);
        }

        this.body.setSize(this.personSprite.width, this.personSprite.height);
        this.body.setEnable(true);
        this.body.setImmovable(true);

        let lastRotation = this.personSprite.rotation;
        this.scene.tweens.add({
            targets: this.personSprite,
            delay: Phaser.Math.RND.between(1000, 4000),
            duration: 400,
            ease: Phaser.Math.Easing.Cubic.In,
            repeat: -1,
            repeatDelay: () => Phaser.Math.RND.between(1000, 4000),
            props: {
                rotation: {
                    value: {
                        getStart: (target, key, value, targetIndex, totalTargets, tween) => {
                            return lastRotation;
                        },
                        getEnd: (target, key, value, targetIndex, totalTargets, tween) => {
                            return lastRotation = value + -Phaser.Math.TAU * 0.25 + Phaser.Math.RND.frac() * (Phaser.Math.TAU * 0.5)
                        }
                    }
                }
            }
        });

        this.conversation = new Conversation(
            this.scene,
            this.getBounds(),
            phrases.start,
            phrases.late,
            phrases.rare
        );
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
    }
}