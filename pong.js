// Set up the canvas and context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Set up the ball
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballSpeedX = 3;
var ballSpeedY = -3;

// Set up the paddles
var paddleHeight = 80;
var paddleWidth = 10;
var player1Y = (canvas.height - paddleHeight) / 2;
var player2Y = (canvas.height - paddleHeight) / 2;
var paddleSpeed = 50;

// Set up the scores
var player1Score = 0;
var player2Score = 0;

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.closePath();
}

// Draw the paddles
function drawPaddles() {
  // Player 1 paddle
  ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);

  // Player 2 paddle
  ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
}

// Draw the scores
function drawScores() {
  ctx.font = "24px Arial";
  ctx.fillText("Player 1: " + player1Score, 20, 30);
  ctx.fillText("Player 2: " + player2Score, canvas.width - 150, 30);
}
// Update the ball position
function updateBall() {
  // Increase ball speed
  ballSpeedX *= 1.0005;
  ballSpeedY *= 1.0005;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check for collision with top/bottom of canvas
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Check for collision with player paddles
  if (ballX - ballRadius < paddleWidth) {
    if (ballY > player1Y && ballY < player1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      player2Score++;
      resetBall();
    }
  } else if (ballX + ballRadius > canvas.width - paddleWidth) {
    if (ballY > player2Y && ballY < player2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      player1Score++;
      resetBall();
    }
  }
}

// Reset the ball position
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  //reset ball speed
  ballSpeedX = 3;
  ballSpeedY = -3;
  ballSpeedX = -ballSpeedX;
}

// Update the player paddles
function updatePaddles() {
  if (player1Y < 0) {
    player1Y = 0;
  } else if (player1Y > canvas.height - paddleHeight) {
    player1Y = canvas.height - paddleHeight;
  }

  if (player2Y < 0) {
    player2Y = 0;
  } else if (player2Y > canvas.height - paddleHeight) {
    player2Y = canvas.height - paddleHeight;
  }
}

// Handle player input
document.addEventListener("keydown", function(event) {
  if (event.key === "w") {
    player1Y -= paddleSpeed;
  } else if (event.key === "s") {
    player1Y += paddleSpeed;
  } else if (event.key === "ArrowUp") {
    player2Y -= paddleSpeed;
  } else if (event.key === "ArrowDown") {
    player2Y += paddleSpeed;
  }
});

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball, paddles, and scores
  drawBall();
  drawPaddles();
  drawScores();

  // Update the ball and paddles
  updateBall();
  updatePaddles();

  // Request the next frame of animation
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
