const sayings = [
    "Uv goty say",
    "He’ll be disappointed with that Fletch.",
    "He's got tae score",
    "Ul be honest wi ye",
    "You couldn't write the script!",
    "It's a real privilege to be here Fletch",
    "He’s a big lad, isn’t he?",
    "He's got to do better there Fletch",
    "It’s all happening now!",
    "That's a great save...a great save",
    "It's the weight of the pass",
    "The atmosphere is electric!",
    "That's absolutely top drawer!",
    "Ul tell ye something",
    "The keeper’s done ever so well there.",
    "I'm a fat Orange annoyingly repetitive cunt"
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

// Initial render
renderBingo();
