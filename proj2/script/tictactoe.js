document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const currentTurnDisplay = document.getElementById("current-turn");
    const gameResultDisplay = document.getElementById("game-result");
    const startRestartButton = document.getElementById("start-restart");
    const playAgainButton = document.getElementById("play-again");
    const playerVsPlayerRadio = document.getElementById("player-vs-player");
    const playerVsComputerRadio = document.getElementById("player-vs-computer");

    let currentPlayer = Math.random() < 0.5 ? "X" : "O";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function computerMove() {
        let availableIndices = gameState
            .map((val, index) => (val === "" ? index : null))
            .filter((val) => val !== null);
        if (availableIndices.length > 0) {
            let randomIndex =
                availableIndices[
                    Math.floor(Math.random() * availableIndices.length)
                ];
            gameState[randomIndex] = currentPlayer;
            cells[randomIndex].textContent = currentPlayer;
            checkResult();
            switchPlayer();
        }
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(
            clickedCell.getAttribute("data-index")
        );

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkResult();
        switchPlayer();

        if (
            gameActive &&
            playerVsComputerRadio.checked &&
            currentPlayer === "O"
        ) {
            setTimeout(computerMove, 500); // delay for computer move
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentTurnDisplay.textContent = `it's ${currentPlayer}'s turn`;
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (
                gameState[a] &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameResultDisplay.textContent = `${currentPlayer} wins!`;
            gameResultDisplay.style.display = "block";
            playAgainButton.style.display = "block";
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            gameResultDisplay.textContent = "Tie Game!";
            gameResultDisplay.style.display = "block";
            playAgainButton.style.display = "block";
            gameActive = false;
            return;
        }
    }

    function resetGame() {
        currentPlayer = Math.random() < 0.5 ? "X" : "O";
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell) => (cell.textContent = ""));
        currentTurnDisplay.textContent = `it's ${currentPlayer}'s turn`;
        gameResultDisplay.style.display = "none";
        playAgainButton.style.display = "none";

        if (playerVsComputerRadio.checked && currentPlayer === "O") {
            setTimeout(computerMove, 500); // delay for computer move
        }
    }

    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    startRestartButton.addEventListener("click", resetGame);
    playAgainButton.addEventListener("click", resetGame);
});
