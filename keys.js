window.addEventListener('load', function (e) {

    var home = document.getElementsByClassName('small-url')[0];

    HOME_STRS = [
        "There is no place like home.",
        "Country roads, take me home.",
        "Somewhere only we know."
    ];

    home.innerText = HOME_STRS[Math.floor(Math.random() * HOME_STRS.length)];

    var reversedKeys = KEYS.keys.reverse();

    var items = reversedKeys.map(function (el) {

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

    items.unshift({
        src: KEYS.all.pic,
        w: 960,
        h: 1280,
        title: "All 🗝."
    });

    var keysEl = document.getElementById("keys");

    items.forEach(function (el, idx) {
        key = document.createElement("div");
        key.classList.add('grid-item');
        key.innerHTML = "<div class=\"center-cropped\" style=\"background-image: url('" + el.src + "');\"></div><div class=\"key-title\">" + el.title + "</div>";

        key.addEventListener("click", function () {
            var photoswipe = document.getElementsByClassName("pswp")[0];

            var options = { index: idx };

            var gallery = new PhotoSwipe(photoswipe, PhotoSwipeUI_Default, items, options);
            gallery.init();
        });

        keysEl.appendChild(key);

        if (idx == 0) {
            space = document.createElement("div");
            space.classList.add('grid-fullsize');
            space.classList.add('grid-item');
            keysEl.appendChild(space);
        }
    });

    var msnry = new Masonry(keysEl, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 200,
        gutter: 16
    });
});