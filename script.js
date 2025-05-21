const sayings = [
    "That's what football's all about!",
    "He’ll be disappointed with that.",
    "Unbelievable, Jeff!",
    "He’s having the time of his life!",
    "You couldn't write the script!",
    "It's a game of two halves!",
    "He’s a big lad, isn’t he?",
    "You just can't beat it!",
    "It’s all happening now!",
    "He’s got a wand of a left foot.",
    "He’s given it everything there!",
    "The atmosphere is electric!",
    "Absolutely top drawer!",
    "He’ll not want to see that again!",
    "The keeper’s done ever so well there.",
    "They’ve got to believe now!"
];

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function renderBingo() {
    const grid = document.getElementById('bingo-grid');
    grid.innerHTML = '';
    shuffle([...sayings]).forEach(saying => {
        const square = document.createElement('div');
        square.className = 'bingo-square';
        square.textContent = saying;
        square.onclick = () => {
            square.classList.toggle('active');
        };
        grid.appendChild(square);
    });
}

document.getElementById('reset-btn').onclick = () => {
    renderBingo();
};

renderBingo();
