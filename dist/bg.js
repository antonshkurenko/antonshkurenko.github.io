(()=>{"use strict";function n(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}var t=2*Math.PI;function e(n,t){var e={keepAnimating:!0},i=setInterval((function(){e.keepAnimating?requestAnimationFrame(n):clearInterval(i)}),t);return e}var i=function(){function t(n,e){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=parseFloat(n.toFixed(4)),this.y=parseFloat(e.toFixed(4))}var e,i;return e=t,i=[{key:"connect",value:function(n,t){t.moveTo(this.x,this.y),t.lineTo(n.x,n.y)}},{key:"add",value:function(n){return new t(this.x+n.x,this.y+n.y)}},{key:"sub",value:function(n){return new t(this.x-n.x,this.y-n.y)}},{key:"dist",value:function(n){return Math.hypot(this.x-n.x,this.y-n.y)}},{key:"len",value:function(){return Math.hypot(this.x,this.y)}},{key:"mult",value:function(n){return new t(this.x*n,this.y*n)}},{key:"div",value:function(n){return new t(this.x/n,this.y/n)}},{key:"isInside",value:function(n,t){return this.dist(n)<=t}}],i&&n(e.prototype,i),Object.defineProperty(e,"prototype",{writable:!1}),t}();function r(n,t){return n*Math.cos(t)}function a(n,t){return n*Math.sin(t)}function o(n,e,o){for(var s=t/o,h=e,u=[],c=0;c<o;c++)u.push(new i(r(n,h),a(n,h))),h+=s;return u}function s(n){return n*(2*Math.random()-1)}function h(n,t){for(var e=1,i=n-t+1;i<=n;i++)e*=i;for(var r=1;r<=t;r++)e/=r;return e}function u(n,t){for(var e=t.length-1,i=0,r=0,a=0;a<=e;a++)r+=h(e,a)*Math.pow(1-n,e-a)*Math.pow(n,a)*t[a].x,i+=h(e,a)*Math.pow(1-n,e-a)*Math.pow(n,a)*t[a].y;return{x:r,y:i}}var c=0,f=0;function l(n,t,e,i){return n+i*Math.sin(e*t)}function d(n,t,e,i){var o=Math.PI/180,s=0,h=r(l(t,s,10,i),s)+e.x,u=a(l(t,s,10,i),s)+e.y;for(n.beginPath();s<2*Math.PI;)n.moveTo(h,u),h=r(l(t,s,10,i),s)+e.x,u=a(l(t,s,10,i),s)+e.y,s+=o,n.lineTo(h,u);n.stroke()}var m=0,v=(Math.PI,0),y=0,p=30*Math.random()+50,w=o(200,Math.random()*t,p);var g=30*Math.random()+25;function M(n){return n.map((function(n){return n.add(new i(s(3),s(3)))}))}var x=[M,function(n){return M(n)}],b=o(200,Math.random()*t,g);function A(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}var k=[[0,1],[0,3],[1,2],[1,3],[1,4],[2,4],[2,6],[3,4],[3,5],[4,5],[4,6],[5,6],[5,7],[6,7],[6,8],[7,8]],C=function(){function n(t){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.nodes=[],this.mirrornodes=[],this.nodes.push(new i(0,0)),this.nodes.push(new i(0,-t)),this.nodes.push(new i(0,-2*t)),this.nodes.push(new i(t/2,-t/2)),this.nodes.push(new i(.5*t,-1.5*t)),this.nodes.push(new i(t,-t)),this.nodes.push(new i(t,-2*t)),this.nodes.push(new i(1.5*t,-1.5*t)),this.nodes.push(new i(2*t,-2*t)),this.mirrornodes.push(new i(0,0)),this.mirrornodes.push(new i(t,0)),this.mirrornodes.push(new i(2*t,0)),this.mirrornodes.push(new i(t/2,-t/2)),this.mirrornodes.push(new i(1.5*t,-.5*t)),this.mirrornodes.push(new i(t,-t)),this.mirrornodes.push(new i(2*t,-t)),this.mirrornodes.push(new i(1.5*t,-1.5*t)),this.mirrornodes.push(new i(2*t,-2*t)),this.connectChoices=new Array(16);for(var e=0;e<this.connectChoices.length;e++)this.connectChoices[e]=Math.random()>=.5}var t,e;return t=n,(e=[{key:"connectDraw",value:function(n){for(var t=0;t<this.connectChoices.length;t++)this.connectChoices[t]&&(this.nodes[k[t][0]].connect(this.nodes[k[t][1]],n),this.mirrornodes[k[t][0]].connect(this.mirrornodes[k[t][1]],n))}},{key:"display",value:function(n){for(var t=0;t<4;t++)n.save(),n.rotate(Math.PI/2*t),this.connectDraw(n),n.restore()}}])&&A(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),n}(),P=[function n(t,e){var i=e.center.len();c=i,f=i/100,n.lastAnimation&&(n.lastAnimation.keepAnimating=!1),n.lastAnimation=function(n){var t={keepAnimating:!0},e=performance.now();return requestAnimationFrame((function i(r){var a=(r-e)/n.duration;a>1&&(a=1),a<0&&(a=0);var o=n.timing(a);if(n.draw(o),t.keepAnimating)if(a<1)requestAnimationFrame(i);else{var s=!0;if(-1===n.repeatCount){var h=n.timing;n.timing=function(n){return h(1-n)},n.repeatCount=0}else-2===n.repeatCount||(n.repeatCount>0?n.repeatCount--:s=!1);s&&(e=performance.now(),requestAnimationFrame(i))}})),t}({duration:5e3,timing:function(n){return 0,100,0*(1-(t=Math.abs(n)))+100*t;var t},draw:function(n){!function(n,t,e){n.clearRect(0,0,t.width,t.height);for(var i=f+e;i<c;){var r=i/c;n.strokeStyle="rgba(0,0,0,"+r+")",d(n,i,t.center,30*r),i+=100}}(t,e,n)},repeatCount:-2})},function n(i,o){m=.4*Math.min(o.height,o.width),n.lastAnimation&&(n.lastAnimation.keepAnimating=!1),n.lastAnimation=e((function(){!function(n,e){n.fillStyle="rgba(0,0,0,0.05)";for(var i=0;i<100;i++){n.beginPath(),v+=2*Math.random()-1;var o=m+v;n.arc(e.center.x+r(o,y),e.center.y+a(o,y),1,0,t),n.fill(),y+=1/o}}(i,o)}),16)},function n(r,a){n.lastAnimation&&(n.lastAnimation.keepAnimating=!1),n.lastAnimation=e((function(){!function(n,e){for(var r=0;r<1;r++){var a=new i(Math.random()*e.width,Math.random()*e.height),o=Math.floor(50*Math.random())+5,s=void 0;if(e.center.isInside(a,o))s=n.createRadialGradient(e.center.x,e.center.y,1,a.x,a.y,o);else{var h=(f=a,l=e.center,Math.atan2(l.y-f.y,l.x-f.x)),u=Math.cos(h)*o,c=Math.sin(h)*o;s=n.createLinearGradient(a.x+u,a.y+c,a.x-u,a.y-c)}s.addColorStop(0,"rgba(0,0,0,0.05)"),s.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=s,n.beginPath(),n.arc(a.x,a.y,o,0,t),n.fill()}var f,l}(r,a)}),25)},function n(r,a){n.lastAnimation&&(n.lastAnimation.keepAnimating=!1),n.lastAnimation=e((function(){!function(n,e){n.fillStyle="rgba(0,0,0,0.05)",w=function(n){return n.map((function(n){return n.add(new i(s(20),s(20)))}))}(w);for(var r=0;r<1;r+=.006*Math.random()+.001){n.beginPath();var a=u(r,w);n.arc(e.center.x+a.x,e.center.y+a.y,1,0,t),n.fill()}}(r,a)}),100)},function n(t,i){n.lastAnimation&&(n.lastAnimation.keepAnimating=!1);var r=x[Math.floor(Math.random()*x.length)];n.lastAnimation=e((function(){!function(n,t,e){n.setLineDash([1,1+6*Math.random()]),n.fillStyle="rgba(0,0,0,0.05)",n.strokeStyle="rgba(0,0,0,0.05)",n.lineJoin="round",n.lineWidth=1,function(n,t){n.beginPath(),n.moveTo(t[0].x,t[0].y);for(var e=1;e<t.length-2;e++){var i=(t[e].x+t[e+1].x)/2,r=(t[e].y+t[e+1].y)/2;n.quadraticCurveTo(t[e].x,t[e].y,i,r)}var a=t.length-2;n.quadraticCurveTo(t[a].x,t[a].y,t[a+1].x,t[a+1].y),n.stroke()}(n,(b=e(b)).map((function(n){return n.add(t.center)})))}(t,i,r)}),16)},function(n,t){var e=50,i=50,r=Math.floor(t.width/(30+i)+1),a=Math.floor(t.height/(30+e)+1);i=t.width/(r-1)-30,e=t.height/(a-1)-30,n.strokeStyle="rgba(0,0,0,0.5)",n.clearRect(0,0,t.width,t.height),function(n,t,e,i,r,a,o,s){n.beginPath();for(var h=0;h<e;h++)for(var u=0;u<i;u++)n.save(),n.translate(h*(r+30),u*(a+30)),new C(10).display(n),n.restore();n.stroke()}(n,0,r,a,i,e)}],I=new i(0,0);window.addEventListener("load",(function(){var n=document.getElementById("bg-canvas"),t=n.getContext("2d"),e=document.getElementsByTagName("body")[0],i=P[Math.floor(Math.random()*P.length)];function r(){n.width=window.innerWidth,n.height=window.innerHeight,I.x=.5*e.clientWidth,I.y=.5*e.clientHeight,i(t,{center:I,height:n.height,width:n.width})}r(),window.addEventListener("optimizedResize",(function(){r()}))}))})();
//# sourceMappingURL=bg.js.map