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
  const randomNumber = [];
  const boardResult = board.getBoard();
  let h2 = document.querySelector("h2");
  console.log(player, computer);

  const playerMove = () => {

    document.querySelectorAll(".boxes").forEach((box) => {

      box.addEventListener("click", () => {
        if (box.textContent === "") {
          const dataSet = box.dataset.set;

          board.playerMove(dataSet, player);

          box.textContent = player;

          h2.textContent = "Computer's turn"
          console.log(boardResult);

          if (getWinner()) {
            return;
          } else {
            setTimeout(() => {
              computerMove();
            }, "1000");
            getWinner();
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
      h2.textContent = "Your move?"
      console.log(boardResult);
      if (getWinner()) {
        return;
      } else {
        getWinner();
      }
    }
  };

  const computerMove = () => {
    if (board.arrValueLength() != 9) {
      computerTurn();
    }
  };

  const getWinner = () => {
    if (board.arrValueLength() === 9) {
      h2.textContent = "Draw!"
    } else {
      if (boardResult[0] === player && boardResult[1] === player && boardResult[2] === player ||
          boardResult[3] === player && boardResult[4] === player && boardResult[5] === player ||
          boardResult[6] === player && boardResult[7] === player && boardResult[8] === player ||
          boardResult[0] === player && boardResult[3] === player && boardResult[6] === player ||
          boardResult[1] === player && boardResult[4] === player && boardResult[7] === player ||
          boardResult[2] === player && boardResult[5] === player && boardResult[8] === player ||
          boardResult[0] === player && boardResult[4] === player && boardResult[8] === player ||
          boardResult[2] === player && boardResult[4] === player && boardResult[6] === player
      ) {
        h2.textContent = "You Win!! Congrats";
        return true;
      }
    }
  };

  

  return { board, computerMove, playerMove, getWinner };
}

function ScreenController() {
  let player1 = "";
  let player2 = "";

  let startGame = GameController(player1, player2);
  let h2 = document.querySelector("h2");

  document.querySelectorAll(".selectors").forEach((selector) => {
    selector.addEventListener("click", () => {
      if (selector.textContent === "O") {
        player1 = "O";
        player2 = "X";

        startGame = GameController(player1, player2);
      } else if (selector.textContent === "X") {
        player1 = "X";
        player2 = "O";

        startGame = GameController(player1, player2);
      }

      const h2 = document.querySelector("h2");

      if (player1 === "X") {
        startGame.playerMove();
        h2.textContent = "Make your first move!";
      } else {
        h2.textContent = "Computer's first move!";
        setTimeout(() => {
          startGame.computerMove();
        }, "1000");
        startGame.playerMove();
      }
      
    });
  });

  return { startGame };
}

ScreenController();
