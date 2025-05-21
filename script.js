<script>
document.querySelectorAll('.bingo-square').forEach(square => {
    square.addEventListener('click', () => {
        square.classList.toggle('active');
    });
});
document.getElementById('reset-btn').onclick = () => {
    document.querySelectorAll('.bingo-square').forEach(square => square.classList.remove('active'));
};
</script>
