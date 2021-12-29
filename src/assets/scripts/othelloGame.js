let canvas = null;
let context = null;
let board = null;
let player = null;
let playerTurn = false;
let paused = true;
// Green    // White   // Black
const colors = ["#00947e", "#fdfdfd", "#0d0d0d"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function drawRound(x, y, offset, color, double) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x + offset.x + 0.525, y + offset.y + 0.525, 0.42, 0, 2 * Math.PI);
  context.fill();

  if (double) {
    context.fillStyle = colors[0];
    context.beginPath();
    context.arc(
      x + offset.x + 0.525,
      y + offset.y + 0.525,
      0.39,
      0,
      2 * Math.PI
    );
    context.fill();
  }
}

function drawShape(aShape, offset) {
  aShape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (context !== null && canvas !== null) {
        context.fillStyle = colors[0];
        context.fillRect(x + offset.x + 0.05, y + offset.y + 0.05, 0.95, 0.95);
        if (value === 3) {
          drawRound(x, y, offset, colors[player], true);
        }
        if (value === 1 || value === 2) {
          drawRound(x, y, offset, colors[value], false);
        }
      } else if (context === null || canvas === null) {
        console.log("Othello game didn't load");
      }
    });
  });
}

async function showMoves() {
  await fetch("/validMOves", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let json = data.json;
      let moves = Object.keys(json);
      console.log("Valid moves: ", moves);
      let temp_board = board;
      moves.forEach((move) => {
        let split = move.split(" ");
        let row = split[0];
        let col = split[1];
        temp_board[row][col] = 3;
      });
      drawShape(temp_board, { x: 0, y: 0 });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function clickListener(canvas, event) {
  if (!playerTurn) return "Not your turn!";
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let col = Math.floor(x / 70);
  let row = Math.floor(y / 70);
  console.log("Clicked on cell: " + row + " " + col);
}

async function aiMove() {
  await fetch("/AIMove", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let json = JSON.parse(data.json);
      let move = json.move;
      console.log("Last move: ", move);
      board = json.board;
      drawShape(board, { x: 0, y: 0 });
      playerTurn = true;
      game();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function game() {
  console.log(board);
  if (playerTurn) {
    showMoves();
    canvas.addEventListener("click", (e) => clickListener(canvas, e), false);
  } else {
    aiMove();
  }
  sleep(5000);
}

async function startGame() {
  if (player === null) {
    throw "No player found.";
  }
  paused = false;
  playerTurn = player === 2 ? false : true;
  game();
}

export async function loadOthello() {
  console.log("Welcome to Othello!");
  canvas = document.getElementById("othello");
  context = canvas.getContext("2d");
  context.scale(70, 70);
  context.fillStyle = "#202020";
  context.fillRect(0, 0, canvas.width, canvas.height);
  await fetch("/getOthello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      board = data.board;
      player = data.player;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  drawShape(board, { x: 0, y: 0 });
  console.log("Player is: ", player);
  try {
    startGame();
  } catch (e) {
    console.log("Unable to start the game: ", e);
  }
}
