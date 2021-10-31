function GameBoard() {
  let board = new Array(9);
  let freeSpace = 9;

  function setField(indx, sign) {
    board[indx] = sign;
    freeSpace--;
  }

  function isFree() {
    return freeSpace <= 0;
  }

  function isValidField(indx) {
    return board[indx] === undefined;
  }

  function clear() {
    board = new Array(9);
		freeSpace = 9;
  }

  function getBoard() {
    return board;
  }

  return {
    setField,
    isValidField,
    clear,
    getBoard,
		isFree,
  };
}

function Player(marker) {
  const sign = marker;

  function getSign() {
    return sign;
  }

  return {
    getSign,
  };
}

function Backdrop() {
  const backdrop = document.querySelector("#backDrop");

  function showBackdrop(value) {
    const state = value ? "visible" : "hidden";
    backdrop.style.visibility = state;
  }

  function displayContent(content) {
    backdrop.textContent = "";
    backdrop.appendChild(content);
  }

  return {
    showBackdrop,
    displayContent,
  };
}

const game = (function GameMaker() {
  const STATE = {
    fieldSet: "fieldSet",
    display: "display",
    won: "won",
    reset: "reset",
    draw: "draw",
  };

  const gameBoard = GameBoard();
  const players = [Player("X"), Player("O")];
  const backdrop = Backdrop();
  let currPlayer = players[0];

  function renderBox() {
    const displayBoard = document.querySelector("#gameBoard");
    const board = gameBoard.getBoard();
    displayBoard.textContent = "";

    for (let [indx, sign] of board.entries()) {
      const newBox = Box(indx, sign);
      displayBoard.appendChild(newBox);
    }
  }

  function Box(indx, sign) {
    const obj = document.createElement("div");
    obj.classList.add("box");
    obj.id = indx;
    obj.textContent = sign || "";
    obj.addEventListener("click", boxClickHandler);
    return obj;
  }

  function boxClickHandler(event) {
    const box = event.currentTarget;
    if (gameBoard.isValidField(box.id)) {
      gameBoard.setField(box.id, currPlayer.getSign());
      run(STATE.fieldSet);
      box.textContent = currPlayer.getSign();
      box.classList.add("box-disabled");
    }
  }

  function switchPlayer() {
    currPlayer = currPlayer === players[0] ? players[1] : players[0];
  }

  function winCheck() {
    const board = gameBoard.getBoard();
    const winMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let move of winMoves) {
      const test =
        board[move[0]] !== undefined &&
        board[move[0]] === board[move[1]] &&
        board[move[1]] === board[move[2]];
      if (test) {
        return true;
      }
    }
    return false;
  }

  function run(state) {
    switch (state) {
      case STATE.fieldSet:
        winCheck() && run(STATE.won);
        gameBoard.isFree() && run(STATE.draw);
        switchPlayer();
        break;
      case STATE.display:
        renderBox();
        break;
      case STATE.won:
        backdrop.showBackdrop(true);
        const vicContent = victoryMessage();
        backdrop.displayContent(vicContent);
        break;
			case STATE.draw:
				backdrop.showBackdrop(true);
				const drawContent = drawMessage();
				backdrop.displayContent(drawContent);
				break;
      case STATE.reset:
        gameBoard.clear();
        currPlayer = players[0];
        backdrop.showBackdrop(false);
        renderBox();
        break;
      default:
        console.log(`Invalid state ${state}`);
        break;
    }
  }

  function victoryMessage() {
		const message = `${currPlayer.getSign()} won!`;
    return messageBox(message);
  }

	function drawMessage() {
		const message = "It's a Draw!";
		return messageBox(message);
	}

	function messageBox(message) {
		const msg = document.createElement("p");
		msg.textContent = message;
		msg.classList.add("message-text");
		const rstBtn = document.createElement("button");
		rstBtn.textContent = "Reset";
		rstBtn.classList.add("message-button");
		rstBtn.addEventListener("click", resetHandler);

		const container = document.createElement("div");
		container.appendChild(msg);
		container.appendChild(rstBtn);
		container.classList.add("message");
		return container;

		function resetHandler() {
			run(STATE.reset);
		}
	}

  function start() {
    run(STATE.display);
  }

  return {
    start,
  };
})();

game.start();
