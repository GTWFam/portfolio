let canvas = null
let context = null

export function loadOthello() {
    console.log("Welcome to Othello!");
    canvas = document.getElementById("othello");
    context = canvas.getContext('2d');
    context.scale(70, 70);
    context.fillStyle = "#202020";
    context.fillRect(0, 0, canvas.width, canvas.height);
    let board = createBoard(8, 8)
    drawShape(board, { x: 0, y: 0 })
}

function createBoard(w, h) {
    const anBoard = [];
    while (h--) {
        anBoard.push(new Array(w).fill(0));
    }
    return anBoard;
}

function drawShape(aShape, offset) {
    aShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if ((aShape.length > 4 || value !== 0) && context !== null && canvas !== null) {
                context.fillStyle = "#00947e";
                context.fillRect(
                    x + offset.x + 0.1,
                    y + offset.y + 0.1,
                    0.9, 0.9
                );
            } else if (context === null || canvas === null) {
                console.log('Othello game didn\'t load');
            }
        });
    });
}