window.addEventListener('load', function (e) {

    var home = document.getElementsByClassName('small-url')[0];

    HOME_STRS = [
        "There is no place like home.",
        "Country roads, take me home.",
        "Somewhere only we know."
    ];

    home.innerText = HOME_STRS[Math.floor(Math.random() * HOME_STRS.length)];

    var reversedKeys = KEYS.keys.reverse();
    var keysItems = reversedKeys.map(function (el) {

        title = el.city + ".";
        subtitle = "<br /><small><i>" + "Acquired in " + el.year + ".";
        if (el.additional != null) {
            subtitle += " " + el.additional;
        }

        subtitle += "</i></small>";

        title += subtitle;

        return {
            src: el.pic,
            w: 960,
            h: 1280,
            title: title,
        };
    });

    keysItems.unshift({
        src: KEYS.all.pic,
        w: 960,
        h: 1280,
        title: "All 🗝."
    });

    var couldbe = KEYS.couldbe.reverse();
    var couldBeItems = couldbe.map(function (el) {

        title = el.city + ".";
        subtitle = "<br /><small><i>" + "Found in " + el.year + ".";
        if (el.additional != null) {
            subtitle += " " + el.additional;
        }

        subtitle += "</i></small>";

        title += subtitle;

        return {
            src: el.pic,
            w: 960,
            h: 1280,
            title: title,
        };
    });

    var items = keysItems.concat(couldBeItems);

    var clickFunc = function(idx) {
        return function () {
            var photoswipe = document.getElementsByClassName("pswp")[0];

            var options = { index: idx };

            var gallery = new PhotoSwipe(photoswipe, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
    }

    var keysEl = document.getElementById("keys");

    keysItems.forEach(function (el, idx) {
        key = document.createElement("div");
        key.classList.add('grid-item');
        key.innerHTML = "<div class=\"center-cropped\" style=\"background-image: url('" + el.src + "');\"></div><div class=\"key-title\">" + el.title + "</div>";

        key.addEventListener("click", clickFunc(idx));

        keysEl.appendChild(key);

        if (idx == 0) {
            space = document.createElement("div");
            space.classList.add('grid-fullsize');
            space.classList.add('grid-item');
            keysEl.appendChild(space);
        }
    });

    var couldbeEl = document.getElementById("couldbe");

    couldBeItems.forEach(function (el, idx) {
        key = document.createElement("div");
        key.classList.add('grid-item');
        key.innerHTML = "<div class=\"center-cropped\" style=\"background-image: url('" + el.src + "');\"></div><div class=\"key-title\">" + el.title + "</div>";

        key.addEventListener("click", clickFunc(keysItems.length + idx));

        couldbeEl.appendChild(key);
    });

    var msnry = new Masonry(keysEl, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 200,
        gutter: 16
    });

    var couldbeMsnry = new Masonry(couldbeEl, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 200,
        gutter: 16
    });
});