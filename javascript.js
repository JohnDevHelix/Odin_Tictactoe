function Gameboard() {
  const boardArray = [];

  const playerMove = (array, marker) => {
    boardArray[array] = marker;
  };

  const getBoard = () => boardArray;

  const arrValueLength = () =>
    getBoard().reduce((acc, cv) => (cv ? acc + 1 : acc), 0);

  return { getBoard, playerMove, arrValueLength };
}

function GameController(player, computer) {
  const board = Gameboard();
  const boardResult = board.getBoard();
  let h2 = document.querySelector("h2");

  // new game button
  const resetButton = document.createElement("button");
  resetButton.textContent = "New Game?";
  resetButton.classList.add("resetButton");
  const selectorBox = document.querySelector(".selector-box");
  const resetGame = () => {
    selectorBox.innerHTML = "";
    selectorBox.appendChild(resetButton);
  };

  // toggle div click
  const toggleButtons = (state) => {
    document.querySelectorAll(".boxes").forEach((box) => {
      box.style.pointerEvents = state ? "auto" : "none";
    });
  };

  const playerMove = () => {
    document.querySelectorAll(".boxes").forEach((box) => {
      box.addEventListener("click", (event) => {
        if (box.textContent === "") {
          const dataSet = box.dataset.set;
          board.playerMove(dataSet, player);
          box.textContent = player;
          h2.textContent = "Computer's turn";
          toggleButtons(false);

          if (getWinner(boardResult, player)) {
            return;
          } else {
            setTimeout(() => {
              computerMove();
              toggleButtons(true);
            }, "1000");
            getWinner(boardResult, computer);
          }
        }
      });
    });
  };

  const computerTurn = () => {
    let random = Math.floor(Math.random() * 9);

    if (boardResult[random] != null) {
      computerTurn();
    } else {
      document.querySelector('[data-set="' + random + '"]').textContent =
        computer;
      board.playerMove(random, computer);
      board.arrValueLength();
      h2.textContent = "Your move?";

      if (getWinner(boardResult, computer)) {
        return;
      }
    }
  };

  const computerMove = () => {
    if (board.arrValueLength() != 9) {
      computerTurn();
    }
  };

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

  const getWinner = (result, marker) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        boardResult[a] === marker &&
        boardResult[b] === marker &&
        boardResult[c] === marker
      ) {
        toggleButtons(false);
        h2.textContent = marker === player ? "You Win!" : "You Lose!";
        resetGame();

        return true;
      }
    }
    if (board.arrValueLength() === 9) {
      h2.textContent = "Draw!";
      resetGame();
      return true;
    } else {
      return false;
    }
  };

  // remove old instance and event listeners
  const buttons = document.createElement("button");
  buttons.classList.add("buttons");

  function newGame() {
    resetButton.remove();
    boardResult.length = 0;
    document.querySelectorAll(".boxes").forEach((box) => {
      const newBox = box.cloneNode(true);
      newBox.textContent = "";
      box.parentNode.replaceChild(newBox, box);
    });
    h2.textContent = "Select your marker";
    ScreenController();
  }

  resetButton.addEventListener("click", newGame);

  return {
    computerMove,
    playerMove,
    toggleButtons,
  };
}

function ScreenController() {
  // create selectors
  const divButton = document.createElement("div");
  divButton.classList.add("selectors");
  divButton.id = "X";
  const divButton2 = document.createElement("div");
  divButton2.classList.add("selectors");
  divButton2.id = "O";
  const buttonSelector = document.createElement("button");
  buttonSelector.textContent = "X";
  const buttonSelector2 = document.createElement("button");
  buttonSelector2.textContent = "O";
  buttonSelector.classList.add("buttonSelector");
  buttonSelector2.classList.add("buttonSelector");
  const selectorBox = document.querySelector(".selector-box");

  selectorBox.appendChild(divButton);
  divButton.appendChild(buttonSelector);
  selectorBox.appendChild(divButton2);
  divButton2.appendChild(buttonSelector2);

  let player1 = "";
  let player2 = "";

  let startGame = GameController(player1, player2);
  let h2 = document.querySelector("h2");
  const marker1 = document.querySelector("#X");
  const marker2 = document.querySelector("#O");

  document.querySelectorAll(".selectors").forEach((selector) => {
    selector.addEventListener("click", () => {
      if (selector.textContent === "O") {
        player1 = "O";
        player2 = "X";

        marker1.textContent = "Computer - " + player2;
        marker2.textContent = "Player - " + player1;

        startGame = GameController(player1, player2);

        startGame.toggleButtons(false);

        h2.textContent = "Computer's first move!";

        setTimeout(() => {
          startGame.computerMove();
          startGame.toggleButtons(true);
        }, "1000");

        startGame.playerMove();
      } else if (selector.textContent === "X") {
        player1 = "X";
        player2 = "O";

        marker1.textContent = "Player - " + player1;
        marker2.textContent = "Computer - " + player2;

        startGame = GameController(player1, player2);
        startGame.playerMove();
        h2.textContent = "Make your first move!";
        startGame.toggleButtons(true);
      }
    });
  });

  return {};
}

ScreenController();
