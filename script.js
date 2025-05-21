// All sayings in an array
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

// Randomly shuffle the array (Fisher-Yates)
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Render the shuffled bingo grid
function renderBingo() {
    const grid = document.getElementById('bingo-grid');
    grid.innerHTML = '';
    shuffle([...sayings]).forEach(saying => {
        const square = document.createElement('div');
        square.className = 'bingo-square';
        square.textContent = saying;
        square.onclick = () => {
            square.classList.toggle('active');
            checkWin();
        };
        grid.appendChild(square);
    });
}

// Check for full house (all squares marked)
function checkWin() {
    const squares = document.querySelectorAll('.bingo-square');
    const allMarked = Array.from(squares).every(sq => sq.classList.contains('active'));
    if (allMarked) {
        setTimeout(() => {
            // Add confetti effect (optional, simple)
            confetti();
            alert("Bingo! Full House! 🎉");
        }, 120);
    }
}

// Reset card
document.getElementById('reset-btn').onclick = () => {
    renderBingo();
};

// Info/help
document.querySelector('.info-icon').onclick = () => {
    alert("How to play:\n\nTap each square when Ally says it. Mark every square for a Full House!\n\nReset Card makes a new random card.");
};

// Basic confetti (minimal, pure JS)
function confetti() {
    for(let i=0; i<60; i++) {
        let conf = document.createElement('div');
        conf.innerHTML = '🎊';
        conf.style.position = 'fixed';
        conf.style.left = (Math.random()*100) + 'vw';
        conf.style.top = '-3em';
        conf.style.fontSize = (Math.random()*24+16) + 'px';
        conf.style.zIndex = 9999;
        conf.style.transition = 'top 1.4s linear';
        document.body.appendChild(conf);
        setTimeout(() => {
            conf.style.top = '110vh';
        }, 20);
        setTimeout(() => {
            conf.remove();
        }, 1450);
    }
}

// Initial card render
renderBingo();
