!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}({3:function(e,t,n){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"<size>",n=100*window.devicePixelRatio,r=[100,200,300],o=r.findIndex((function(e){return e<n}));return o=-1===o?r.length-1:o+1,e.replace(t,r[o])}function o(e){return e*le}function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.r(t);var u=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),s(this,c(t).apply(this,arguments))}var n,i,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(t,Phaser.Scene),n=t,(i=[{key:"init",value:function(e){this.game.scale.scaleMode=Phaser.Scale.ScaleModes.FIT,this.game.scale.autoCenter=Phaser.Scale.Center.CENTER_BOTH}},{key:"preload",value:function(){this.load.image("kbp_bg",r("assets/birthday2019/kbp/kbp@<size>x.png")),this.load.image("df_bg",r("assets/birthday2019/dutyFree/df@<size>x.png")),this.load.image("home_bg",r("assets/birthday2019/home/home@<size>x.png")),this.load.image("road",r("assets/birthday2019/road/road@<size>x.png")),this.load.image("car",r("assets/birthday2019/car/car@<size>x.png")),this.load.image("billboard",r("assets/birthday2019/billboard/billboard@<size>x.png")),this.load.spritesheet("shapes",r("assets/birthday2019/players/shapes@<size>x.png"),{frameWidth:o(32),frameHeight:o(32),margin:0,spacing:0})}},{key:"create",value:function(){this.game.scene.start(pe)}}])&&a(n.prototype,i),u&&a(n,u),t}();class h extends Phaser.GameObjects.Zone{constructor(e,t,n,r,o){super(e,t,n,r,o),this.scene=e,this.setOrigin(0),e.physics.add.existing(this),e.add.existing(this),this.body.setEnable(!0),this.body.setImmovable(!0)}collideWith(e,t){this.scene.physics.add.collider(e,this,t,null,this.scene)}putTextInside(e,t){let n=this.scene.add.text(this.x+.5*this.width,this.y+.5*this.height,e,t);n.setAlign("center"),n.setOrigin(.5)}}function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var v=function(e){function t(e,n,r,o,i){var a,s,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),s=this,(a=!(c=d(t).call(this,e,n,r,o,i.frame))||"object"!==f(c)&&"function"!=typeof c?p(s):c).scene.add.existing(p(a)),a.scene.physics.add.existing(p(a)),a.body.setCollideWorldBounds(!0),a.cursors=e.input.keyboard.createCursorKeys(),a.meta=i,a.meta.tint&&a.dressUp(a.meta.tint),a}var n,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(t,Phaser.GameObjects.Sprite),n=t,(r=[{key:"dressUp",value:function(e){this.tint=e,this.meta.tint=e}},{key:"currentDress",value:function(){return this.meta.tint}},{key:"onUpdate",value:function(){this.body.setVelocity(o(0)),this.cursors.left.isDown?this.body.setVelocityX(o(-120)):this.cursors.right.isDown&&this.body.setVelocityX(o(120)),this.cursors.up.isDown?this.body.setVelocityY(o(-120)):this.cursors.down.isDown&&this.body.setVelocityY(o(120)),this.body.velocity.lengthSq()>0&&this.setRotation(this.body.velocity.angle()+Phaser.Math.TAU)}}])&&y(n.prototype,r),i&&y(n,i),t}();function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var m=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,r;return t=e,(n=[{key:"create",value:function(e,t){this.scene=e,e.add.image(0,0,"home_bg").setOrigin(0),this.player=new v(e,o(.5*ue),o(.9*he),"shapes",t.playerMeta);var n=new h(e,o(256),o(224),o(256),o(128));n.putTextInside("🍷",{fontFamily:"Arial",fontSize:o(24),fill:"#000000"}),n.collideWith(this.player,(function(e,t){console.log("Collided player: ".concat(e," with table zone: ").concat(t))})),e.physics.world.bounds.width=fe,e.physics.world.bounds.height=ye,e.cameras.main.setBounds(0,0,fe,ye),e.cameras.main.startFollow(this.player),e.cameras.main.roundPixels=!0}},{key:"update",value:function(e,t,n){this.player.onUpdate()}}])&&g(t.prototype,n),r&&g(t,r),e}();function w(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var P=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=t,this.factory=n,this.group=t.add.group({removeCallback:function(e){r.pool.add(e)}}),this.pool=t.add.group({removeCallback:function(e){r.group.add(e)}}),this.addObject(o(Phaser.Math.RND.between(-100,-200)))}var t,n,r;return t=e,(n=[{key:"move",value:function(e){this.group.getChildren().forEach((function(t){t.y+=e}))}},{key:"addObject",value:function(e){if(this.pool.getLength()){var t=this.pool.getFirst();t.y=e,t.active=!0,t.visible=!0,this.pool.remove(t)}else{var n=this.factory(this.scene,e);this.group.add(n)}}},{key:"updateStates",value:function(){var e=this,t=this.group.getChildren().map((function(e){return e.y})),n=Math.min.apply(Math,w(t));this.group.getChildren().forEach((function(t){ye<t.y-t.height&&(e.group.killAndHide(t),e.group.remove(t))})),n>o(200)&&this.addObject(o(Phaser.Math.RND.between(-100,-200)))}}])&&x(t.prototype,n),r&&x(t,r),e}();function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var S=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,r;return t=e,(n=[{key:"create",value:function(e,t){var n=this;this.scene=e,e.physics.world.bounds.width=fe,e.physics.world.bounds.height=ye,this.roadSprite=e.add.tileSprite(o(.5*ue),0,o(175),ye,"road"),this.roadSprite.setOrigin(.5,0);var r=e.add.image(0,0,"car");r.setOrigin(0),this.playerMeta=t.playerMeta;var i=e.add.image(.2*r.width,.2*r.height,"shapes",this.playerMeta.frame);i.setOrigin(0),i.tint=this.playerMeta.tint;var a=e.add.text(.55*r.width,.55*r.height,"🧳",{fontFamily:"Arial",fontSize:o(24),fill:"#ff0000"});a.setOrigin(0),this.playerInCar=e.add.container(o(.5*ue)+.05*this.roadSprite.width,o(.8*he),[r,i,a]),e.physics.add.existing(this.playerInCar),this.playerInCar.body.setSize(r.width,r.height),this.playerInCar.body.setEnable(!0),e.cameras.main.setBounds(0,0,fe,ye),e.cameras.main.roundPixels=!0,e.time.delayedCall(5e3,(function(){e.tweens.addCounter({from:0,to:1,duration:2e3,onUpdate:function(e,t){n.playerInCar.body.setVelocityY(Phaser.Math.Easing.Back.In(e.progress)*o(-500))}})})),this.leftBillboards=new P(e,this._billboardFactory(o(100))),this.rightBillboards=new P(e,this._billboardFactory(o(500)))}},{key:"update",value:function(e,t,n){var r=o(2.5);this.roadSprite.tilePositionY-=r,this.leftBillboards.move(r),this.rightBillboards.move(r),this.leftBillboards.updateStates(),this.rightBillboards.updateStates(),this.playerInCar.y+this.playerInCar.height<o(-1e3)&&e.scene.restart({behavior:new m,data:{playerMeta:this.playerMeta}})}},{key:"_billboardFactory",value:function(e){var t=this,n=["🍆🍑","⚽️🏀💸"];return function(r,i){var a=t.scene.add.image(0,0,"billboard");a.setOrigin(0);var s=t.scene.add.text(0,0,Phaser.Math.RND.pick(n),{fontFamily:"Arial",fontSize:o(24),fill:"#ff0000"});return s.x=.5*a.width-.5*s.width,s.y=.35*a.height-.5*s.height,t.scene.add.container(e,i,[a,s])}}}])&&O(t.prototype,n),r&&O(t,r),e}();function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t,n,r,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=t,this.bound=n,this.changePhrases(r,o,i),this.conversationLastUpdated=0,this.conversation=null,this.call=null}var t,n,r;return t=e,(n=[{key:"changePhrases",value:function(e,t,n){this.startPhrases=e,this.latePhrases=t,this.rarePhrases=n}},{key:"hit",value:function(e,t){var n=this;e=e||null;var r={fontFamily:"Arial",fontSize:o(16),fill:"#000000"},i=t||r;if(this.call&&(this.call.remove(),this.call=this.scene.time.delayedCall(7e3,(function(){n.conversation.destroy(),n.conversation=null,n.call=null}))),null!==this.conversation&&(this.conversationLastUpdated<this.scene.time.now-1e3||null!==e)&&(null!==e?this.conversation.text=e:Phaser.Math.RND.frac()>.1?this.conversation.text="“".concat(Phaser.Math.RND.pick(this.latePhrases),"”"):this.conversation.text="“".concat(Phaser.Math.RND.pick(this.rarePhrases),"”"),this.conversation.setStyle(i),this.conversation.x=this.bound.x-.5*this.conversation.width+.5*this.bound.width,this.conversation.y=this.bound.y-o(10)-this.conversation.height,this.conversationLastUpdated=this.scene.time.now),null===this.conversation){this.conversationLastUpdated=this.scene.time.now;var a=e||"“".concat(Phaser.Math.RND.pick(this.startPhrases),"”");this.conversation=this.scene.add.text(0,0,a,i),this.conversation.x=this.bound.x-.5*this.conversation.width+.5*this.bound.width,this.conversation.y=this.bound.y-o(10)-this.conversation.height,this.call=this.scene.time.delayedCall(5e3,(function(){n.conversation.destroy(),n.conversation=null,n.call=null}))}}}])&&k(t.prototype,n),r&&k(t,r),e}();function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var M=function(e){function t(e,n,r,i,a,s){var c,l,u;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),l=this,a=a||!1,(c=!(u=C(t).call(this,e,n,r))||"object"!==j(u)&&"function"!=typeof u?A(l):u).scene.add.existing(A(c)),c.scene.physics.add.existing(A(c));var h=c.scene.add.image(0,0,"shapes",Phaser.Math.RND.between(0,4));if(h.x=.5*h.width,h.y=.5*h.height,h.setRotation(Phaser.Math.RND.rotation()),h.tint=ve.defaultColor,c.add(h),a||Phaser.Math.RND.frac()>.5){var f=Phaser.Math.RND.pick(i),y=c.scene.add.text(0,0,f.ch,{fontFamily:"Arial",fontSize:o(20),fill:"#ff0000"});switch(f.vAlign){case"center":y.y=.5*h.height-.5*y.height;break;case"btm":y.y=h.height-y.height;break;case"top":y.y=0;break;default:throw"Unsupported vAlign"}switch(f.hAlign){case"center":y.x=.5*h.width-.5*y.width;break;case"right":y.x=h.width-y.width;break;case"left":y.x=0;break;default:throw"Unsupported hAlign"}c.add(y)}c.body.setSize(h.width,h.height),c.body.setEnable(!0),c.body.setImmovable(!0);var d=h.rotation;return c.scene.tweens.add({targets:h,delay:Phaser.Math.RND.between(1e3,4e3),duration:400,ease:Phaser.Math.Easing.Cubic.In,repeat:-1,repeatDelay:function(){return Phaser.Math.RND.between(1e3,4e3)},props:{rotation:{value:{getStart:function(e,t,n,r,o,i){return d},getEnd:function(e,t,n,r,o,i){return d=n+.25*-Phaser.Math.TAU+Phaser.Math.RND.frac()*(.5*Phaser.Math.TAU)}}}}}),c.conversation=new _(c.scene,c.getBounds(),s.start,s.late,s.rare),c}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(t,Phaser.GameObjects.Container),t}();function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var z=[{ch:"🚕",vAlign:"btm",hAlign:"right"},{ch:"🇺🇦",vAlign:"top",hAlign:"right"},{ch:"🏁",vAlign:"top",hAlign:"right"}],D=["Hey!","Howdy?","Hello","Hi","What's up?","Good Day Sir"],F=["Welcome home!","Taxi! 🚕"],R=["Oy na hori dva dubky"],I=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=t}var t,n,r;return t=e,(n=[{key:"create",value:function(e,t){return new M(this.scene,e,t,z,!0,{start:D,late:F,rare:R})}}])&&T(t.prototype,n),r&&T(t,r),e}();function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var U=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,r;return t=e,(n=[{key:"create",value:function(e,t){var n=this;this.scene=e,e.add.image(0,0,"kbp_bg").setOrigin(0),this.player=new v(e,o(.5*ue),o(.9*he),"shapes",t.playerMeta),e.physics.world.bounds.width=fe,e.physics.world.bounds.height=ye;var r=new h(e,o(256),o(0),o(256),o(64));r.collideWith(this.player,(function(t,r){console.log("Collided player: ".concat(t," with kbp zone: ").concat(r)),e.scene.restart({behavior:new S,data:{playerMeta:n.player.meta}})})),r.putTextInside("🛬 Arrivals",{fontFamily:"Arial",fontSize:o(24),fill:"#000000"});var i=new h(e,o(112),o(200),o(144),o(144));i.collideWith(this.player,(function(e,t){console.log("Collided player: ".concat(e," with flowers zone: ").concat(t))})),i.putTextInside("💐 Flowers",{fontFamily:"Arial",fontSize:o(22),fill:"#000000"});var a=new h(e,o(512),o(200),o(144),o(144));a.collideWith(this.player,(function(e,t){console.log("Collided player: ".concat(e," with exch zone: ").concat(t))})),a.putTextInside("💸 Exchange",{fontFamily:"Arial",fontSize:o(22),fill:"#000000"}),new h(e,o(180),o(475),o(408),o(1)).collideWith(this.player,(function(e,t){console.log("Collided player: ".concat(e," with entrance zone: ").concat(t))})),this._addPeople(),e.cameras.main.setBounds(0,0,fe,ye),e.cameras.main.startFollow(this.player),e.cameras.main.roundPixels=!0}},{key:"update",value:function(e,t,n){this.player.onUpdate()}},{key:"_addPeople",value:function(){var e=this,t=[{x:.26*fe,y:.75*ye},{x:.21*fe,y:.74*ye},{x:.3*fe,y:.76*ye},{x:.33*fe,y:.745*ye},{x:.37*fe,y:.764*ye},{x:.44*fe,y:.755*ye},{x:.49*fe,y:.743*ye},{x:.55*fe,y:.752*ye},{x:.61*fe,y:.751*ye},{x:.66*fe,y:.742*ye},{x:.72*fe,y:.753*ye},{x:.77*fe,y:.763*ye},{x:.3*fe,y:.64*ye},{x:.36*fe,y:.62*ye},{x:.4*fe,y:.51*ye}],n=new I(this.scene);t.forEach((function(t){var r=n.create(t.x,t.y);e.scene.physics.add.collider(e.player,r,(function(){console.log("Collided player with person: ".concat(t)),r.conversation.hit()}))}))}}])&&N(t.prototype,n),r&&N(t,r),e}();function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var W=[{ch:"👜",vAlign:"btm",hAlign:"right"},{ch:"💼",vAlign:"btm",hAlign:"right"},{ch:"🌂",vAlign:"btm",hAlign:"right"},{ch:"👒",vAlign:"top",hAlign:"center"},{ch:"🧢",vAlign:"top",hAlign:"center"},{ch:"🎩",vAlign:"top",hAlign:"center"},{ch:"👓",vAlign:"top",hAlign:"center"},{ch:"🕶",vAlign:"top",hAlign:"center"},{ch:"💤",vAlign:"top",hAlign:"right"}],H=["Hey!","Howdy?","Hello","Hi","What's up?","Good Day Sir"],G=["Don't push me 💢"],L=["We're no strangers to love\nYou know the rules and so do I"],V=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=t}var t,n,r;return t=e,(n=[{key:"create",value:function(e,t){return new M(this.scene,e,t,W,!1,{start:H,late:G,rare:L})}}])&&B(t.prototype,n),r&&B(t,r),e}();function Y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var X=[{ch:"👮‍",vAlign:"center",hAlign:"center"},{ch:"💂️‍",vAlign:"center",hAlign:"center"}],q=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=t}var t,n,r;return t=e,(n=[{key:"create",value:function(e,t){return new M(this.scene,e,t,X,!0,{start:["Hi, please dress up"],late:["You can't proceed\nwithout being dressed up"],rare:["C'mon man, dress up"]})}}])&&Y(t.prototype,n),r&&Y(t,r),e}();function K(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var Z=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,r;return t=e,(n=[{key:"create",value:function(e,t){var n=this;this.scene=e,e.add.image(0,0,"df_bg").setOrigin(0),this.player=new v(e,o(.5*ue),o(.9*he),"shapes",t.playerMeta),e.physics.world.bounds.width=fe,e.physics.world.bounds.height=ye;var r=this._addGuard();this._addShops(r),this._addPeople();var i=new h(e,o(256),o(0),o(256),o(64));i.collideWith(this.player,(function(t,r){console.log("Collided player: ".concat(t," with df zone: ").concat(r)),n.player.currentDress()===ve.defaultColor?guardConversation.hit("❗️",{fontFamily:"Arial",fontSize:o(24),fill:"#000000"}):e.scene.restart({behavior:new U,data:{playerMeta:n.player.meta}})})),i.putTextInside("🍷👗🕶 Duty Free",{fontFamily:"Arial",fontSize:o(24),fill:"#000000"}),e.cameras.main.setBounds(0,0,fe,ye),e.cameras.main.startFollow(this.player),e.cameras.main.roundPixels=!0}},{key:"update",value:function(e,t,n){this.player.onUpdate()}},{key:"_addShops",value:function(e){var t=this;[{name:"YSL",x:0,y:0,color:16007990},{name:"Gucci",x:0,y:144,color:15277667},{name:"Balenciaga",x:0,y:288,color:10233776},{name:"Nike",x:0,y:432,color:2201331},{name:"Versace",x:624,y:0,color:48340},{name:"Lacoste",x:624,y:144,color:5025616},{name:"Louis Vuitton",x:624,y:288,color:16771899},{name:"Valentino",x:624,y:432,color:16761095}].forEach((function(n){var r=new h(t.scene,o(n.x),o(n.y),o(144),o(144));r.collideWith(t.player,(function(r,o){console.log("Collided player: ".concat(r," with shop zone: ").concat(n.name,", color: ").concat(n.color)),r.currentDress()!==n.color&&(t.scene.cameras.main.flash(400),r.dressUp(n.color)),r.currentDress()!==ve.defaultColor&&e.conversation.changePhrases(["You're good"],["Come in, come in"],["So hot 🔥"])})),r.putTextInside(n.name,{fontFamily:"Arial",fontSize:o(22),fill:"#000000"})}))}},{key:"_addPeople",value:function(){var e=this,t=[{x:.4*fe,y:.4*ye},{x:.4*fe+o(40),y:.4*ye+o(5)},{x:.25*fe,y:.3*ye},{x:.6*fe,y:.5*ye},{x:.6*fe+o(40),y:.5*ye+o(30)},{x:.6*fe+o(5),y:.5*ye+o(60)},{x:.3*fe,y:.55*ye},{x:.3*fe+o(-5),y:.55*ye+o(40)}],n=new V(this.scene);t.forEach((function(t){var r=n.create(t.x,t.y);e.scene.physics.add.collider(e.player,r,(function(){console.log("Collided player with person: ".concat(t)),r.conversation.hit()}))}))}},{key:"_addGuard",value:function(){var e=new q(this.scene).create(o(500),o(72));return this.scene.physics.add.collider(this.player,e,(function(){console.log("Collided player with person: ".concat(e)),e.conversation.hit()})),e}}])&&K(t.prototype,n),r&&K(t,r),e}();function J(e){return(J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function $(e,t){return!t||"object"!==J(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ee(e){return(ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function te(e,t){return(te=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ne=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),$(this,ee(t).apply(this,arguments))}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&te(e,t)}(t,Phaser.Scene),n=t,(r=[{key:"init",value:function(e){}},{key:"preload",value:function(){}},{key:"create",value:function(){this.game.scene.start(be,{behavior:new Z,data:{playerMeta:{frame:Phaser.Math.RND.between(0,4),tint:ve.defaultColor}}})}}])&&Q(n.prototype,r),o&&Q(n,o),t}();function re(e){return(re="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function oe(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ie(e,t){return!t||"object"!==re(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ae(e){return(ae=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function se(e,t){return(se=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ce=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),ie(this,ae(t).apply(this,arguments))}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&se(e,t)}(t,Phaser.Scene),n=t,(r=[{key:"init",value:function(e){this.data=e.data,this.behavior=e.behavior}},{key:"preload",value:function(){}},{key:"create",value:function(){this.cameras.main.setBackgroundColor("#FFFFFF"),this.cameras.main.fadeIn(1e3),this.behavior.create&&this.behavior.create(this,this.data)}},{key:"update",value:function(e,t){this.behavior.update&&this.behavior.update(this,e,t)}}])&&oe(n.prototype,r),o&&oe(n,o),t}(),le=window.devicePixelRatio,ue=768,he=576,fe=ue*le,ye=he*le;console.log("Game size: ".concat(fe,"/").concat(ye));var de="boot",pe="menu",be="world",ve={defaultColor:10395294},ge={type:Phaser.AUTO,parent:"game",scale:{mode:Phaser.Scale.NONE,width:fe,height:ye,zoom:1/le},physics:{default:"arcade",arcade:{gravity:{y:0},debug:!0}}};window.addEventListener("load",(function(){var e;(e=new Phaser.Game(ge)).scene.add(de,new u(null)),e.scene.add(pe,new ne(null)),e.scene.add(be,new ce(null)),e.scene.start(de)}))}});
//# sourceMappingURL=birthday2019.bundle.js.map