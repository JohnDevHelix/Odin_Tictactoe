function Gameboard() {
  const boardArray = [];

  const playerMove = (array, marker) => {
    boardArray[array] = marker;
  };

  const getBoard = () => boardArray;

  return { getBoard, playerMove };
}

function GameController(player, computer) {
  const board = Gameboard();
  const randomNumber = [];
  const randomBoard = board.getBoard();
  let randomLength = randomBoard.reduce((x, y) => (y ? x + 1 : x), 0);
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
      console.log(board.getBoard());
    }
  };

  const getWinner = () => {
    
  };

  return { board, players, computerTurn };
}

function ScreenController() {
  let player1 = "X";
  let player2 = "O";
  console.log(player1, player2);

  let startGame = GameController(player1, player2);

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

      const boardMove = startGame.board;

      document.querySelectorAll(".boxes").forEach((box) => {
        box.addEventListener("click", () => {
          const dataSet = box.dataset.set;
          console.log(dataSet);

          boardMove.playerMove(dataSet, player1);
          console.log(boardMove.getBoard());

          box.textContent = player1;

          setTimeout(() => {
            startGame.computerTurn();
          }, "1000");
        });
      });
    });
  });

  return { startGame };
}

ScreenController();
