// Make bingo squares toggle when clicked
document.querySelectorAll('.bingo-square').forEach(square => {
    square.addEventListener('click', () => {
        square.classList.toggle('active');
    });
});

// Reset button clears all marked squares
document.getElementById('reset-btn').onclick = () => {
    document.querySelectorAll('.bingo-square').forEach(square => square.classList.remove('active'));
};
