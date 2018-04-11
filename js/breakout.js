let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let x = canvas.width/2;
let y = canvas.height-30;
const dx = 2;
const dy = -2;

function drawBall() {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI*2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
}
setInterval(draw, 10);