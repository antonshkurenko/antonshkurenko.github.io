(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var a=n[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,"string");if("object"!==t(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a.key),"symbol"===t(i)?i:String(i)),a)}var i}var n=2*Math.PI;function r(t,e,n){return(1-n)*t+n*e}var a=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=parseFloat(e.toFixed(4)),this.y=parseFloat(n.toFixed(4))}var n,r;return n=t,(r=[{key:"connect",value:function(t,e){e.moveTo(this.x,this.y),e.lineTo(t.x,t.y)}},{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y)}},{key:"sub",value:function(e){return new t(this.x-e.x,this.y-e.y)}},{key:"dist",value:function(t){return Math.hypot(this.x-t.x,this.y-t.y)}},{key:"len",value:function(){return Math.hypot(this.x,this.y)}},{key:"mult",value:function(e){return new t(this.x*e,this.y*e)}},{key:"div",value:function(e){return new t(this.x/e,this.y/e)}},{key:"isInside",value:function(t,e){return this.dist(t)<=e}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function i(t){return t*(180/Math.PI)}function o(t,e){var n;return(n=(t=t||0)%360)<0&&(n+=360),n<180&&e>n+180&&(t-=360),n>=180&&e<=n-180&&(t+=360),t+(e-n)}function u(t,e){var n=(u.canvas||(u.canvas=document.createElement("canvas"))).getContext("2d");n.font=e;var r=n.measureText(t);return new a(r.width,32)}function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function c(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,i,o,u=[],l=!0,c=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=i.call(n)).done)&&(u.push(r.value),u.length!==e);l=!0);}catch(t){c=!0,a=t}finally{try{if(!l&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(c)throw a}}return u}}(t,e)||function(t,e){if(t){if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,a=function(t,e){if("object"!==l(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===l(a)?a:String(a)),r)}var a}function m(t,e,n){return e&&f(t.prototype,e),n&&f(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}var h,d,y=16/9;function v(t,e){return-t/e}function p(t,e){return-t/e}function b(t,e){return-t/e}function g(t,e){var n=t.getBoundingClientRect();return new a(n.left+e.x/2,n.top-e.y/2)}function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function M(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,S(r.key),r)}}function S(t){var e=function(t,e){if("object"!==w(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===w(e)?e:String(e)}var x=function(){function t(e){var n,r;(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")})(this,t),n=this,(r=S(r="frame"))in n?Object.defineProperty(n,r,{value:0,enumerable:!0,configurable:!0,writable:!0}):n[r]=0,this.container=e,this.update=this.update.bind(this)}return e=t,(n=[{key:"setText",value:function(t){var e=this,n=this.container.innerText,r=Math.max(n.length,t.length),a=new Promise((function(t){return e.resolve=t}));this.queue=[];for(var i=0;i<r;i++){var o=n[i]||"",u=t[i]||"",l=Math.floor(40*Math.random()),c=l+Math.floor(40*Math.random());this.queue.push({from:o,to:u,start:l,end:c})}return cancelAnimationFrame(this.animationHandle),this.frame=0,this.update(),a}},{key:"update",value:function(){for(var t="",e=0,n=0,r=this.queue.length;n<r;n++){var a=this.queue[n],i=a.from,o=a.to,u=a.start,l=a.end,c=a.char;this.frame>=l?(e++,t+=o):this.frame>=u?((!c||Math.random()<.28)&&(c="!<>-_\\/[]{}—=+*^?#________"[Math.floor(26*Math.random())],this.queue[n].char=c),t+='<span class="scrambled-text">'.concat(c,"</span>")):t+=i}this.container.innerHTML=t,e===this.queue.length?this.resolve():(this.animationHandle=requestAnimationFrame(this.update),this.frame++)}}])&&M(e.prototype,n),r&&M(e,r),Object.defineProperty(e,"prototype",{writable:!1}),t;var e,n,r}(),k=[function(){!function(){var t=document.getElementsByClassName("container-centered")[0],e=m((function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.letter=e,this.depth=n})),n=[new e("A",.695),new e("n",.521),new e("t",.782),new e("ø",.391),new e("n",.652),new e(" ",.869),new e("S",.826),new e("h",.347),new e("k",.739),new e("u",.608),new e("r",.913),new e("e",.434),new e("n",.565),new e("k",.956),new e("ø",.478)],r=document.createElement("ul");r.id="name-scene",n.forEach((function(t,e){var n=document.createElement("li");n.classList.add("layer"),n.id="letter_".concat(e+1),n.setAttribute("data-depth",t.depth);var a=document.createElement("div");a.classList.add("letter"),a.classList.add("letters"),a.innerHTML=t.letter,n.appendChild(a),r.appendChild(n)})),t.appendChild(r)}();var t=document.getElementsByClassName("letter"),e=document.getElementsByTagName("body")[0],l=Array.from(t).map((function(t){return t.parentElement.id}));if(l.sort((function(t,e){return t.replace("letter_","")-e.replace("letter_","")})),Math.random()<.1){var s=[["Ã̷͉͛ͅ","n̴̩̼͐̆","t̷̥̭̩͖̑͘͝ͅ","ø̷͍̊̈͊","n̸̥͑"," ̶̧̀","S̵̻̹͖̹͗͂̓͐̚","h̶̛̯͕̿̏̚͠","k̴̨̟̤̙̥̀̀̆̇̔̾ͅ","u̷̱͎̱̽͂̏̔͝","r̷̨̢̯̞̎̆̋̌̃͝","ḝ̴̙̭̯̋͜͜","n̵̻̘̈́̉͒̈́̕͝","k̶͈̓͝","ø̵͖̇͂̓"],["Ä̸͈́","n̵̡̡̥͈͚̆͜","ț̴̟̉́͑̈́͝","ø̵͙̠͕̰̄̒̽̀̂̀","n̸̘̆̒"," ̴͎̫̩̬̳́̿̈́̓̐͂̈́","S̸̨͉̹͐͒̆̾͌","ḩ̶̛̙̮̱͔̑̇̍̔̀͠ͅ","k̸̡̙͙͕̯͈͐ͅ","u̵̢͌̔͠͝","r̵͖̤͔̞̫͒","è̸͖̬̞͙̅̌͘","n̸̨͖̤̔̋̆͆̅̕͝","k̷̰͖͔̺͉̆̋̌͜","ø̵̛̲̾͌̄́͝͝"],["Ā̸͙̏͝","n̶̝̪̰̦̒̌̾̇̂͒","t̴̺͍̝͓̆̄̍̈́̎","ø̶̛̘̝͓̫̥̫̍","n̴̝̣͌̃̎͐̓̚"," ̴̛̫̻̹̱̙͔͂̓͋̍͠","S̶͕͓͔̲̋","h̵̛̪̊","k̷̬͚͔̙̆͛͐","ȗ̶̡͕̱͊̓̂͂͝","r̷̯̙͚̭̰̆̓͠","ę̷̗̞̘̰̫̒͐̽̒̔","n̸͉̓̓́͐̀͝","ķ̶̛͇̭̇̐̽̋","ø̴͉͖̭̣͠"],["Ả̵̱̹̞͙͓̘͌͜","n̶̡̏͊͆","t̵̪̙̟͚̫͑̉̔͘͘","ø̴̼͖͉̙̄́̂","n̴͇̦̩̮̓͆̈͋͑͝"," ̴̼͎̃","S̷̢̺̒","h̵̩͍̳̜̝͉̫͋̽̈́̑","k̷͔̓͌͒̀","u̸̟͚̦̠̺̿̾","r̶̡͕̖̈́̌̕","e̵̠͆͑͂̈͝","n̵͈̥͇̜̤̻̮̆","k̴̩̝͊̑̑̚","ø̴͔̀̒̇̓̌͌͝"],["À̷̜̲̭̣́͊́̄̉̔","n̵̛̹̘̳̳̼͚̩͖̄̉̎̿̆͂ͅ","t̶̡̻̲̰͙̥̳̊̄̐̓͝","ǿ̴͚̬̠̥̝̠͇̳̗̹̩̝͂̓̊͜","ņ̸͚̳͉͙̭̫͍̙̮̃̋"," ̸̨͖̠̦̻͈̤̄̄͒̋̃̕","S̶̡̩͔͎̰̮̺̖͙̈́̈́̋̇̽̈́̍͝͝͝ͅ","ĥ̶̬͐̽","ḵ̴̢̞̣̫͔͖̖̲̠̉̇͋͝","u̵̡̦̳͔͇̦̘̞͈̼̔̓͛̔̇͒̃͝͝","ȑ̶̢̛͇̰̰̪̱̺̘̉̄̈͗ͅͅ","e̷͖̳͍͑̌̉͆͝","n̵̦͚͕̥͐̏̕","k̶̢̥̙̝̟̠̘̬̑ͅ","ø̶̩̲̲̞̫̲̫̑͑̏̿̀̋̃͛̉͗̓͋͛̓"],["A̶̝͍̋̅͂̇̿","n̵̫̜̳̤̯̤͍̲̩̹͈̽̉͂̓̎̐͐̕͝ͅ","ṱ̶̺̀̍̉","ø̶̛͕̠̑̓̍","n̸̘̠̘͔͎͖̟̙͔̩̈̀̆͛̓̈́͝͝ͅͅ"," ̷̡͔̱̹͈̞͂̔̒̈̐́̿̽̈́̿̇͘","Ş̶̗̰̯̱̋̑̓̋̐́̽̌́","h̴̺͉̣̝̆̊̓͒̐͒̊̋̚͜͝","k̸̠̭͝","ǘ̷̝̗͍̼͊͗̔͗̐","ȓ̴͇͙͚̭̟̣̥̦̠̦̮͑͊̚͜","e̶͉̪̠͔̱̫̫͙͈̤̳͠","n̷̲̘̒͑̃͒̅̏͊͂͊","ķ̵̯̿̆͋̏͒̾͑̎͆̿̕̕","ø̷͚̬̝̂͗̅̏̈́͆̕̚͜͠"],["A̶̢̛̺̰͉̥͓͖̠͓̠̲̹̠͚̜͉̜̾̅̈͂̐̑́͌̒̅̀̿̋̓́̍͑̎̿̀","ǹ̶̛̼̙͙̣̣̠̤̻̹̫̜̎̈́̂͂̇̀̕̚͘ͅ","ṫ̷͙̲̱̳̫͉͇̞͎͉̭̤̈́̈͌̀̈́̏̎̚͝","ø̷̧̨̮͕͖̖͉̳͖̈́̊́̒͛̍͑͂̓͜͜","n̸̛͖̹̗͔̗͖̥̱̐͌̈́́́̋̀̂̈̈́͊̉̌̒͘̚͜͠"," ̷̫͙͈͉̼̬̖̮̎̈͒̓̽̅̽̍͆̌̐͆̍̂̚͘","S̵̨̧̥̭͇̙̲͎̫̬̱̜̫̥͔͎̭̊̿̆̋̅̓̈̉͜","ḩ̴͇̲͍͔̮͕̬̲͈̹̝͓̪̩̟̺̝̩̯̈́̒͗̏͊̄̍̇","ķ̸̢̘͎̣̮̳͕̜̥̼̭̣͇͗͆̏̊͗̋̉̔̍̀͑̈́̒͘͝","u̸̻̗̙͑ͅ","r̸̨͈̬̫͖̻͓̺͙͈͖̩̥̳̪̞̫̱̰͂̈́́͒̌͋̕͜ͅ","ę̶̧̖͇̲̦͎̱̟͇̭̦̎̍̽̒̔̈́͋̎͑͘͜͠","n̷̳̘̙͔̈́̌̊͐͗̾͌̄͒͝͠","k̷̛̛̹̄̀̎̉͌͛̿͘̚̚͠","ø̵̨̘̉͒̓̍͛̌̂͛̈͠͝"]],f=s[Math.floor(Math.random()*s.length)];l.map((function(t){return document.getElementById(t)})).map((function(t){return t.getElementsByClassName("letter")[0]})).forEach((function(t,e){t.innerHTML=f[e]}))}for(var w=[],M=[],S=[3,7,9,11,12,14],x=new Array(t.length).fill(0),k=new Array(t.length).fill(0),A=new Array(t.length).fill(0),E=0,C=0;C<t.length;C++){var P=t[C],T=u(P.textContent,"32px Roboto");w.push(T),E+=T.x;var j=P.parentElement;j.setAttribute("data-index",C.toString());var L=j.getAttribute("data-depth");M.push(L)}h=Math.min(e.clientWidth,e.clientHeight)/2*.8,d=h*h*y;for(var q=0;q<t.length;q++)x[q]=M[q]*M[q]*d;for(var F=document.getElementById("name-scene"),I=new Parallax(F,{calibrateX:!1,calibrateY:!1,invertX:!1,invertY:!1,limitX:h,limitY:h,scalarX:2500,scalarY:2500,frictionX:.3,frictionY:.3,originX:.5,originY:.5,clampFunc:function(t,e,n){var r=parseInt(t.getAttribute("data-index"));return function(t,e,n){var r=e.sub(t),a=r.len();if(a<n)return e;var i=r.div(a);return t.add(i.mult(n))}(new a(0,0),new a(e,n),h*M[r])}}),O=-E/2,_=0,B=0;B<t.length;B++)t[B].parentElement.style.left=O+_+"px",_+=w[B].x;var H=function(){for(var e=0;e<t.length;e++){var n=c(t[e].parentElement.style.transform.split("(")[1].split(","),2),r=n[0],i=n[1],o=parseFloat(r),u=parseFloat(i);k[e]=g(t[e],w[e]).sub(new a(o,u))}};H(),window.addEventListener("optimizedResize",(function(){H(),h=Math.min(e.clientWidth,e.clientHeight)/2*.8,d=h*h*y;for(var n=0;n<t.length;n++)x[n]=M[n]*M[n]*d;I.limit(h,h)})),window.addEventListener("mousemove",(function(){for(var e=0;e<t.length;e++){var a=t[e],u=k[e],l=g(a,w[e]).sub(u);if(S.indexOf(e)>=0){var c=l.len()/Math.sqrt(x[e]),s=Math.round(r(0,255,c)),f=Math.round(r(0,0,c)),m=Math.round(r(0,0,c));a.style.color="rgb(".concat(s,",").concat(f,",").concat(m,")")}var h=(T=l.x,j=l.y,void 0,(q=(L=x[e])-T*T-j*j)>0?Math.sqrt(q):.01*Math.sqrt(L)),d=v(l.y,h),y=p(l.x,h),M=b(l.x,l.y),E=Math.atan(d)+Math.PI,C=Math.atan(y)+Math.PI,P=Math.atan(M);l.y>0?P+=Math.PI:l.x<0&&(P+=n),E=i(E),C=i(C),P=i(P),P=o(A[e],P),A[e]=P,a.style.transform="rotateX(".concat(E,"deg) rotateY(").concat(C,"deg) rotateZ(").concat(P,"deg)")}var T,j,L,q}))},function(){var t=document.getElementsByClassName("container-centered")[0];t.classList.add("running-text-container");var e="Antøn Shkurenkø&nbsp;",n=document.createElement("div");n.innerHTML=e,n.classList.add("running-text-block"),n.classList.add("letters");var a,i,o,u=document.createElement("div");u.innerHTML=e,u.classList.add("running-text-block"),u.classList.add("letters"),t.appendChild(n),t.appendChild(u),t.style.width=n.clientWidth,a={duration:1e4,timing:function(t){return t},draw:function(t){var e;e=t<.5?r(0,-100,2*t):r(100,0,2*t-1),n.style.transform="translateX(".concat(e,"%)");var a=r(0,-200,t);u.style.transform="translateX(".concat(a,"%)")},repeatCount:-2},i={keepAnimating:!0},o=performance.now(),requestAnimationFrame((function t(e){var n=(e-o)/a.duration;n>1&&(n=1),n<0&&(n=0);var r=a.timing(n);if(a.draw(r),i.keepAnimating)if(n<1)requestAnimationFrame(t);else{var u=!0;if(-1===a.repeatCount){var l=a.timing;a.timing=function(t){return l(1-t)},a.repeatCount=0}else-2===a.repeatCount||(a.repeatCount>0?a.repeatCount--:u=!1);u&&(o=performance.now(),requestAnimationFrame(t))}}))},function(){var t=["Antøn Shkurenkø","Антон Шкуренко","Antøn","Антон"],e=document.getElementsByClassName("container-centered")[0],n=document.createElement("div");n.classList.add("letters"),e.appendChild(n);var r=new x(n);!function e(){var n=t[Math.floor(Math.random()*t.length)];Math.random()<.1&&(n=n.split("").reverse().join("")),r.setText(n).then((function(){setTimeout(e,1e3)}))}()}];window.addEventListener("load",(function(t){(0,k[Math.floor(Math.random()*k.length)])()}))})();
//# sourceMappingURL=name.js.map