(()=>{"use strict";function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var e=2*Math.PI;function n(t,e,n){return(1-n)*t+n*e}var r=function(){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.x=parseFloat(t.toFixed(4)),this.y=parseFloat(n.toFixed(4))}var n,r;return n=e,(r=[{key:"connect",value:function(t,e){e.moveTo(this.x,this.y),e.lineTo(t.x,t.y)}},{key:"add",value:function(t){return new e(this.x+t.x,this.y+t.y)}},{key:"sub",value:function(t){return new e(this.x-t.x,this.y-t.y)}},{key:"dist",value:function(t){return Math.hypot(this.x-t.x,this.y-t.y)}},{key:"len",value:function(){return Math.hypot(this.x,this.y)}},{key:"mult",value:function(t){return new e(this.x*t,this.y*t)}},{key:"div",value:function(t){return new e(this.x/t,this.y/t)}},{key:"isInside",value:function(t,e){return this.dist(t)<=e}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function a(t){return t*(180/Math.PI)}function i(t,e){var n;return(n=(t=t||0)%360)<0&&(n+=360),n<180&&e>n+180&&(t-=360),n>=180&&e<=n-180&&(t+=360),t+(e-n)}function o(t,e){var n=(o.canvas||(o.canvas=document.createElement("canvas"))).getContext("2d");n.font=e;var a=n.measureText(t);return new r(a.width,32)}function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,i=[],o=!0,l=!1;try{for(n=n.call(t);!(o=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);o=!0);}catch(t){l=!0,a=t}finally{try{o||null==n.return||n.return()}finally{if(l)throw a}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}var d,f,h=16/9;function m(t,e){return-t/e}function v(t,e){return-t/e}function y(t,e){return-t/e}function p(t,e){var n=t.getBoundingClientRect();return new r(n.left+e.x/2,n.top-e.y/2)}var g=[function(){!function(){var t=document.getElementsByClassName("container-centered")[0],e=s((function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.letter=e,this.depth=n})),n=[new e("A",.695),new e("n",.521),new e("t",.782),new e("ø",.391),new e("n",.652),new e(" ",.869),new e("S",.826),new e("h",.347),new e("k",.739),new e("u",.608),new e("r",.913),new e("e",.434),new e("n",.565),new e("k",.956),new e("ø",.478)],r=document.createElement("ul");r.id="name-scene",n.forEach((function(t,e){var n=document.createElement("li");n.classList.add("layer"),n.id="letter_".concat(e+1),n.setAttribute("data-depth",t.depth);var a=document.createElement("div");a.classList.add("letter"),a.classList.add("letters"),a.innerHTML=t.letter,n.appendChild(a),r.appendChild(n)})),t.appendChild(r)}();var t=document.getElementsByClassName("letter"),u=document.getElementsByTagName("body")[0],c=Array.from(t).map((function(t){return t.parentElement.id}));if(c.sort((function(t,e){return t.replace("letter_","")-e.replace("letter_","")})),Math.random()<.1){var g=[["Ã̷͉͛ͅ","n̴̩̼͐̆","t̷̥̭̩͖̑͘͝ͅ","ø̷͍̊̈͊","n̸̥͑"," ̶̧̀","S̵̻̹͖̹͗͂̓͐̚","h̶̛̯͕̿̏̚͠","k̴̨̟̤̙̥̀̀̆̇̔̾ͅ","u̷̱͎̱̽͂̏̔͝","r̷̨̢̯̞̎̆̋̌̃͝","ḝ̴̙̭̯̋͜͜","n̵̻̘̈́̉͒̈́̕͝","k̶͈̓͝","ø̵͖̇͂̓"],["Ä̸͈́","n̵̡̡̥͈͚̆͜","ț̴̟̉́͑̈́͝","ø̵͙̠͕̰̄̒̽̀̂̀","n̸̘̆̒"," ̴͎̫̩̬̳́̿̈́̓̐͂̈́","S̸̨͉̹͐͒̆̾͌","ḩ̶̛̙̮̱͔̑̇̍̔̀͠ͅ","k̸̡̙͙͕̯͈͐ͅ","u̵̢͌̔͠͝","r̵͖̤͔̞̫͒","è̸͖̬̞͙̅̌͘","n̸̨͖̤̔̋̆͆̅̕͝","k̷̰͖͔̺͉̆̋̌͜","ø̵̛̲̾͌̄́͝͝"],["Ā̸͙̏͝","n̶̝̪̰̦̒̌̾̇̂͒","t̴̺͍̝͓̆̄̍̈́̎","ø̶̛̘̝͓̫̥̫̍","n̴̝̣͌̃̎͐̓̚"," ̴̛̫̻̹̱̙͔͂̓͋̍͠","S̶͕͓͔̲̋","h̵̛̪̊","k̷̬͚͔̙̆͛͐","ȗ̶̡͕̱͊̓̂͂͝","r̷̯̙͚̭̰̆̓͠","ę̷̗̞̘̰̫̒͐̽̒̔","n̸͉̓̓́͐̀͝","ķ̶̛͇̭̇̐̽̋","ø̴͉͖̭̣͠"],["Ả̵̱̹̞͙͓̘͌͜","n̶̡̏͊͆","t̵̪̙̟͚̫͑̉̔͘͘","ø̴̼͖͉̙̄́̂","n̴͇̦̩̮̓͆̈͋͑͝"," ̴̼͎̃","S̷̢̺̒","h̵̩͍̳̜̝͉̫͋̽̈́̑","k̷͔̓͌͒̀","u̸̟͚̦̠̺̿̾","r̶̡͕̖̈́̌̕","e̵̠͆͑͂̈͝","n̵͈̥͇̜̤̻̮̆","k̴̩̝͊̑̑̚","ø̴͔̀̒̇̓̌͌͝"],["À̷̜̲̭̣́͊́̄̉̔","n̵̛̹̘̳̳̼͚̩͖̄̉̎̿̆͂ͅ","t̶̡̻̲̰͙̥̳̊̄̐̓͝","ǿ̴͚̬̠̥̝̠͇̳̗̹̩̝͂̓̊͜","ņ̸͚̳͉͙̭̫͍̙̮̃̋"," ̸̨͖̠̦̻͈̤̄̄͒̋̃̕","S̶̡̩͔͎̰̮̺̖͙̈́̈́̋̇̽̈́̍͝͝͝ͅ","ĥ̶̬͐̽","ḵ̴̢̞̣̫͔͖̖̲̠̉̇͋͝","u̵̡̦̳͔͇̦̘̞͈̼̔̓͛̔̇͒̃͝͝","ȑ̶̢̛͇̰̰̪̱̺̘̉̄̈͗ͅͅ","e̷͖̳͍͑̌̉͆͝","n̵̦͚͕̥͐̏̕","k̶̢̥̙̝̟̠̘̬̑ͅ","ø̶̩̲̲̞̫̲̫̑͑̏̿̀̋̃͛̉͗̓͋͛̓"],["A̶̝͍̋̅͂̇̿","n̵̫̜̳̤̯̤͍̲̩̹͈̽̉͂̓̎̐͐̕͝ͅ","ṱ̶̺̀̍̉","ø̶̛͕̠̑̓̍","n̸̘̠̘͔͎͖̟̙͔̩̈̀̆͛̓̈́͝͝ͅͅ"," ̷̡͔̱̹͈̞͂̔̒̈̐́̿̽̈́̿̇͘","Ş̶̗̰̯̱̋̑̓̋̐́̽̌́","h̴̺͉̣̝̆̊̓͒̐͒̊̋̚͜͝","k̸̠̭͝","ǘ̷̝̗͍̼͊͗̔͗̐","ȓ̴͇͙͚̭̟̣̥̦̠̦̮͑͊̚͜","e̶͉̪̠͔̱̫̫͙͈̤̳͠","n̷̲̘̒͑̃͒̅̏͊͂͊","ķ̵̯̿̆͋̏͒̾͑̎͆̿̕̕","ø̷͚̬̝̂͗̅̏̈́͆̕̚͜͠"],["A̶̢̛̺̰͉̥͓͖̠͓̠̲̹̠͚̜͉̜̾̅̈͂̐̑́͌̒̅̀̿̋̓́̍͑̎̿̀","ǹ̶̛̼̙͙̣̣̠̤̻̹̫̜̎̈́̂͂̇̀̕̚͘ͅ","ṫ̷͙̲̱̳̫͉͇̞͎͉̭̤̈́̈͌̀̈́̏̎̚͝","ø̷̧̨̮͕͖̖͉̳͖̈́̊́̒͛̍͑͂̓͜͜","n̸̛͖̹̗͔̗͖̥̱̐͌̈́́́̋̀̂̈̈́͊̉̌̒͘̚͜͠"," ̷̫͙͈͉̼̬̖̮̎̈͒̓̽̅̽̍͆̌̐͆̍̂̚͘","S̵̨̧̥̭͇̙̲͎̫̬̱̜̫̥͔͎̭̊̿̆̋̅̓̈̉͜","ḩ̴͇̲͍͔̮͕̬̲͈̹̝͓̪̩̟̺̝̩̯̈́̒͗̏͊̄̍̇","ķ̸̢̘͎̣̮̳͕̜̥̼̭̣͇͗͆̏̊͗̋̉̔̍̀͑̈́̒͘͝","u̸̻̗̙͑ͅ","r̸̨͈̬̫͖̻͓̺͙͈͖̩̥̳̪̞̫̱̰͂̈́́͒̌͋̕͜ͅ","ę̶̧̖͇̲̦͎̱̟͇̭̦̎̍̽̒̔̈́͋̎͑͘͜͠","n̷̳̘̙͔̈́̌̊͐͗̾͌̄͒͝͠","k̷̛̛̹̄̀̎̉͌͛̿͘̚̚͠","ø̵̨̘̉͒̓̍͛̌̂͛̈͠͝"]],w=g[Math.floor(Math.random()*g.length)];c.map((function(t){return document.getElementById(t)})).map((function(t){return t.getElementsByClassName("letter")[0]})).forEach((function(t,e){t.innerHTML=w[e]}))}for(var b=[],x=[],k=[3,7,9,11,12,14],A=new Array(t.length).fill(0),M=new Array(t.length).fill(0),E=new Array(t.length).fill(0),C=0,L=0;L<t.length;L++){var S=t[L],I=o(S.textContent,"32px Roboto");b.push(I),C+=I.x;var T=S.parentElement;T.setAttribute("data-index",L.toString());var F=T.getAttribute("data-depth");x.push(F)}d=Math.min(u.clientWidth,u.clientHeight)/2*.8,f=d*d*h;for(var P=0;P<t.length;P++)A[P]=x[P]*x[P]*f;for(var X=document.getElementById("name-scene"),B=new Parallax(X,{calibrateX:!1,calibrateY:!1,invertX:!1,invertY:!1,limitX:d,limitY:d,scalarX:2500,scalarY:2500,frictionX:.3,frictionY:.3,originX:.5,originY:.5,clampFunc:function(t,e,n){var a=parseInt(t.getAttribute("data-index"));return function(t,e,n){var r=e.sub(t),a=r.len();if(a<n)return e;var i=r.div(a);return t.add(i.mult(n))}(new r(0,0),new r(e,n),d*x[a])}}),j=-C/2,O=0,Y=0;Y<t.length;Y++)t[Y].parentElement.style.left=j+O+"px",O+=b[Y].x;var q=function(){for(var e=0;e<t.length;e++){var n=l(t[e].parentElement.style.transform.split("(")[1].split(","),2),a=n[0],i=n[1],o=parseFloat(a),u=parseFloat(i);M[e]=p(t[e],b[e]).sub(new r(o,u))}};q(),window.addEventListener("optimizedResize",(function(){q(),d=Math.min(u.clientWidth,u.clientHeight)/2*.8,f=d*d*h;for(var e=0;e<t.length;e++)A[e]=x[e]*x[e]*f;B.limit(d,d)})),window.addEventListener("mousemove",(function(){for(var r=0;r<t.length;r++){var o=t[r],l=M[r],u=p(o,b[r]).sub(l);if(k.indexOf(r)>=0){var c=u.len()/Math.sqrt(A[r]),s=Math.round(n(0,255,c)),d=Math.round(n(0,0,c)),f=Math.round(n(0,0,c));o.style.color="rgb(".concat(s,",").concat(d,",").concat(f,")")}var h=(I=u.x,T=u.y,void 0,(P=(F=A[r])-I*I-T*T)>0?Math.sqrt(P):.01*Math.sqrt(F)),g=m(u.y,h),w=v(u.x,h),x=y(u.x,u.y),C=Math.atan(g)+Math.PI,L=Math.atan(w)+Math.PI,S=Math.atan(x);u.y>0?S+=Math.PI:u.x<0&&(S+=e),C=a(C),L=a(L),S=a(S),S=i(E[r],S),E[r]=S,o.style.transform="rotateX(".concat(C,"deg) rotateY(").concat(L,"deg) rotateZ(").concat(S,"deg)")}var I,T,F,P}))},function(){var t=document.getElementsByClassName("container-centered")[0];t.classList.add("running-text-container");var e="Antøn Shkurenkø&nbsp;",r=document.createElement("div");r.innerHTML=e,r.classList.add("running-text-block"),r.classList.add("letters");var a,i,o,l=document.createElement("div");l.innerHTML=e,l.classList.add("running-text-block"),l.classList.add("letters"),t.appendChild(r),t.appendChild(l),t.style.width=r.clientWidth,a={duration:1e4,timing:function(t){return t},draw:function(t){var e;e=t<.5?n(0,-100,2*t):n(100,0,2*t-1),r.style.transform="translateX(".concat(e,"%)");var a=n(0,-200,t);l.style.transform="translateX(".concat(a,"%)")},repeatCount:-2},i={keepAnimating:!0},o=performance.now(),requestAnimationFrame((function t(e){var n=(e-o)/a.duration;n>1&&(n=1),n<0&&(n=0);var r=a.timing(n);if(a.draw(r),i.keepAnimating)if(n<1)requestAnimationFrame(t);else{var l=!0;if(-1===a.repeatCount){var u=a.timing;a.timing=function(t){return u(1-t)},a.repeatCount=0}else-2===a.repeatCount||(a.repeatCount>0?a.repeatCount--:l=!1);l&&(o=performance.now(),requestAnimationFrame(t))}}))}];window.addEventListener("load",(function(t){(0,g[Math.floor(Math.random()*g.length)])()}))})();
//# sourceMappingURL=name.js.map