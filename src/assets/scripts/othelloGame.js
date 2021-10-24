let canvas = null
let context = null
let board = null
let player = null
let playerTurn = false

const colors = [
    "#00947e",
    "#fdfdfd",
    "#0d0d0d"
]

export async function loadOthello() {
    console.log("Welcome to Othello!");
    canvas = document.getElementById("othello");
    context = canvas.getContext('2d');
    context.scale(70, 70);
    context.fillStyle = "#202020";
    context.fillRect(0, 0, canvas.width, canvas.height);
    await fetch('/getOthello', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            board = data.board
            player = data.player
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    drawShape(board, { x: 0, y: 0 })

    canvas.addEventListener('click', (e) => clickListener(canvas, e), false)
}

function clickListener(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x,
        "Coordinate y: " + y);
    let col = Math.floor(x / 70)
    let row = Math.floor(y / 70)
    console.log("Clicked on cell: " + row + " " + col)
}

function drawShape(aShape, offset) {
    aShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (context !== null && canvas !== null) {
                context.fillStyle = colors[0];
                context.fillRect(
                    x + offset.x + 0.05,
                    y + offset.y + 0.05,
                    0.95, 0.95
                );
                if (value > 0) {
                    context.fillStyle = colors[value];
                    context.beginPath();
                    context.arc(
                        x + offset.x + 0.525,
                        y + offset.y + 0.525,
                        0.45, 0, 2 * Math.PI
                    );
                    context.fill();
                }

            } else if (context === null || canvas === null) {
                console.log('Othello game didn\'t load');
            }
        });
    });
}

