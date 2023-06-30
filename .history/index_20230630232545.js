const canvas = document.querySelector('#gameboard');
const ctx = canvas.getContext('2d');
const scoreText = document.querySelector('#scoretext');
canvas.width = 700;
canvas.height = 400;
const gamewidth = canvas.width;
const gameheight = canvas.height;
const resetbutton = document.querySelector('#resetbutton');
const paddle1color = 'lightblue';
const paddle2color = 'red';
const gameColor = 'forestgreen';
const paddleborder = 'black';
const ballcolor = 'yellow';
const ballborder = 'black';
const ballradius = 12.5;
const paddlespeed = 50;

let intervalId = 0;
let ballspeed = 1;
let ballX = gamewidth / 2;
let ballY = gameheight / 2;
let ballXdirection = 0;
let ballYdirection = 0;
let player1core = 0;
let player2core = 0;
let paddle1 = { width: 25, height: 100, x: 0, y: 0 };
let paddle2 = {
	width: 25,
	height: 100,
	x: gamewidth - 25,
	y: gameheight - 100,
};

addEventListener('keydown', changeDirections, true);
addEventListener('click', reset, true);

gameStart();

function gameStart() {}
function nextTick() {}
function drawBall() {}
function clearBoard() {}
function changeDirections() {}
function createBall() {}
function moveBall() {}
function checkCollision() {}
function drawPaddles() {
	ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
}
function updateScore() {}
function reset() {}
