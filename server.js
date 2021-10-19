const spawn = require('child_process').spawn;
const express = require('express');

const othello = spawn('python', ['./hello.py'])

othello.stdout.on('data', data => {
    console.log(data.toString())
})

const app = express();

app.use(express.static('build'));

app.listen(process.env.PORT || 3000);
