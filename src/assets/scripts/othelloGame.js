let canvas = null;
let context = null;
let board = null;
let player = null;
let playerTurn = null;
let w_score = 0;
let b_score = 0;
const colors = ["#00947e", "#fdfdfd", "#0d0d0d"];

let moves = [];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function circle(x, y, offset, color, double) {
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
          circle(x, y, offset, colors[player], true);
        }
        if (value === 1 || value === 2) {
          circle(x, y, offset, colors[value], false);
        }
      } else if (context === null || canvas === null) {
        console.log("Othello game didn't load");
      }
    });
  });
}

async function showMoves() {
  await fetch("/validMoves", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let json = data.json;
      moves = Object.keys(json);
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

async function aiMove() {
  playerTurn = true;
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
      game();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function clickListener(canvas, event) {
  if (!playerTurn) return "Not your turn!";
  if (moves.length === 0) {
    playerTurn = false;
    game();
    return "No moves possible";
  }
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let col = Math.floor(x / 70);
  let row = Math.floor(y / 70);
  let rcString = row.toString() + " " + col.toString();
  if (moves.includes(rcString)) {
    playerTurn = false;
    await fetch("/playerMove", {
      method: "POST",
      body: JSON.stringify({ theMove: rcString }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        board = data.json.board;
        console.log("Last board: ", board);
        drawShape(board, { x: 0, y: 0 });
        game();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    return "Invalid move";
  }
  console.log("Clicked on cell: " + row + " " + col);
}

function updateScore() {
  w_score = board.reduce(
    (prev, next, curr, arr) => prev + next.filter((x) => x == 1).length,
    0
  );
  b_score = board.reduce(
    (prev, next, curr, arr) => prev + next.filter((x) => x == 2).length,
    0
  );

  document.getElementById("w_score").innerText = w_score;
  document.getElementById("b_score").innerText = b_score;
}

async function game() {
  updateScore();
  let empty = board.reduce(
    (prev, next, curr, arr) => prev + next.filter((x) => x == 0).length,
    0
  );
  if (empty == 0) {
    if (w_score > b_score) {
      document.getElementById("othelloMessage").innerText = "White Wins!";
    } else if (w_score < b_score) {
      document.getElementById("othelloMessage").innerText = "Black Wins!";
    } else {
      document.getElementById("othelloMessage").innerText = "It's a Tie!";
    }
  } else {
    if (playerTurn) {
      document.getElementById("othelloMessage").innerText = "Your turn!";
      showMoves();
      canvas.addEventListener("click", (e) => clickListener(canvas, e), false);
    } else {
      document.getElementById("othelloMessage").innerText = "AI's turn!";
      aiMove();
    }
  }
}

async function startGame() {
  if (player === null) {
    throw "No player found.";
  }
  if (playerTurn === null) {
    playerTurn = player === 2 ? false : true;
  }
  console.log(playerTurn);
  game();
}

export async function resetOthello() {
  await fetch("/resetOthello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      board = data.board;
      player = data.player;
      playerTurn = data.turn;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  drawShape(board, { x: 0, y: 0 });
  document.getElementById("w_player").innerText = player == 1 ? "Player" : "AI";
  document.getElementById("b_player").innerText = player == 2 ? "Player" : "AI";
  updateScore();
  try {
    startGame();
  } catch (e) {
    console.log("Unable to start the game: ", e);
  }
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
      playerTurn = data.turn;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  drawShape(board, { x: 0, y: 0 });
  document.getElementById("w_player").innerText = player == 1 ? "Player" : "AI";
  document.getElementById("b_player").innerText = player == 2 ? "Player" : "AI";
  updateScore();
  try {
    startGame();
  } catch (e) {
    console.log("Unable to start the game: ", e);
  }
}
