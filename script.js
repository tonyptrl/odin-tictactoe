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
  let player1Input = "Tony"; //prompt(`Player 1 (Using "X") : What's your name?`);
  let player2Input = "Arnaud"; //prompt(`Player 2 (Using "O") : What's your name?`);

  let player1 = {
      name: player1Input || "Player 1",
      marker: "X",
    };

    let player2 = {
      name: player2Input || "Player 2",
      marker: "O",
    };

  return {
    player1,
    player2,
  }
})();


// GameController

const gameController = (function() {
  const makeMove = (position, marker) => {
    let row = null;
    let column = null;

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