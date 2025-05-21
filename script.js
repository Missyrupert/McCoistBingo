// --- Default Sayings ---
const defaultSayings = [
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

// --- App State ---
let sayings = [];
let customMode = false;
let soundOn = true;
let highContrast = false;

// --- Utility ---
function shuffle(arr) {
    let array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- Render the Bingo Board ---
function renderBingo(fromStorage=false) {
    let grid = document.getElementById('bingo-grid');
    grid.innerHTML = '';
    let usedSayings = sayings.length ? sayings : defaultSayings;
    let shuffled = shuffle(usedSayings);
    let activeStates = [];
    if (fromStorage) {
        try {
            const state = JSON.parse(localStorage.getItem('bingo-state'));
            if (state && state.activeStates && state.sayings) {
                shuffled = state.sayings;
                activeStates = state.activeStates;
            }
        } catch {}
    }
    shuffled.forEach((saying, idx) => {
        const square = document.createElement('div');
        square.className = 'bingo-square';
        square.setAttribute('tabindex', '0');
        square.setAttribute('role', 'gridcell');
        square.setAttribute('aria-label', saying);
        square.textContent = saying;
        if (fromStorage && activeStates[idx]) square.classList.add('active');
        square.onclick = square.onkeydown = (e) => {
            if (e.type === 'click' || e.key === ' ' || e.key === 'Enter') {
                square.classList.toggle('active');
                saveState();
                checkWin();
            }
        };
        grid.appendChild(square);
    });
    saveState();
}

// --- Save and Restore State ---
function saveState() {
    const squares = Array.from(document.querySelectorAll('.bingo-square'));
    const activeStates = squares.map(sq => sq.classList.contains('active'));
    const sayings = squares.map(sq => sq.textContent);
    localStorage.setItem('bingo-state', JSON.stringify({activeStates, sayings}));
    localStorage.setItem('bingo-settings', JSON.stringify({
        custom: customMode,
        customSayings: customMode ? sayings : null,
        soundOn,
        highContrast
    }));
}
function restoreSettings() {
    try {
        const settings = JSON.parse(localStorage.getItem('bingo-settings'));
        if (settings) {
            if (settings.custom && settings.customSayings) {
                sayings = settings.customSayings;
                customMode = true;
            }
            soundOn = settings.soundOn !== false;
            highContrast = !!settings.highContrast;
        }
    } catch {}
}

// --- Win Detection ---
function checkWin() {
    const squares = Array.from(document.querySelectorAll('.bingo-square'));
    const grid = [];
    const size = Math.sqrt(squares.length);
    for (let i = 0; i < squares.length; i += size) {
        grid.push(squares.slice(i, i + size));
    }
    let winType = "";
    // Rows
    for (let row of grid) {
        if (row.every(sq => sq.classList.contains('active'))) winType = "line";
    }
    // Columns
    for (let c = 0; c < size; c++) {
        if (grid.map(row => row[c]).every(sq => sq.classList.contains('active'))) winType = "line";
    }
    // Diagonals
    if (grid.map((row, i) => row[i]).every(sq => sq.classList.contains('active'))) winType = "line";
    if (grid.map((row, i) => row[size - 1 - i]).every(sq => sq.classList.contains('active'))) winType = "line";
    // Full House
    if (squares.every(sq => sq.classList.contains('active'))) winType = "full";
    if (winType === "full") {
        winCelebration("Bingo! Full House! 🎉");
    } else if (winType === "line") {
        winCelebration("Bingo! Line complete! 🎉");
    }
}

function winCelebration(msg) {
    confetti();
    if (soundOn) document.getElementById('win-audio').play();
    setTimeout(() => {
        alert(msg);
    }, 80);
}

// --- Confetti (minimal, pure JS) ---
function confetti() {
    for(let i=0; i<45; i++) {
        let conf = document.createElement('div');
        conf.innerHTML = '🎊';
        conf.style.position = 'fixed';
        conf.style.left = (Math.random()*100) + 'vw';
        conf.style.
