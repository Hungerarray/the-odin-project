playGame();

const scores = {
  player: 0,
  computer: 0,
};
const bottom = document.querySelector("#bottom");

function playGame() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", playerInput));
}

function stopGame() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.removeEventListener("click", playerInput));

  addReset();
}

function addReset() {
  const reset = document.createElement("p");
  reset.textContent = "Play Again?";
  reset.classList.add("reset");
  bottom.appendChild(reset);

  reset.addEventListener("click", gameReset);
}

function gameReset() {
  const reset = document.querySelector(".reset");
  bottom.removeChild(reset);

  scores.player = 0;
  scores.computer = 0;
  document.querySelector("#player").classList.remove("winner", "looser");
  document.querySelector("#computer").classList.remove("winner", "looser");
  updateScreen();

  playGame();
}
function computerPlay() {
  const num = Math.ceil(Math.random() * 3);
  switch (num) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    dispDraw();
    return "draw";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return "player";
  }
  return "computer";
}

function dispDraw() {
  const disp = document.createElement("p");
  disp.classList.add("draw");
  disp.textContent = "Draw!";
  bottom.appendChild(disp);
  setTimeout(() => bottom.removeChild(disp), 500);
}

function updateScore(message) {
  if (message === "player") scores.player++;
  else if (message === "computer") scores.computer++;
}

function checkEnd() {
  if (scores.player !== 5 && scores.computer !== 5) return;

  stopGame();
  const player = document.querySelector("#player");
  const computer = document.querySelector("#computer");

  if (scores.player === 5) {
    player.classList.add("winner");
    computer.classList.add("looser");
  } else {
    player.classList.add("looser");
    computer.classList.add("winner");
  }
}

function updateScreen() {
  const player = document.querySelector("#player");
  const computer = document.querySelector("#computer");

  player.textContent = "Player: " + scores.player;
  computer.textContent = "Computer: " + scores.computer;
}

function game(playerSelection) {
  const computerSelection = computerPlay();
  const status = playRound(playerSelection, computerSelection);
  updateScore(status);
  checkEnd();
  updateScreen();
}

function playerInput(e) {
  const inp = e.target.alt;
  game(inp);
}
