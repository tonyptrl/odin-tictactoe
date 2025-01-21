const gameboard = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"]
];

function displayGameboard() {
  gameboard.forEach((row) => console.log(row));
};

displayGameboard();

const players = {
  player1: {
    name: "Tony",
    marker: "X"
  },
  player2: {
    name: "Arnaud",
    marker: "O"
  }
};