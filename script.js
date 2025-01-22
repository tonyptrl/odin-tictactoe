const gameboard = (function() {
  return [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"]
  ];
})();

function displayGameboard() {
  gameboard.forEach((row) => console.log(row));
};

displayGameboard();

const players = (function() {
  return {
    player1: {
      name: "Tony",
      marker: "X"
    },
    player2: {
      name: "Arnaud",
      marker: "O"
    }
  };
})();

const gameController = (function() {
  const makeMove = (position, marker) => {
    let row = "";
    let column = "";
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        if (gameboard[i][j] === position.toString()) {
          row = i;
          column = j;
        };
      };
    };
    gameboard[row][column] = marker;
    displayGameboard();
  };

  return {
    makeMove,
  };
})();

gameController.makeMove("5", "O");
gameController.makeMove("3", "X");