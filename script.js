// Players

const players = (function() {
  let player1Name = "Tony"; //prompt(`Player 1 (Using "X") : What's your name?`);
  let player2Name = "Arnaud"; //prompt(`Player 2 (Using "O") : What's your name?`);

  let player1 = {
      name: player1Name || "Player 1",
      marker: "X",
    };

    let player2 = {
      name: player2Name || "Player 2",
      marker: "O",
    };

  return {
    player1,
    player2,
  }
})();


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
          break;
        };
      };
    };

    if (row === null || column === null) {
      console.log("Invalid position. Please choose a valid position.");
      return;
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
console.log(`${players.player1.name}'s Turn`);
gameController.makeMove("5", players.player1.marker);
console.log(`${players.player2.name}'s Turn`);
gameController.makeMove("5", players.player2.marker);