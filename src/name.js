import {parallaxLetters} from "./name/letters";
import {loopText} from "./name/runningText";
import {scrambleText} from "./name/scrambleText";

const names = [
    parallaxLetters,
    loopText,
    scrambleText // from here: https://css-tricks.com/lots-of-ways-to-use-math-random-in-javascript/
];

window.addEventListener('load', function (e) {
    let name = names[Math.floor(Math.random() * names.length)];

    name();
});
