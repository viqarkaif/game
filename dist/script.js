const gameBoard = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const newGameButton = document.getElementById("newGameButton");
let board = Array(9).fill(null); // Board array
let currentPlayer = "X"; // Track current player
let gameActive = true; // Track game state

// Render the game board
function renderBoard() {
    gameBoard.innerHTML = ""; // Clear the board
    board.forEach((cell, index) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerText = cell;
        square.addEventListener("click", () => handleSquareClick(index));
        gameBoard.appendChild(square);
    });
}

// Handle square clicks
function handleSquareClick(index) {
    if (board[index] || !gameActive) return; // Ignore if square is taken or game is over
    board[index] = currentPlayer; // Update board
    checkGameStatus(); // Check the game status
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    renderBoard(); // Render the updated board
    updateStatus(); // Update status display
}

// Check game status for win or draw
function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let roundWon = false;
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        statusDisplay.innerText = `Player ${currentPlayer} wins!`;
        return;
    }

    if (!board.includes(null)) {
        gameActive = false;
        statusDisplay.innerText = "It's a draw!";
    }
}

// Update the status display
function updateStatus() {
    if (gameActive) {
        statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    }
}

// New game button event listener
newGameButton.addEventListener("click", () => {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.innerText = "Player X's turn";
    renderBoard(); // Reset and render the board
});

// Initial render
renderBoard();