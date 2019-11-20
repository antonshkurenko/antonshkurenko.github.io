import {toPixels} from "../utils/devicePixelRationUtils";

export class Conversation {

    constructor(scene, bound, startPhrases, latePhrases, rarePhrases) {

        this.scene = scene;
        this.bound = bound;

        this.changePhrases(startPhrases, latePhrases, rarePhrases);

        this.conversationLastUpdated = 0;
        this.conversation = null;
        this.call = null;
    }

    changePhrases(startPhrases, latePhrases, rarePhrases) {
        this.startPhrases = startPhrases;
        this.latePhrases = latePhrases;
        this.rarePhrases = rarePhrases;
    }

    hit(optionalString, optionalStyle) {

        optionalString = optionalString || null;

        let defaultStyle = {
            fontFamily: 'Arial',
            fontSize: toPixels(16),
            fill: '#000000'
        };

        let style = optionalStyle || defaultStyle;

        if (this.call) {
            this.call.remove();
            this.call = this.scene.time.delayedCall(7000, () => {
                this.conversation.destroy();
                this.conversation = null;
                this.call = null;
            });
        }

        if (this.conversation !== null &&
            (this.conversationLastUpdated < this.scene.time.now - 1000 || optionalString !== null)) {

            if (optionalString !== null) {
                this.conversation.text = optionalString;
            } else {
                if (Phaser.Math.RND.frac() > 0.1) {
                    this.conversation.text = `“${Phaser.Math.RND.pick(this.latePhrases)}”`;
                } else {
                    this.conversation.text = `“${Phaser.Math.RND.pick(this.rarePhrases)}”`;
                }
            }
            this.conversation.setStyle(style);

            this.conversation.x = this.bound.x - this.conversation.width * 0.5 + this.bound.width * 0.5;
            this.conversation.y = this.bound.y - toPixels(10) - this.conversation.height;

            this.conversationLastUpdated = this.scene.time.now;
        }

        if (this.conversation === null) {

            this.conversationLastUpdated = this.scene.time.now;

            let text = optionalString || `“${Phaser.Math.RND.pick(this.startPhrases)}”`;

            this.conversation = this.scene.add.text(0, 0, text, style);

            this.conversation.x = this.bound.x - this.conversation.width * 0.5 + this.bound.width * 0.5;
            this.conversation.y = this.bound.y - toPixels(10) - this.conversation.height;

            this.call = this.scene.time.delayedCall(5000, () => {
                this.conversation.destroy();
                this.conversation = null;
                this.call = null;
            });
        }
    }
}