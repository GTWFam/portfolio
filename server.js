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

    othello.stdout.on('data', data => {
        console.log(data.toString())
    })

    othello.stderr.on('data', data => {
        console.error(`Encountered an error in python code:\n${data}`)
    })
}

const app = express();

app.use(express.static('build'));

app.listen(process.env.PORT || 3000);
