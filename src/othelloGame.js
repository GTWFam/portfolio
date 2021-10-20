export function loadOthello() {
    console.log("Welcome to Othello!");

    const canvas = document.getElementById("othello");
    const context = canvas.getContext('2d');

    context.scale(20, 20);
    context.fillStyle = "#202020";
    context.fillRect(0, 0, canvas.width, canvas.height);
}