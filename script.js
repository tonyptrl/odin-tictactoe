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
  let board = [
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
    },
    resetBoard: function() {
      board = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"]
      ];
    }
  };
})();


// GameController

const gameController = (function() {
  let board = gameboard.getBoard();

  let player1Turn = 1;
  let player2Turn = 0;

  const startGame = (function() {
    console.log(`Game started between ${players.player1.name} and ${players.player2.name}!`)
    console.log(`${players.player1.name}'s Turn (X)`);
    const player1Move = prompt("What's your move?");
    gameController.makeMove(player1Move, players.player1.marker);
    player1Turn = 0;
    player2Turn = 1;
    checkWin(players.player1);
  });

  const makeMove = (position, marker) => {
    let row = null;
    let column = null;

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
      handleTurn();
    };

    board[row][column] = marker;
    gameboard.displayGameboard();
  };

  const handleTurn = (function() {
    if (player1Turn === 1) {
      console.log(`${players.player1.name}'s Turn (X)`);
      const player1Move = prompt("What's your move?");
      gameController.makeMove(player1Move, players.player1.marker);
      player1Turn = 0;
      player2Turn = 1;
      checkWin(players.player1);
    } else {
        console.log(`${players.player2.name}'s Turn (O)`);
        const player2Move = prompt("What's your move?");
        gameController.makeMove(player2Move, players.player2.marker);
        player2Turn = 0;
        player1Turn = 1;
        checkWin(players.player2);
    }
  });

  const checkWin = (function(player) {
    if(board[0][0] === player.marker
    && board[0][1] === player.marker
    && board[0][2] === player.marker) {
      console.log(`${player.name} win!`);
      restartGame();
    } else if(board[1][0] === player.marker
    && board[1][1] === player.marker
    && board[1][2] === player.marker) {
      console.log(`${player.name} win!`);
      restartGame();
    } else if(board[2][0] === player.marker
    && board[2][1] === player.marker
    && board[2][2] === player.marker) {
      console.log(`${player.name} win!`);
      restartGame();
    } else if(board[0][0] === player.marker
    && board[1][0] === player.marker
    && board[2][0] === player.marker) {
      console.log(`${player.name} win!`);
      restartGame();
    } else if(board[0][1] === player.marker
    && board[1][1] === player.marker
    && board[2][1] === player.marker) {
      console.log(`${player.name} win!`);
      restartGame();
    } else if(board[0][2] === player.marker
    && board[1][2] === player.marker
    && board[2][2] === player.marker) {
      console.log(`${player.name} win!`);
      restartGame();
    } else if(board[0][0] === player.marker
    && board[1][1] === player.marker
    && board[2][2] === player.marker) {
      console.log(`${player.name} win!`);
      restartGame();
    } else if(board[0][2] === player.marker
    && board[1][1] === player.marker
    && board[2][0] === player.marker) {
      console.log(`${player.name} win!`);
      restartGame();
    } else {
      checkDraw();
    };
  });

  const checkDraw = (function() {
    let isDraw = true;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== "X" && board[i][j] !== "O") {
          isDraw = false;
          break;
        }
      }
      if (!isDraw) break;
    }

    if (isDraw) {
      console.log("It's a draw!");
      restartGame();
    } else {
      handleTurn();
    }
  });

  const restartGame = (function() {
    console.log("Restarting the game...");

    gameboard.resetBoard();
    board = gameboard.getBoard();
    player1Turn = 1;
    player2Turn = 0;

    gameboard.displayGameboard();
    startGame();
  });

  return {
    startGame,
    handleTurn,
    checkWin,
    checkDraw,
    makeMove,
    restartGame,
  };
})();


// Actions

gameboard.displayGameboard();
gameController.startGame();
gameController.handleTurn();
//gameController.makeMove("5", players.player1.marker);
//console.log(`${players.player2.name}'s Turn`);
//gameController.makeMove("5", players.player2.marker);