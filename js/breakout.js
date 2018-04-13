// canvas lets
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

// ball lets
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

// paddle lets
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

// keyboard controls
let rightPressed = false;
let leftPressed = false;

// brick lets
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// keeping score
let score = 0;

// player lives
let lives = 3;

// building out a 2d array for the bricks
let bricks = [];
for(c=0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

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

// listen for mouse movements
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
} //mouseMoveHandler

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x+brickWidth 
                    && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert('Winner, Winner, Chicken Dinner!');
                        document.location.reload();
                    }
                }
            }
        }
    }
} //collisionDetection

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

function drawBricks() {
    // loop through bricks and draw onto canvas
    for( c=0; c < brickColumnCount; c++) {
        for( r=0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = '#0095DD';
                context.fill();
                context.closePath();
            }
        }
    }
} //drawBricks

function drawScore() {
    context.font = '16px Arial';
    context.fillStyle = '#0095DD';
    context.fillText('Score: ' + score, 8, 20);
} //drawScore

function drawLives() {
    context.font = '16px Arial';
    context.fillStyle = '#0095DD';
    context.fillText('Lives: ' + lives, canvas.width - 65, 20);
} //drawLives

function draw() {
    // clear canvas before each frame to not leave a trail
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();

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
            lives--;
            if (!lives) {
                alert('GG!');
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth)/2;
            }
        }
    }

    // only let paddle move within boundaraies of the canvas
    if ( rightPressed && paddleX < canvas.width-paddleWidth ) {
        paddleX += 7;
    }
    else if ( leftPressed && paddleX > 0 ) {
        paddleX -= 7;
    }

    // optimize rendering of game
    requestAnimationFrame(draw);
} //draw

draw();