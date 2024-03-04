"use strict";

window.addEventListener("load", start);

// --------- CONTROLLER ----------

let currentPlayer = 1;

function start() {
  console.log("Javascript be Running!");
  hide();
  displayBoard();
  displayTurn();
  makeBoardClick();
}

function hide() {
  document.querySelector("#winnerDisplay").classList.add("hide");
}

function selectCell(row, col) {
  if (readFromCell(row, col) === 0) {
    writeToCell(row, col, currentPlayer);
    console.table(model);
    displayBoard();
    nextTurn();
    return true;
  } else {
    console.log("Hey! - No cheating!");
    return false;
  }
}

function checkWinner() {
  // Tjek rækker
  for (let row = 0; row < model.length; row++) {
    if (
      model[row][0] !== 0 &&
      model[row][0] === model[row][1] &&
      model[row][0] === model[row][2]
    ) {
      return model[row][0]; // Returnér vinderens værdi (1 for "X", 2 for "O")
    }
  }

  // Tjek kolonner
  for (let col = 0; col < model.length; col++) {
    if (
      model[0][col] !== 0 &&
      model[0][col] === model[1][col] &&
      model[0][col] === model[2][col]
    ) {
      return model[0][col]; // Returnér vinderens værdi (1 for "X", 2 for "O")
    }
  }

  // Tjek diagonaler
  if (
    model[0][0] !== 0 &&
    model[0][0] === model[1][1] &&
    model[0][0] === model[2][2]
  ) {
    return model[0][0]; // Returnér vinderens værdi (1 for "X", 2 for "O")
  }
  if (
    model[0][2] !== 0 &&
    model[0][2] === model[1][1] &&
    model[0][2] === model[2][0]
  ) {
    return model[0][2]; // Returnér vinderens værdi (1 for "X", 2 for "O")
  }

  // Hvis ingen vinder
  return 0;
}

function nextTurn() {
  if (checkWinner() !== 0) {
    console.log("Game over! Player " + checkWinner() + " wins!");
    displayWinner();
    return;
  }

  if (currentPlayer === 1) {
    currentPlayer = 2;
    compTurn();
  } else if (currentPlayer === 2) {
    currentPlayer = 1;
    playerTurn();
  }
}

function playerTurn() {}

function compTurn() {
  setTimeout(() => {
    checkCells();
  }, 500);
}

// ------------- VIEW -------------

// WIP
function displayTurn() {
  let players = ["PlayerOne", "PlayerTwo"];
  let currentPlayerIndex = 0;
  let turnDisplayBox = document.querySelector("#turnDiplay");
  let currentPlayer = players[currentPlayerIndex]; // Vælg den nuværende spiller før øgning af currentPlayerIndex

  let message = `Player ${currentPlayer}'s turn`;

  turnDisplayBox.textContent = message;
  if (currentPlayerIndex === 0) {
    currentPlayerIndex = 1;
  }
  if (currentPlayerIndex === 1) {
    currentPlayerIndex = 0;
  }
}

function displayWinner() {
  let winnerDisplayBox = document.querySelector("#winnerDisplay");
  let message = `Player ${currentPlayer} won the game!`;

  winnerDisplayBox.textContent = message;
  winnerDisplayBox.classList.remove("hide");
}

function makeBoardClick() {
  document.querySelector("#board").addEventListener("click", boardClicked);
}

function boardClicked(event) {
  const cell = event.target;
  const row = cell.dataset.row;
  const col = cell.dataset.col;

  console.log(`Clicked on ROW: ${row}, COL: ${col}`);

  selectCell(row, col);
}

function displayBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const value = readFromCell(row, col);
      const cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );

      switch (value) {
        case 0:
          cell.textContent = " ";
          break;
        case 1:
          cell.textContent = "X";
          break;
        case 2:
          cell.textContent = "O";
          break;
        default:
          console.log("Wrong");
      }
    }
  }
}

function checkCells() {
  const availableCells = [];

  // Iterer igennem cellerne og push til listen
  for (let row = 0; row < model.length; row++) {
    for (let col = 0; col < model.length; col++) {
      if (readFromCell(row, col) === 0) {
        availableCells.push([row, col]);
      }
    }
  }
  // Hvis ingen celler tilbage, slut spil
  if (availableCells.length === 0) {
    console.log("Game over! - No more spaces left.");
    return;
  }

  // Forbered variabler til at vælge en tilfældig ledig celle
  let randomIndex = Math.floor(Math.random() * availableCells.length);
  let [randomRow, randomCol] = availableCells[randomIndex];

  // Sæt tilfældig "O", så længe der ikke læses et 0
  while (readFromCell(randomRow, randomCol) !== 0) {
    randomIndex = Math.floor(Math.random() * availableCells.length);
    [randomRow, randomCol] = availableCells[randomIndex];
  }
  selectCell(randomRow, randomCol);
}

// ------------- MODEL -------------

const model = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}
