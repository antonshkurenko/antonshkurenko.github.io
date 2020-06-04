export const FAV_COCKTAILS = [
    {
        "name": "Bloody Mary",
        "url": "https://en.wikipedia.org/wiki/Bloody_Mary_(cocktail)",
        "notes": "After all this time? Always.",
        "emoji": "🥓"
    },
    {
        "name": "Vampiro",
        "url": "https://en.wikipedia.org/wiki/Vampiro_(cocktail)",
        "notes": "Honey and orange juice do their job.",
        "emoji": "🧛🏻‍"
    },
    {
        "name": "Orgasm",
        "url": "https://en.wikipedia.org/wiki/Orgasm_(cocktail)",
        "notes": "Dreaming of journeys.",
        "emoji": "🗺"
    },
    {
        "name": "White Russian",
        "url": "https://en.wikipedia.org/wiki/White_Russian_(cocktail)",
        "notes": "Enjoying evening at home with carpet.",
        "emoji": "🎬"
    },
    {
        "name": "Planter's Punch",
        "url": "https://en.wikipedia.org/wiki/Planter%27s_punch",
        "notes": "Sweet.",
        "emoji": "🎁"
    },
    {
        "name": "Bee's Knees",
        "url": "https://www.liquor.com/recipes/bees-knees/",
        "notes": "I like honey in cocktails.",
        "emoji": "⚜️"
    },
    {
        "name": "Margarita",
        "url": "https://en.wikipedia.org/wiki/Margarita",
        "notes": "Sweet, sour, salty.",
        "emoji": "🧂"
    },
    {
        "name": "Cold Brew Negroni",
        "url": "https://www.liquor.com/recipes/cold-brew-negroni/",
        "notes": "Enjoy the Silence.",
        "emoji": "🔕"
    }
];

window.addEventListener('load', () => {

    let cocktails = document.getElementById('cocktails');

    FAV_COCKTAILS.forEach((cocktail) => {
        let cocktailEl = document.createElement("div");
        cocktailEl.classList.add('cocktail');
        cocktailEl.innerHTML =
            `
            <div>
                <a href="${cocktail.url}" class="cocktitle">${cocktail.name}</a> <span class="cockmoji">${cocktail.emoji}</span><br />
                <span class="cocknote">${cocktail.notes}</span><br />
            </div>
            `.trim();

        cocktails.appendChild(cocktailEl);
    });
});

