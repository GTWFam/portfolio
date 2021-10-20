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
        return collection.find({ "_id": ObjectId("617094d2a4cbd1e6a0ae18ae") }).toArray()
    }).then(console.log)


app.use(express.static('build'));

app.post('/makeMove', (req, res) => {
    res.send(`Made Move! AI: ${getAIMove()}`)
})

app.listen(process.env.PORT || 3000);
