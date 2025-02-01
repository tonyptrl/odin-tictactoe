// Players

const players = (function() {
  let player1Name = "";
  let player2Name = "";
  const player1Btn = document.querySelector(".js-submit-1");
  const player2Btn = document.querySelector(".js-submit-2");
  const player1Input = document.querySelector(".js-player-1-input");
  const player2Input = document.querySelector(".js-player-2-input");
  const startBtn = document.querySelector(".js-game-start-btn");


  let player1 = {
    name: "",
    marker: "X",
  };
  
  let player2 = {
    name: "",
    marker: "O",
  };


  function checkAndStartGame() {
    startBtn.addEventListener('click', () => {
      if (player1.name !== "" && player2.name !== "") {
        document.querySelector(".js-gameboard").style.display = "grid";
        document.querySelector(".js-start-menu").style.display = "none";
        gameController.startGame();
      }
    })
  }


  player1Btn.addEventListener('click', () => {
    if (player1Input.value !== "") {
      player1.name = player1Input.value;
      player1Input.value = "";
      document.querySelector(".js-player-1 p").textContent = `${player1.name} (using "X")`;
    }
    checkAndStartGame();
  });
  
  player2Btn.addEventListener('click', () => {
    if (player2Input.value !== "") {
      player2.name = player2Input.value;
      player2Input.value = "";
      document.querySelector(".js-player-2 p").textContent = `${player2.name} (using "O")`;
    }
    checkAndStartGame();
  });
  

return {
  checkAndStartGame,
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
  let gameOver = false;

  const resetGameBtn = document.querySelector(".js-game-reset-btn");
  const infosInput = document.querySelector(".js-infos");

  const startGame = (function() {
    document.querySelector(".js-game-reset-container").style.display = "flex";
    document.querySelector(".js-game-reset-btn").style.display = "flex";
    infosInput.textContent = `game started between ${players.player1.name} and ${players.player2.name}! ${players.player1.name}'s turn (X)`;
  });

  const getCurrentPlayer = function() {
    return player1Turn ? players.player1 : players.player2;
  };

  const makeMove = (position) => {
    if (gameOver) return;

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
      infosInput.textContent = "invalid position. Please choose a valid position.";
      return;
    };

    let currentPlayer = getCurrentPlayer();
    board[row][column] = currentPlayer.marker;
    document.querySelector(`.cell-${position}`).textContent = currentPlayer.marker;

    if (checkWin(currentPlayer)) {
      infosInput.textContent = `${currentPlayer.name} wins!`;
      gameOver = true;
      return;
    }

    if (checkDraw()) {
      infosInput.textContent = "it's a draw!";
      gameOver = true;
      return;
    }

    player1Turn = !player1Turn;
    infosInput.textContent = `${getCurrentPlayer().name}'s turn (${getCurrentPlayer().marker})`;
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
    gameOver = false;
    document.querySelectorAll(".js-gameboard div").forEach(cell => cell.textContent = "");
    startGame();
  };

  resetGameBtn.addEventListener("click", restartGame);

  return {
    startGame,
    makeMove,
  };
})();

(function() {
  const cells = document.querySelectorAll(".js-gameboard div");

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      gameController.makeMove(index + 1);
    });
  });
})();