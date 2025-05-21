const sayings = [
  "It's a game of two halves!",
  "He’s given it everything there!",
  "Unbelievable, Jeff!",
  "He’ll be disappointed with that.",
  "You couldn't write the script!",
  "He’s a big lad, isn’t he?",
  "The atmosphere is electric!",
  "It’s all happening now!",
  "He’s got a wand of a left foot.",
  "That's what football's all about!",
  "The keeper’s done ever so well there.",
  "He’ll not want to see that again!",
  "You just can't beat it!",
  "Absolutely top drawer!",
  "He’s having the time of his life!",
  "They’ve got to believe now!"
];

let cardSayings = [];
let marked = Array(16).fill(false);

function shuffle(arr) {
  let a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderCard() {
  const card = document.getElementById('bingo-card');
  card.innerHTML = '';
  cardSayings.forEach((saying, idx) => {
    const sq = document.createElement('button');
    sq.className = 'square' + (marked[idx] ? ' marked' : '');
    sq.type = "button";
    sq.tabIndex = 0;
    sq.setAttribute('aria-pressed', marked[idx] ? "true" : "false");
    sq.textContent = saying;
    sq.addEventListener('click', () => toggleSquare(idx));
    card.appendChild(sq);
  });
}

function toggleSquare(idx) {
  marked[idx] = !marked[idx];
  renderCard();
  checkWin();
}

function checkWin() {
  const card = document.getElementById('bingo-card');
  const squares = card.children;
  let winLines = [];
  // Rows
  for (let r = 0; r < 4; r++) {
    const base = r * 4;
    if (marked[base] && marked[base+1] && marked[base+2] && marked[base+3]) winLines.push([base,base+1,base+2,base+3]);
  }
  // Columns
  for (let c = 0; c < 4; c++) {
    if (marked[c] && marked[c+4] && marked[c+8] && marked[c+12]) winLines.push([c,c+4,c+8,c+12]);
  }
  // Diagonals
  if (marked[0] && marked[5] && marked[10] && marked[15]) winLines.push([0,5,10,15]);
  if (marked[3] && marked[6] && marked[9] && marked[12]) winLines.push([3,6,9,12]);
  // Full house
  if (marked.every(x => x)) {
    winLines = [[...Array(16).keys()]];
    document.getElementById('message').textContent = 'FULL HOUSE! 👑';
  } else if (winLines.length > 0) {
    document.getElementById('message').textContent = 'LINE! 🎉';
  } else {
    document.getElementById('message').textContent = '';
  }
  // Highlight winning squares
  for (const line of winLines) {
    for (const idx of line) {
      squares[idx].classList.add('winning');
    }
  }
}

function resetCard() {
  cardSayings = shuffle(sayings);
  marked = Array(16).fill(false);
  document.getElementById('message').textContent = '';
  renderCard();
}

document.getElementById('reset-btn').addEventListener('click', resetCard);

resetCard();
