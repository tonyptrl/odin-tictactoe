// Players

const players = (function() {
  let player1Name = "";
  let player2Name = "";
  const player1Btn = document.querySelector(".js-submit-button-1");
  const player2Btn = document.querySelector(".js-submit-button-2");
  const player1Input = document.querySelector(".input-player-1");
  const player2Input = document.querySelector(".input-player-2");

  let player1 = {
      name: player1Name || "Player 1",
      marker: "X",
    };

    let player2 = {
      name: player2Name || "Player 2",
      marker: "O",
    };

    player1Btn.addEventListener('click', () => {
      player1Name = player1Input.value;
      player1Input.value = "";
    });

    player2Btn.addEventListener('click', () => {
      player2Name = player2Input.value;
      player2Input.value = "";
    });

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
  let player1Turn = true;

  const resetGameBtn = document.querySelector(".reset-game-button");
  const infosInput = document.querySelector(".js-infos");

  const startGame = (function() {
    infosInput.textContent = `Game started between ${players.player1.name} and ${players.player2.name}! ${players.player1.name}'s Turn (X)`;
  });

  const getCurrentPlayer = function() {
    return player1Turn ? players.player1 : players.player2;
  };

  const makeMove = (position) => {
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
      infosInput.textContent = "Invalid position. Please choose a valid position.";
      return;
    };

    let currentPlayer = getCurrentPlayer();
    board[row][column] = currentPlayer.marker;
    document.querySelector(`.cell-${position}`).textContent = currentPlayer.marker;

    if (checkWin(currentPlayer)) {
      infosInput.textContent = `${currentPlayer.name} wins!`;
      return;
    }

    if (checkDraw()) {
      infosInput.textContent = "It's a draw!";
      return;
    }

    player1Turn = !player1Turn;
    infosInput.textContent = `${getCurrentPlayer().name}'s Turn (${getCurrentPlayer().marker})`;
  };

  const checkWin = function(player) {
    const marker = player.marker;

    if (
      (board[0][0] === marker && board[0][1] === marker && board[0][2] === marker) ||
      (board[1][0] === marker && board[1][1] === marker && board[1][2] === marker) ||
      (board[2][0] === marker && board[2][1] === marker && board[2][2] === marker) ||
      (board[0][0] === marker && board[1][0] === marker && board[2][0] === marker) ||
      (board[0][1] === marker && board[1][1] === marker && board[2][1] === marker) ||
      (board[0][2] === marker && board[1][2] === marker && board[2][2] === marker) ||
      (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
      (board[0][2] === marker && board[1][1] === marker && board[2][0] === marker)
    ) {
      return true;
    }
    return false;
  };

  const checkDraw = function() {
    return board.flat().every(cell => cell === "X" || cell === "O");
  };

  const restartGame = function() {
    gameboard.resetBoard();
    board = gameboard.getBoard();
    player1Turn = true;
    document.querySelectorAll(".gameboard div").forEach(cell => cell.textContent = "");
    startGame();
  };

  resetGameBtn.addEventListener("click", restartGame);

  return {
    startGame,
    makeMove,
  };
})();

(function() {
  const cells = document.querySelectorAll(".gameboard div");

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      gameController.makeMove(index + 1);
    });
  });
})();


// Starting the game
gameController.startGame();