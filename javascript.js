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

  const players = [
    {
      name1: "Player One",
      marker1: player,
    },
    {
      name2: "Player Two",
      marker2: computer,
    },
  ];

  const computerTurn = () => {
    let random = Math.floor(Math.random() * 9);

    if (boardResult[random] != null) {
      computerTurn();
    } else {
      document.querySelector('[data-set="' + random + '"]').textContent =
        computer;
      board.playerMove(random, computer);
      console.log(boardResult);
      board.arrValueLength();
      getWinner();
    }
  };

  const computerMove = () => {
    if (board.arrValueLength() != 9) {
      computerTurn();
    }
  };

  const h2 = document.querySelector("h2");

  const getWinner = () => {
    if (board.arrValueLength() === 9) {
      h2.textContent = "Draw! Try Again.";
    }
  };

  return { board, players, computerMove, getWinner };
}

function ScreenController() {
  let player1 = "X";
  let player2 = "O";
  console.log(player1, player2);

  let startGame = GameController(player1, player2);

  const playerMove = () => {
    const boardMove = startGame.board;

    document.querySelectorAll(".boxes").forEach((box) => {
      box.addEventListener("click", () => {
        if (box.textContent === "") {
          const dataSet = box.dataset.set;
          console.log(dataSet);

          boardMove.playerMove(dataSet, player1);
          console.log(boardMove.getBoard());

          box.textContent = player1;

          setTimeout(() => {
            startGame.computerMove();
          }, "1000");

          startGame.getWinner();
        }
      });
    });
  };

  document.querySelectorAll(".selectors").forEach((selector) => {
    selector.addEventListener("click", () => {
      if (selector.textContent === "O") {
        player1 = "O";
        player2 = "X";
        console.log(player1, player2);

        startGame = GameController(player1, player2);
      } else if (selector.textContent === "X") {
        player1 = "X";
        player2 = "O";
        console.log(player1, player2);

        startGame = GameController(player1, player2);
      }

      if (player1 === "X") {
        playerMove();
      } else {
        startGame.computerMove();
        playerMove();
      }
    });
  });

  return { startGame };
}

ScreenController();
