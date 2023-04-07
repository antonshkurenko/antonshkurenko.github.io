export function scrambleText() {

    const phrases = [
        'Antøn Shkurenkø',
        'Антон Шкуренко',
        'Antøn',
        'Антон'
    ]

    let container = document.getElementsByClassName("container-centered")[0]

    let scrambledTextContainer = document.createElement("div") as HTMLElement
    scrambledTextContainer.classList.add("letters")

    container.appendChild(scrambledTextContainer);

    const scramble = new TextScramble(scrambledTextContainer)

    const next = () => {
        let nextString = phrases[Math.floor(Math.random() * phrases.length)]
        if (Math.random() < .1) {
            nextString = nextString.split("").reverse().join("");
        }

        scramble.setText(nextString).then(() => {
            setTimeout(next, 1000)
        })
    }

    next()
}

const extraChars = "!<>-_\\/[]{}—=+*^?#________"

function randomChar(): String {
    return extraChars[Math.floor(Math.random() * extraChars.length)]
}

class Scramble {
    from: String
    to: String
    start: number
    end: number
    char?: String
}

class TextScramble {

    container: HTMLElement

    queue: Array<Scramble>
    frame: number = 0

    resolve: (value: void | PromiseLike<void>) => void
    animationHandle: number

    constructor(container: HTMLElement) {
        this.container = container;
        this.update = this.update.bind(this)
    }

    setText(newText: String) {
        const oldText = this.container.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({from, to, start, end})
        }
        cancelAnimationFrame(this.animationHandle)
        this.frame = 0;
        this.update()
        return promise
    }

    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {from, to, start, end, char} = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="scrambled-text">${char}</span>`
            } else {
                output += from
            }
        }
        this.container.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.animationHandle = requestAnimationFrame(this.update)
            this.frame++
        }
    }
}