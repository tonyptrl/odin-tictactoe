// Gameboard

const gameboard = (function() {
  const board = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"]
  ];

  return {
    displayGameboard: function() {
      board.forEach((row) => console.log(row));
    },
    getBoard: function() {
      return board;
    }
  };
})();


// Players

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


// GameController

const gameController = (function() {
  const makeMove = (position, marker) => {
    let row = "";
    let column = "";

    const board = gameboard.getBoard();

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === position.toString()) {
          row = i;
          column = j;
        };
      };
    };
    board[row][column] = marker;
    gameboard.displayGameboard();
  };

  return {
    makeMove,
  };
})();


// Actions

gameboard.displayGameboard();
gameController.makeMove("5", "O");
gameController.makeMove("3", "X");