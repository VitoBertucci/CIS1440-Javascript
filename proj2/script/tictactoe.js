document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const currentTurnDisplay = document.getElementById("current-turn");
    const gameResultDisplay = document.getElementById("game-result");
    const startRestartButton = document.getElementById("start-restart");
    const playerVsPlayerRadio = document.getElementById("player-vs-player");
    const playerVsComputerRadio = document.getElementById("player-vs-computer");

    //set game state
    let currentPlayer = Math.random() < 0.5 ? "X" : "O";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    //define win conditions
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

    //computer turn logic for player v. computer
    function computerMove() {
        //check for empty cells
        let availableIndices = gameState
            .map((val, index) => (val === "" ? index : null))
            .filter((val) => val !== null);
        //choose random cell
        if (availableIndices.length > 0) {
            let randomIndex =
                availableIndices[
                    Math.floor(Math.random() * availableIndices.length)
                ];
            //fill cell with player sign
            gameState[randomIndex] = currentPlayer;
            cells[randomIndex].textContent = currentPlayer;
            cells[randomIndex].classList.remove("symbol-x", "symbol-o");
            cells[randomIndex].classList.add(
                currentPlayer === "X" ? "symbol-x" : "symbol-o"
            );
            checkResult();
            switchPlayer();
        }
    }

    //cell clicking logic
    function handleCellClick(event) {
        //parse cell info on click
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(
            clickedCell.getAttribute("data-index")
        );

        //check if cell is already filled or game is not active
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        //fill cell with player sign
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.remove("symbol-x", "symbol-o");
        clickedCell.classList.add(
            currentPlayer === "X" ? "symbol-x" : "symbol-o"
        );

        //check for result
        checkResult();
        switchPlayer();

        //check if computer is playing
        if (
            gameActive &&
            playerVsComputerRadio.checked &&
            currentPlayer === "O"
        ) {
            // delay for computer move
            setTimeout(computerMove, 500);
        }
    }

    //sign switching logic
    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentTurnDisplay.textContent = `it's ${currentPlayer}'s turn`;
    }

    //game end checking logic
    function checkResult() {
        let roundWon = false;
        let winningCombination = null;

        //check for winning conditions
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (
                gameState[a] &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                roundWon = true;
                winningCombination = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            //h winning cells with color based on winner
            const winClass = currentPlayer === "X" ? "winning-x" : "winning-o";
            winningCombination.forEach((index) => {
                cells[index].classList.add("winning-cell", winClass);
            });

            gameResultDisplay.textContent = `${currentPlayer} wins!`;
            gameResultDisplay.style.display = "block";
            startRestartButton.textContent = "Play Again?";
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            gameResultDisplay.textContent = "Tie Game!";
            gameResultDisplay.style.display = "block";
            startRestartButton.textContent = "Play Again?";
            gameActive = false;
            return;
        }
    }

    function resetGame() {
        currentPlayer = Math.random() < 0.5 ? "X" : "O";
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove(
                "winning-cell",
                "winning-x",
                "winning-o",
                "symbol-x",
                "symbol-o"
            );
        });
        currentTurnDisplay.textContent = `it's ${currentPlayer}'s turn`;
        gameResultDisplay.style.display = "none";
        startRestartButton.textContent = "Start/Restart";

        if (playerVsComputerRadio.checked && currentPlayer === "O") {
            //delay for computer move
            setTimeout(computerMove, 500);
        }
    }

    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    startRestartButton.addEventListener("click", resetGame);
});
