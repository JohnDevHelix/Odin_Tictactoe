function gameboard (move) {
  const boardArray = [];
  const playerMove = move;

  const gameMove = (dataSet, move) => {
    boardArray[dataSet] = move;
  }

  return { boardArray, gameMove, playerMove };
}

function player (marker) {
    const playerOne = marker;

    return { playerOne };
}

function computer (marker) {
    const playerTwo = marker;

    return { playerTwo };
}

document.querySelectorAll(".selectors").forEach((selector) => {
    selector.addEventListener("click", () => {
        if (selector.textContent === "X") {
            const player1 = player("X");
            const player2 = computer("O");
            console.log(player1, player2);
        } else if (selector.textContent === "O") {
            const player1 = player("O");
            const player2 = computer("X");
            console.log(player1, player2);            
        }
    })
})