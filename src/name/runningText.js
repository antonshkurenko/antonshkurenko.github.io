import {animate, animateBetween, REPEAT_COUNT_INFINITY} from "../utils/utils";

export function loopText() {

    let container = document.getElementsByClassName("container-centered")[0];

    container.classList.add("running-text-container");

    const name = "Antøn Shkurenkø&nbsp;";
    const duration = 10000;

    let div1 = document.createElement("div");
    div1.innerHTML = name;
    div1.classList.add("running-text-block");
    div1.classList.add("letters");
    let div2 = document.createElement("div");
    div2.innerHTML = name;
    div2.classList.add("running-text-block");
    div2.classList.add("letters");

    container.appendChild(div1);
    container.appendChild(div2);

    container.style.width = div1.clientWidth;

    animate({
        duration: duration,
        timing: t => t,
        draw: fraction => {
            // 0 -> 50%, 50% -> 100
            // 0 -> -100, 100 -> 0
            let transformX1;
            if (fraction < 0.5) {
                transformX1 = animateBetween(0, -100, fraction * 2);
            } else {
                transformX1 = animateBetween(100, 0, fraction * 2 - 1);
            }
            div1.style.transform = `translateX(${transformX1}%)`;

            // 0 -> -200, because he's start position is at 100, so actually this is 100 -> -100
            let transformX2 = animateBetween(0, -200, fraction);
            div2.style.transform = `translateX(${transformX2}%)`;
        },
        repeatCount: REPEAT_COUNT_INFINITY,
    });
}