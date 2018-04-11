// canvas vars
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

// ball vars
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

// paddle vars
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

// keyboard controls
let rightPressed = false;
let leftPressed = false;

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
} //drawBall

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
} //drawPaddle

function draw() {
    // clear canvas before each frame to not leave a trail
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    
    // ball will be drawn in new position on every interval update
    x += dx;
    y += dy;

    // check if ball is touching right or left of canvas, reverse direction
    if ( x + dx > canvas.width-ballRadius || x + dx < ballRadius ) {
        dx = -dx;
    }
    // check if ball is tonly hitting top wall, 
    // if bottom check to see if it hits the paddle, otherwise GG
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert('GG');
            document.location.reload();
        }
    }
    
    // only let paddle move within boundaraies of the canvas
    if ( rightPressed && paddleX < canvas.width-paddleWidth ) {
        paddleX += 7;
    }
    else if ( leftPressed && paddleX > 0 ) {
        paddleX -= 7;
    }
} //draw

// listen for key presses - vanilla
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
} //keyDownHandler

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
} //keyUpHandler

// run code every 10ms to cause movement 
// on frames, like movies
setInterval(draw, 10);