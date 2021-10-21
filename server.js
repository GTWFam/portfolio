require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const spawn = require('child_process').spawn;

let othelloBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

let player = '1'

function getAIMove() {
    const othello = spawn('python', ['othelloAI.py', othelloBoard.toString(), player])
    let returnValue = 'No move'
    othello.stdout.on('data', data => {
        console.log(data.toString())
        returnValue = data.toString()
    })

    othello.stderr.on('data', data => {
        console.error(`Encountered an error in python code:\n${data}`)
    })

    return returnValue
}

const app = express();
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST;

const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection = null;

client.connect()
    .then(() => {
        return client.db('PortfolioData').collection('AllData');
    })
    .then(__collection => {
        collection = __collection;
        return ""
    })
// .then(console.log)


app.use(express.static('build'));

app.get('/getTetrisRecords', async (req, res) => {
    if (collection == null) {
        return res.send('No connection to database!')
    }
    try {
        let tetrisData = await collection.find({ "data": "tetris" }).toArray()
        let records = tetrisData[0].records
        console.log(records)
        res.json(records)
        res.end()
    } catch (e) {
        console.log('Unable to retrieve Tetris records: ' + e.message)
    }

})

app.post('/addTetrisRecord', async (req, res) => {
    if (collection == null) {
        return res.send('No connection to database!')
    }
    let tetrisData = await collection.find({ "data": "tetris" }).toArray()
    let records = tetrisData[0].records
    records.push({ name: req.body.name, score: req.body.score })

    try {
        collection.updateOne(
            { "data": "tetris" },
            { $set: { "records": records } }
        )
        res.send('Successfully added tetris record!')
    } catch (e) {
        res.send('Failed to add the tetris record' + e.message)
        return
    }
})

app.post('/makeMove', (req, res) => {
    res.send(`Made Move! AI: ${getAIMove()}`)
})

app.listen(process.env.PORT || 3000);
