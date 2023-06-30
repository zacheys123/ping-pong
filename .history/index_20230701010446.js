const canvas = document.querySelector('#gameboard');
const ctx = canvas.getContext('2d');
const scoreText = document.querySelector('#scoretext');
canvas.width = 1024;
canvas.height = 576;
const gamewidth = canvas.width;
const gameheight = canvas.height;
const resetbutton = document.querySelector('#resetbutton');
const paddle1color = 'lightblue';
const paddle2color = 'red';
const gameColor = 'forestgreen';
const paddleBorder = 'black';
const ballcolor = 'yellow';
const ballborder = 'black';
const ballradius = 12.5;
const paddlespeed = 100;

let intervalId = 0;
let ballspeed = 1;
let ballX = gamewidth / 2;
let ballY = gameheight / 2;
let ballXdirection = 0;
let ballYdirection = 0;
let player1score = 0;
let player2score = 0;
let paddle1 = { width: 25, height: 100, x: 0, y: 0 };
let paddle2 = {
	width: 25,
	height: 100,
	x: gamewidth - 25,
	y: gameheight - 100,
};

addEventListener('keydown', changeDirections, true);
resetbutton.addEventListener('click', reset, true);

gameStart();

function gameStart() {
	createBall();
	nextTick();
}
function nextTick() {
	intervalId = setTimeout(function () {
		clearBoard();
		drawPaddles();

		moveBall();
		drawBall(ballX, ballY);
		checkCollision();
		nextTick();
	}, 76);
}
function drawBall(ballX, ballY) {
	ctx.fillStyle = ballcolor;

	ctx.strokeStyle = ballborder;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballradius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}
function clearBoard() {
	ctx.fillStyle = gameColor;
	ctx.fillRect(0, 0, gamewidth, gameheight);
}
function changeDirections(event) {
	const keyPressed = event.keyCode;
	const paddle1Up = 87;
	const paddle1Down = 83;
	const paddle2Up = 38;
	const paddle2Down = 40;
	switch (keyPressed) {
		case paddle1Up:
			if (paddle1.y > 0) paddle1.y -= paddlespeed;
			break;
		case paddle1Down:
			if (paddle1.y + paddle1.height < gameheight)
				paddle1.y += paddlespeed;
			break;
		case paddle2Up:
			if (paddle2.y > 0) paddle2.y -= paddlespeed;
			break;
		case paddle2Down:
			if (paddle2.y + paddle2.height < gameheight)
				paddle2.y += paddlespeed;
			break;
	}
}
function createBall() {
	ballspeed = 20;
	if (Math.round(Math.random()) === 1) {
		ballXdirection = 1;
	} else {
		ballXdirection = -1;
	}
	if (Math.round(Math.random()) === 1) {
		ballYdirection = 1;
	} else {
		ballYdirection = -1;
	}
	ballX = gamewidth / 2;
	ballY = gameheight / 2;
	drawBall(ballX, ballY);
}
function moveBall() {
	ballX += ballspeed * ballXdirection;
	ballY += ballspeed * ballYdirection;
}
function checkCollision() {
	if (ballY - ballradius <= 0) {
		ballYdirection *= -1;
	}
	if (ballY + ballradius >= gameheight) {
		ballYdirection *= -1;
	}

	if (ballX <= 0) {
		player1score += 1;
		updateScore();
		createBall();
		return;
	}
	if (ballX >= gamewidth) {
		player2score += 1;
		updateScore();
		createBall();
		return;
	}
	if (ballX <= paddle1.x + paddle1.width + ballradius) {
		if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
			ballXdirection *= -1;
			ballspeed += 2;
		}
	}
	if (ballX >= paddle2.x - ballradius) {
		if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
			ballXdirection *= -1;
			ballspeed += 2;
		}
	}
}
function drawPaddles() {
	ctx.strokeStyle = paddleBorder;
	ctx.fillStyle = paddle1color;
	ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
	ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
	ctx.fillStyle = paddle2color;
	ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
	ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function updateScore() {
	scoreText.textContent = `${player2score} : ${player1score}`;
}
function reset() {}
