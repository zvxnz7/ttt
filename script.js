let gridSize = 5;
let coins = 10000;
let betAmount = 100;
let safeSpots = [];
let uncoveredSpots = [];
let bombsCount = 5;

function initializeGame() {
    uncoveredSpots = [];
    safeSpots = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    safeSpots.sort(() => Math.random() - 0.5);
    safeSpots = safeSpots.slice(0, gridSize * gridSize - bombsCount);
    renderBoard();
    updateCoinsDisplay();
}

function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

function updateCoinsDisplay() {
    document.getElementById('coins').innerText = `Coins: ${coins}`;
}

function handleCellClick(index) {
    if (uncoveredSpots.includes(index)) return;

    uncoveredSpots.push(index);
    if (safeSpots.includes(index)) {
        coins += betAmount;
        document.querySelectorAll('.cell')[index].classList.add('safe');
    } else {
        coins -= betAmount;
        document.querySelectorAll('.cell')[index].classList.add('bomb');
    }

    updateCoinsDisplay();
    checkGameOver();
}

function checkGameOver() {
    if (coins <= 0) {
        alert("Game over! You've run out of coins.");
        initializeGame();
    } else if (uncoveredSpots.length === gridSize * gridSize - bombsCount) {
        alert("Congratulations! You've uncovered all safe spots.");
        initializeGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    document.getElementById('betForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const betInput = document.getElementById('betAmount');
        betAmount = parseInt(betInput.value) || 100;
        betInput.value = '';
    });
});