const express = require("express");
const mongodb = require("mongodb");
require("dotenv").config();

const app = express();
app.use(express.json());
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

app.use(express.static("build"));

app.listen(process.env.PORT || 3000);
