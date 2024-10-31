// Game state variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning conditions (index patterns for a win)
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// HTML elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

// Initialize game
function initGame() {
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) {
        return;
    }

    updateBoard(cell, index);
    checkResult();
}

// Update board and switch players
function updateBoard(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check result for win, draw, or ongoing
// Check result for win, draw, or ongoing
function checkResult() {
    let roundWon = false;
    let winningCells = [];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer === "X" ? "O" : "X"} wins!`;
        gameActive = false;
        
        // Add the 'win' class to each winning cell
        winningCells.forEach(index => cells[index].classList.add("win"));
    } else if (!board.includes("")) {
        cells.forEach(cell => {
            cell.classList.add("draw");// Remove 'win' class from all cells
        });
        statusText.textContent = "It's a draw!";
        gameActive = false;
    }
}

// Reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
        cell.classList.remove("draw");// Remove 'win' class from all cells
    });
    
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}




// Start the game
initGame();
