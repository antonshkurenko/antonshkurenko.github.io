import Parallax from "parallax-js";
import {
    animateBetween,
    clampToRadius,
    FULL_PI,
    getTextSize,
    Point,
    smallestRotateDirection,
    toDegrees
} from "../utils/utils";

const RADIUS_COEF = 0.8;
const MAX_RADIUS_COEF_SQR = 16 / 9; // 4/3

let MAX_RADIUS;
let MAX_RADIUS_SQR;

function getZ(x, y, radiusSqr) {
    let zSqr = radiusSqr - x * x - y * y;

    /**
     * Sometimes in case of decimals Z can be something like -2
     * ignore such values
     */
    if (zSqr > 0) {
        return Math.sqrt(zSqr);
    } else {
        return 0.01 * Math.sqrt(radiusSqr);
    }
}

function getKx(y, z) {
    return -y / z;
}

function getKy(x, z) {
    return -x / z;
}

function getKz(x, y) {
    return -x / y;
}

function getActualCoord(element, elementSize) {
    let rect = element.getBoundingClientRect();
    return new Point(rect.left + elementSize.x / 2, rect.top - elementSize.y / 2);
}

function createLetters() {
    let container = document.getElementsByClassName("container-centered")[0];

    class Letter {
        constructor(letter, depth) {
            this.letter = letter;
            this.depth = depth;
        }
    }

    /* sum = 0
          for i in range (0, 22):
            sum+=1/23
            print(sum)
       take 15 last
     */
    let letters = [
        new Letter('A', 0.695),
        new Letter('n', 0.521),
        new Letter('t', 0.782),
        new Letter('ø', 0.391),
        new Letter('n', 0.652),
        new Letter(' ', 0.869),
        new Letter('S', 0.826),
        new Letter('h', 0.347),
        new Letter('k', 0.739),
        new Letter('u', 0.608),
        new Letter('r', 0.913),
        new Letter('e', 0.434),
        new Letter('n', 0.565),
        new Letter('k', 0.956),
        new Letter('ø', 0.478),
    ];

    let ul = document.createElement("ul");
    ul.id = "name-scene";

    letters.forEach((letter, idx) => {

        let li = document.createElement("li");
        li.classList.add("layer");
        li.id = `letter_${idx + 1}`;
        li.setAttribute("data-depth", letter.depth);

        /*
           I'd like to use spans,
           not divs, but it's impossible
           to use transformations on inline
           elements
         */

        let div = document.createElement("div");
        div.classList.add("letter");
        div.classList.add("letters");
        div.innerHTML = letter.letter;

        li.appendChild(div);
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

export function parallaxLetters() {

    createLetters();

    let letters = document.getElementsByClassName('letter');
    let body = document.getElementsByTagName('body')[0];

    let letterIds = Array.from(letters).map((el) => el.parentElement.id);

    letterIds.sort((a, b) => {
        return a.replace('letter_', '') - b.replace('letter_', '');
    });

    if (Math.random() < .1) {
        const zalgo = [

            ['Ã̷͉͛ͅ', 'n̴̩̼͐̆', 't̷̥̭̩͖̑͘͝ͅ', 'ø̷͍̊̈͊', 'n̸̥͑', ' ̶̧̀', 'S̵̻̹͖̹͗͂̓͐̚', 'h̶̛̯͕̿̏̚͠', 'k̴̨̟̤̙̥̀̀̆̇̔̾ͅ', 'u̷̱͎̱̽͂̏̔͝', 'r̷̨̢̯̞̎̆̋̌̃͝', 'ḝ̴̙̭̯̋͜͜', 'n̵̻̘̈́̉͒̈́̕͝', 'k̶͈̓͝', 'ø̵͖̇͂̓'],


            ['Ä̸͈́', 'n̵̡̡̥͈͚̆͜', 'ț̴̟̉́͑̈́͝', 'ø̵͙̠͕̰̄̒̽̀̂̀', 'n̸̘̆̒', ' ̴͎̫̩̬̳́̿̈́̓̐͂̈́', 'S̸̨͉̹͐͒̆̾͌', 'ḩ̶̛̙̮̱͔̑̇̍̔̀͠ͅ', 'k̸̡̙͙͕̯͈͐ͅ', 'u̵̢͌̔͠͝', 'r̵͖̤͔̞̫͒', 'è̸͖̬̞͙̅̌͘', 'n̸̨͖̤̔̋̆͆̅̕͝', 'k̷̰͖͔̺͉̆̋̌͜', 'ø̵̛̲̾͌̄́͝͝'],


            ['Ā̸͙̏͝', 'n̶̝̪̰̦̒̌̾̇̂͒', 't̴̺͍̝͓̆̄̍̈́̎', 'ø̶̛̘̝͓̫̥̫̍', 'n̴̝̣͌̃̎͐̓̚', ' ̴̛̫̻̹̱̙͔͂̓͋̍͠', 'S̶͕͓͔̲̋', 'h̵̛̪̊', 'k̷̬͚͔̙̆͛͐', 'ȗ̶̡͕̱͊̓̂͂͝', 'r̷̯̙͚̭̰̆̓͠', 'ę̷̗̞̘̰̫̒͐̽̒̔', 'n̸͉̓̓́͐̀͝', 'ķ̶̛͇̭̇̐̽̋', 'ø̴͉͖̭̣͠'],


            ['Ả̵̱̹̞͙͓̘͌͜', 'n̶̡̏͊͆', 't̵̪̙̟͚̫͑̉̔͘͘', 'ø̴̼͖͉̙̄́̂', 'n̴͇̦̩̮̓͆̈͋͑͝', ' ̴̼͎̃', 'S̷̢̺̒', 'h̵̩͍̳̜̝͉̫͋̽̈́̑', 'k̷͔̓͌͒̀', 'u̸̟͚̦̠̺̿̾', 'r̶̡͕̖̈́̌̕', 'e̵̠͆͑͂̈͝', 'n̵͈̥͇̜̤̻̮̆', 'k̴̩̝͊̑̑̚', 'ø̴͔̀̒̇̓̌͌͝'],


            ['À̷̜̲̭̣́͊́̄̉̔', 'n̵̛̹̘̳̳̼͚̩͖̄̉̎̿̆͂ͅ', 't̶̡̻̲̰͙̥̳̊̄̐̓͝', 'ǿ̴͚̬̠̥̝̠͇̳̗̹̩̝͂̓̊͜', 'ņ̸͚̳͉͙̭̫͍̙̮̃̋', ' ̸̨͖̠̦̻͈̤̄̄͒̋̃̕', 'S̶̡̩͔͎̰̮̺̖͙̈́̈́̋̇̽̈́̍͝͝͝ͅ', 'ĥ̶̬͐̽', 'ḵ̴̢̞̣̫͔͖̖̲̠̉̇͋͝', 'u̵̡̦̳͔͇̦̘̞͈̼̔̓͛̔̇͒̃͝͝', 'ȑ̶̢̛͇̰̰̪̱̺̘̉̄̈͗ͅͅ', 'e̷͖̳͍͑̌̉͆͝', 'n̵̦͚͕̥͐̏̕', 'k̶̢̥̙̝̟̠̘̬̑ͅ', 'ø̶̩̲̲̞̫̲̫̑͑̏̿̀̋̃͛̉͗̓͋͛̓'],


            ['A̶̝͍̋̅͂̇̿', 'n̵̫̜̳̤̯̤͍̲̩̹͈̽̉͂̓̎̐͐̕͝ͅ', 'ṱ̶̺̀̍̉', 'ø̶̛͕̠̑̓̍', 'n̸̘̠̘͔͎͖̟̙͔̩̈̀̆͛̓̈́͝͝ͅͅ', ' ̷̡͔̱̹͈̞͂̔̒̈̐́̿̽̈́̿̇͘', 'Ş̶̗̰̯̱̋̑̓̋̐́̽̌́', 'h̴̺͉̣̝̆̊̓͒̐͒̊̋̚͜͝', 'k̸̠̭͝', 'ǘ̷̝̗͍̼͊͗̔͗̐', 'ȓ̴͇͙͚̭̟̣̥̦̠̦̮͑͊̚͜', 'e̶͉̪̠͔̱̫̫͙͈̤̳͠', 'n̷̲̘̒͑̃͒̅̏͊͂͊', 'ķ̵̯̿̆͋̏͒̾͑̎͆̿̕̕', 'ø̷͚̬̝̂͗̅̏̈́͆̕̚͜͠'],


            ['A̶̢̛̺̰͉̥͓͖̠͓̠̲̹̠͚̜͉̜̾̅̈͂̐̑́͌̒̅̀̿̋̓́̍͑̎̿̀', 'ǹ̶̛̼̙͙̣̣̠̤̻̹̫̜̎̈́̂͂̇̀̕̚͘ͅ', 'ṫ̷͙̲̱̳̫͉͇̞͎͉̭̤̈́̈͌̀̈́̏̎̚͝', 'ø̷̧̨̮͕͖̖͉̳͖̈́̊́̒͛̍͑͂̓͜͜', 'n̸̛͖̹̗͔̗͖̥̱̐͌̈́́́̋̀̂̈̈́͊̉̌̒͘̚͜͠', ' ̷̫͙͈͉̼̬̖̮̎̈͒̓̽̅̽̍͆̌̐͆̍̂̚͘', 'S̵̨̧̥̭͇̙̲͎̫̬̱̜̫̥͔͎̭̊̿̆̋̅̓̈̉͜', 'ḩ̴͇̲͍͔̮͕̬̲͈̹̝͓̪̩̟̺̝̩̯̈́̒͗̏͊̄̍̇', 'ķ̸̢̘͎̣̮̳͕̜̥̼̭̣͇͗͆̏̊͗̋̉̔̍̀͑̈́̒͘͝', 'u̸̻̗̙͑ͅ', 'r̸̨͈̬̫͖̻͓̺͙͈͖̩̥̳̪̞̫̱̰͂̈́́͒̌͋̕͜ͅ', 'ę̶̧̖͇̲̦͎̱̟͇̭̦̎̍̽̒̔̈́͋̎͑͘͜͠', 'n̷̳̘̙͔̈́̌̊͐͗̾͌̄͒͝͠', 'k̷̛̛̹̄̀̎̉͌͛̿͘̚̚͠', 'ø̵̨̘̉͒̓̍͛̌̂͛̈͠͝']


        ];

        let randomZalgo = zalgo[Math.floor(Math.random() * zalgo.length)];

        letterIds
            .map((id) => document.getElementById(id))
            .map((el) => el.getElementsByClassName("letter")[0])
            .forEach((el, idx) => {
                el.innerHTML = randomZalgo[idx];
            });
    }

    // const
    let letterSizes = [];
    let letterDataDepths = [];
    // antOn sHkUrENkO
    let ohueno = [3, 7, 9, 11, 12, 14];

    // mutable
    let letterRadiusSqrs = new Array(letters.length)
        .fill(0);
    let letterStartPositions = new Array(letters.length)
        .fill(0);
    let letterZAngles = new Array(letters.length)
        .fill(0);

    let totalWidth = 0;
    for (let i = 0; i < letters.length; i++) {
        let current = letters[i];

        let size = getTextSize(current.textContent, "32px Roboto");

        letterSizes.push(size);
        totalWidth += size.x;

        let parent = current.parentElement;

        parent.setAttribute("data-index", i.toString());
        let dataDepth = parent.getAttribute("data-depth");
        letterDataDepths.push(dataDepth);
    }

    MAX_RADIUS = (Math.min(body.clientWidth, body.clientHeight) / 2) * RADIUS_COEF;
    MAX_RADIUS_SQR = MAX_RADIUS * MAX_RADIUS * MAX_RADIUS_COEF_SQR;

    for (let i = 0; i < letters.length; i++) {
        letterRadiusSqrs[i] = letterDataDepths[i] * letterDataDepths[i] * MAX_RADIUS_SQR;
    }

    let scene = document.getElementById('name-scene');
    let parallax = new Parallax(scene, {
        calibrateX: false,
        calibrateY: false,
        invertX: false,
        invertY: false,
        limitX: MAX_RADIUS,
        limitY: MAX_RADIUS,
        scalarX: 2500,
        scalarY: 2500,
        frictionX: 0.3,
        frictionY: 0.3,
        originX: 0.5,
        originY: 0.5,
        clampFunc: function (element, x, y) {
            let index = parseInt(element.getAttribute("data-index"));
            return clampToRadius(new Point(0, 0),
                new Point(x, y), MAX_RADIUS * letterDataDepths[index]);
        }
    });

    let negativeOffset = -totalWidth / 2;
    let offset = 0;
    for (let i = 0; i < letters.length; i++) {
        let current = letters[i];
        current.parentElement.style.left = (negativeOffset + offset) + "px";
        offset += letterSizes[i].x;
    }

    let init = () => {

        for (let i = 0; i < letters.length; i++) {

            let values = letters[i].parentElement.style.transform.split('(')[1];

            let [_a, _b] = values.split(',');
            let a = parseFloat(_a);
            let b = parseFloat(_b);

            letterStartPositions[i] = getActualCoord(letters[i], letterSizes[i])
                .sub(new Point(a, b));
        }
    };

    init();

    window.addEventListener('optimizedResize', () => {
        init();

        MAX_RADIUS = (Math.min(body.clientWidth, body.clientHeight) / 2) * 0.8;
        MAX_RADIUS_SQR = MAX_RADIUS * MAX_RADIUS * MAX_RADIUS_COEF_SQR;

        for (var i = 0; i < letters.length; i++) {
            letterRadiusSqrs[i] = letterDataDepths[i] * letterDataDepths[i] * MAX_RADIUS_SQR;
        }

        parallax.limit(MAX_RADIUS, MAX_RADIUS);
    });

    window.addEventListener('mousemove', () => {

        for (let i = 0; i < letters.length; i++) {
            let current = letters[i];
            let center = letterStartPositions[i];
            let actualCoord = getActualCoord(current, letterSizes[i])
                .sub(center);

            if (ohueno.indexOf(i) >= 0) {
                let percentage = actualCoord.len() / Math.sqrt(letterRadiusSqrs[i]);
                let r = Math.round(animateBetween(0, 255, percentage));
                let g = Math.round(animateBetween(0, 0, percentage));
                let b = Math.round(animateBetween(0, 0, percentage));
                current.style.color = `rgb(${r},${g},${b})`;
            }

            let z = getZ(actualCoord.x, actualCoord.y, letterRadiusSqrs[i]);

            let kx = getKx(actualCoord.y, z);
            let ky = getKy(actualCoord.x, z);
            let kz = getKz(actualCoord.x, actualCoord.y);

            let xAngle = Math.atan(kx) + Math.PI;
            let yAngle = Math.atan(ky) + Math.PI;
            let zAngle = Math.atan(kz);

            if (actualCoord.y > 0) {
                zAngle += Math.PI;
            } else {
                if (actualCoord.x < 0) {
                    zAngle += FULL_PI;
                }
            }

            xAngle = toDegrees(xAngle);
            yAngle = toDegrees(yAngle);
            zAngle = toDegrees(zAngle);

            zAngle = smallestRotateDirection(letterZAngles[i], zAngle);
            letterZAngles[i] = zAngle;

            current.style.transform = `rotateX(${xAngle}deg) rotateY(${yAngle}deg) rotateZ(${zAngle}deg)`;
        }
    });
}
