let gridSize = 5;
let coins = 10000;
let betAmount = 100; // Default bet per attempt
let safeSpots = [];
let uncoveredSpots = [];
let bombsCount = 5;

// Initialize board and bombs
function initializeGame() {
    // Reset game variables
    uncoveredSpots = [];
    safeSpots = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    safeSpots.sort(() => Math.random() - 0.5);
    safeSpots = safeSpots.slice(0, gridSize * gridSize - bombsCount);
    coins = 10000;
    
    renderBoard();
    updateCoinsDisplay();
}

// Function to render the 5x5 grid
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

// Update coins display
function updateCoinsDisplay() {
    document.getElementById('coins').innerText = `Coins: ${coins}`;
}

// Handle cell click
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

// Check if the game is over
function checkGameOver() {
    if (coins <= 0) {
        alert("Game over! You've run out of coins.");
        initializeGame();
    } else if (uncoveredSpots.length === gridSize * gridSize - bombsCount) {
        alert("Congratulations! You've uncovered all safe spots.");
        initializeGame();
    }
}

// Initialize game on load
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    document.getElementById('betForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const betInput = document.getElementById('betAmount');
        betAmount = parseInt(betInput.value) || 100;
        betInput.value = '';
    });
});