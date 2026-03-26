const board = document.getElementById("board");
const status = document.getElementById("status");
let turn = "X";
let gameEnded = false;
let moves = 0;

// Initialize board
const cells = Array.from({ length: 9 }, (_, i) => {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i + 1;
  board.appendChild(cell);
  return cell;
});

// Handle cell clicks
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!cell.textContent && !gameEnded) {
      cell.textContent = turn;
      cell.classList.add("taken");
      moves++;
      checkWinner();
      if (!gameEnded) {
        turn = turn === "X" ? "O" : "X";
        status.textContent = `Player ${turn === "X" ? 1 : 2}'s turn (${turn})`;
      }
    }
  });
});

// Check for winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  winPatterns.forEach(pattern => {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameEnded = true;
      pattern.forEach(index => cells[index].classList.add("winner"));
      status.textContent = `Game Over! Player ${turn === "X" ? 1 : 2} (${turn}) Wins!`;
    }
  });

  // Check for draw
  if (moves === 9 && !gameEnded) {
    gameEnded = true;
    status.textContent = "Game Over! It's a Draw!";
  }
}

// Restart game
function restartGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken", "winner");
  });
  turn = "X";
  gameEnded = false;
  moves = 0;
  status.textContent = "Player 1's turn (X)";
}
