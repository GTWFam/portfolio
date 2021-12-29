require("dotenv").config();
const express = require("express");
const mongodb = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const spawn = require("child_process").spawn;

let othelloBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let player = null;
let ai = null;

async function getAIMove() {
  if (player === null) return "No player found.";
  const othello = spawn("python", [
    "othelloAI.py",
    othelloBoard.toString(),
    ai,
  ]);

  for await (const data of othello.stdout) {
    return data.toString();
  }

  othello.stderr.on("data", (data) => {
    console.error(`Encountered an error in python code:\n${data}`);
  });
}

async function getValidMoves() {
  if (player === null) return "No player found.";
  const othello = spawn("python", [
    "othelloMoves.py",
    othelloBoard.toString(),
    player,
  ]);

  for await (const data of othello.stdout) {
    console.log(`Move is: ${data}`);
    return data.toString();
  }

  othello.stderr.on("data", (data) => {
    console.error(`Encountered an error in python code:\n${data}`);
  });
}

const app = express();
app.use(express.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@" +
  process.env.DB_HOST;

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let collection = null;

client
  .connect()
  .then(() => {
    return client.db("PortfolioData").collection("AllData");
  })
  .then((__collection) => {
    collection = __collection;
    return "";
  });
// .then(console.log)

app.get("/getTetrisRecords", async (req, res) => {
  if (collection === null) {
    res.json({ error: "No connection to database!" });
    res.end();
  }
  try {
    let tetrisData = await collection.find({ data: "tetris" }).toArray();
    let records = tetrisData[0].records;
    console.log(records);
    res.json(records);
  } catch (e) {
    let errorMsg = "Unable to retrieve Tetris records: " + e.message;
    console.log(errorMsg);
    res.json({ error: errorMsg });
  }
  res.end();
});

app.post("/addTetrisRecord", async (req, res) => {
  if (collection === null) {
    res.json({ message: "No connection to database!" });
    res.end();
    return;
  }

  let tetrisData = await collection.find({ data: "tetris" }).toArray();
  let records = tetrisData[0].records;
  records.push({ name: req.query.name, score: req.query.score });
  try {
    collection.updateOne({ data: "tetris" }, { $set: { records: records } });
    res.json({ message: "Successfully added tetris record!" });
  } catch (e) {
    res.json({ message: "Failed to add the tetris record" + e.message });
  }
  res.end();
});

app.get("/getFinData", async (req, res) => {
  if (collection === null) {
    res.json({ message: "No connection to database!" });
    res.end();
    return;
  }
  try {
    let finTrackData = await collection.find({ data: "finTrack" }).toArray();
    let data = finTrackData[0];
    let users = data.users;
    let userData = users.filter(
      (user) => user.userID.toString() === req.query.userID
    );
    let user = userData[0];
    delete user["password"];
    delete user["userID"];
    console.log(user);
    res.json(user);
  } catch (e) {
    let errorMsg = "Unable to retrieve Tetris records: " + e.message;
    console.log(errorMsg);
    res.json({ error: errorMsg });
  }
  res.end();
});

app.get("/getOthello", (req, res) => {
  if (player === null) {
    player = 2; // Math.floor(Math.random() * 2 + 1).toString();
    ai = 3 - player;
  }
  res.json({ board: othelloBoard, player: parseInt(player) });
  res.end();
});

app.get("/AIMove", async (req, res) => {
  let json = await getAIMove();
  json = json.trim();
  let data = JSON.parse(json);
  othelloBoard = data.board;
  res.json({ json: json });
  res.end();
});

app.get("/validMOves", async (req, res) => {
  let json = await getValidMoves();
  json = json.trim();
  let data = JSON.parse(json);
  console.log(data);
  res.json({ json: data });
  res.end();
});

app.use(express.static("build"));

app.listen(process.env.PORT || 3000);
