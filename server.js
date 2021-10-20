const spawn = require('child_process').spawn;
const express = require('express');

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

app.use(express.static('build'));

app.post('/makeMove', (req, res) => {
    res.send(`Made Move! AI: ${getAIMove()}`)
})

app.listen(process.env.PORT || 3000);
