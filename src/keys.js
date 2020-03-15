import { DESCRIPTION } from "../keys/data";
import { KEYS } from "../keys/data";

const PICTURE_SIZE = 1280;

window.addEventListener('load', () => {

    let home = document.getElementsByClassName('small-url')[0];

    const HOME_STRS = [
        "There is no place like home.",
        "Country roads, take me home.",
        "Somewhere only we know."
    ];

    home.innerText = HOME_STRS[Math.floor(Math.random() * HOME_STRS.length)];

    let reversedKeys = KEYS.keys.reverse();
    let keysItems = reversedKeys.map(el => {

        let title = el.city + ".";
        let subtitle = `<br /><small><i>Acquired in ${el.year}.`;
        if (el.additional != null) {
            subtitle += " " + el.additional + ".";
        }

        subtitle += "</i></small>";

        title += subtitle;

        return {
            src: el.pic,
            w: PICTURE_SIZE,
            h: PICTURE_SIZE,
            title: title,
        };
    });

    keysItems.unshift({
        src: KEYS.all.pic,
        w: PICTURE_SIZE,
        h: PICTURE_SIZE,
        title: "All 🗝."
    });

    let couldbe = KEYS.couldbe.reverse();
    let couldBeItems = couldbe.map(el => {

        let title = el.city + ".";
        let subtitle = `<br /><small><i>Found in ${el.year}.`;
        if (el.additional != null) {
            subtitle += " " + el.additional + ".";
        }

        subtitle += "</i></small>";

        title += subtitle;

        return {
            src: el.pic,
            w: PICTURE_SIZE,
            h: PICTURE_SIZE,
            title: title,
        };
    });

    let items = keysItems.concat(couldBeItems);

    let clickFunc = idx => () => {
        let photoswipe = document.getElementsByClassName("pswp")[0];

        let options = { index: idx };

        let gallery = new PhotoSwipe(photoswipe, PhotoSwipeUI_Default, items, options);

        gallery.init();
    };

    let keysEl = document.getElementById("keys");

    keysItems.forEach((el, idx) => {
        let key = document.createElement("div");
        key.classList.add('grid-item');
        key.innerHTML = `<div class="center-cropped" style="background-image: url('${el.src}');"></div><div class="key-title">${el.title}</div>`;

        key.addEventListener("click", clickFunc(idx));

        keysEl.appendChild(key);

        if (idx === 0) {

            let description = document.createElement("div");
            description.classList.add('description-item');
            description.classList.add('grid-item');
            description.innerHTML = DESCRIPTION;
            keysEl.appendChild(description);

            let space = document.createElement("div");
            space.classList.add('grid-fullsize');
            space.classList.add('grid-item');
            keysEl.appendChild(space);
        }
    });

    let couldbeEl = document.getElementById("couldbe");

    couldBeItems.forEach((el, idx) => {
        let key = document.createElement("div");
        key.classList.add('grid-item');
        key.innerHTML = `<div class="center-cropped" style="background-image: url('${el.src}');"></div><div class="key-title">${el.title}</div>`;

        key.addEventListener("click", clickFunc(keysItems.length + idx));

        couldbeEl.appendChild(key);
    });

    let msnry = new Masonry(keysEl, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 200,
        gutter: 16
    });

    let couldbeMsnry = new Masonry(couldbeEl, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 200,
        gutter: 16
    });
});