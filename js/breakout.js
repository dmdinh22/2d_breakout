let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function draw() {
    // clear canvas before each frame to not leave a trail
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    // ball will be drawn in new position on every interval update
    x += dx;
    y += dy;

    // check if ball is touching right or left of canvas, reverse direction
    if ( x + dx > canvas.width-ballRadius || x + dx < ballRadius ) {
        dx = -dx;
    }
    // check if ball is touching top or bottom of canvas, reverse direction
    if ( y + dy > canvas.height-ballRadius || y + dy < ballRadius ) {
        dy = -dy;
    }
}

// run code every 10ms to cause movement 
// on frames, like movies
setInterval(draw, 10);