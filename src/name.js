import {parallaxLetters} from "./name/letters";
import {loopText} from "./name/runningText";

const names = [
    parallaxLetters,
    loopText,
];

window.addEventListener('load', function (e) {
    let name = names[Math.floor(Math.random() * names.length)];

    name();
});
