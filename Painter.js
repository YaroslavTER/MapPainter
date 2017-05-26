var canvas = document.getElementById("map_id");
var ctx = canvas.getContext("2d");

var canvasHeight = canvas.clientHeight
var canvasWidth = canvas.clientWidth

const FIELD_HEIGHT = 32

const GET_RANDOM = array => array[~~(Math.random() * (array.length - 1)) + 1]
const HEIGHT = 30;
const WIDTH = 30;

var mouseX = -1
var mouseY = -1
var xBegin = 0
var xEnd = 0
var yBegin = 0
var yEnd = 0

var xShift = 0
var yShift = 0
var shiftCoef = FIELD_HEIGHT

var time = 35

var map = [];
const tilesTypes = ["grass", "path", "water"];

function setMap(element) {
  for (let x = 0; x < HEIGHT; x++) {
    map[x] = new Array(WIDTH).fill(element);
  }
}

function drawField(field, mainColor, colors) {
  for (let x = 0; x < HEIGHT; x++) {
    for (let y = 0; y < WIDTH; y++) {
      ctx.putImageData(
        tilesData[map[x][y]],
        x * FIELD_HEIGHT + xShift,
        y * FIELD_HEIGHT + yShift
      );
    }
  }
}

function getPosition() {
  return randFor(0, FIELD_HEIGHT - PART_HEIGHT);
}

function generatePathFrom(x, y) {
  let direction = startDirection(x, y);
  let turnCoef = HEIGHT / 2;
  let steps = randFor(1, turnCoef);
  while (continueStep(x, y)) {
    let step = 0;
    while (step < steps && continueStep(x, y)) {
      map[x][y] = "path";
      if (direction == 0) x++;
      else if (direction == 1) x--;
      else if (direction == 2) y++;
      else if (direction == 3) y--;
      step++;
    }
    step = 0;
    steps = randFor(1, turnCoef);
    direction = randFor(0, 3);
  }
}
/*
	0 - down
	1 - up
	2 - right
	3 - left
*/
function startDirection(x, y) {
  if (x == 0) return 0;
  else if (x == HEIGHT - 1) return 1;
  else if (y == 0) return 2;
  else if (y == WIDTH - 1) return 3;
}

function randFor(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function continueStep(x, y) {
  return x < HEIGHT && y < WIDTH && x >= 0 && y >= 0
}

function generateMap() {
  noise.seed(Math.random())
  let x = 3
  let y = 0
  let i = 0
  for (let x = 0; x < HEIGHT; x++) {
    for (let y = 0; y < WIDTH; y++) {
      let value = noise.simplex2(x / 40, y / 40)
      value = Math.abs(~~(value * 5))
      map[x][y] = tilesTypes[value] || "path"
    }
  }
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect()
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener('mousemove', function(evt) {
  let mousePos = getMousePos(canvas, evt)
  mouseX = mousePos.x
  mouseY = mousePos.y
  drawGivenField()
}, false);

function drawGivenField() {
  for (let x = 0; x < HEIGHT; x++) {
    for (let y = 0; y < WIDTH; y++) {
      xBegin = x*FIELD_HEIGHT
      xEnd = x*FIELD_HEIGHT + FIELD_HEIGHT
      yBegin = y*FIELD_HEIGHT
      yEnd = y*FIELD_HEIGHT + FIELD_HEIGHT
      if(mouseX >= xBegin && mouseX <= xEnd &&
         mouseY >= yBegin && mouseY <= yEnd) {
         ctx.clearRect(0, 0, WIDTH*FIELD_HEIGHT, HEIGHT*FIELD_HEIGHT)
         drawField()
         ctx.fillStyle = 'black'
         ctx.globalAlpha = 0.3
         ctx.fillRect(xBegin, yBegin, FIELD_HEIGHT, FIELD_HEIGHT)
         ctx.globalAlpha = 1
         x = HEIGHT
         y = WIDTH
      }
    }
  }
}

canvas.addEventListener('click', function(evt) {
  let clickX = evt.clientX
  let clickY = evt.clientY
  if(clickX >= xBegin && clickX <= xEnd + FIELD_HEIGHT &&
     clickY >= yBegin && clickY <= yEnd + FIELD_HEIGHT) {
    console.log('x ' + xBegin, 'y ' + yBegin)
  }
}, false);

function moveMap() {
  if(mouseX <= FIELD_HEIGHT && mouseX >= 0)
    xShift += shiftCoef
  else if(mouseX >= canvasWidth - FIELD_HEIGHT)
    xShift -= shiftCoef
  if(mouseY <= FIELD_HEIGHT && mouseY >= 0)
    yShift += shiftCoef
  else if(mouseY >= canvasHeight - FIELD_HEIGHT)
    yShift -= shiftCoef
}

setMap("grass");
generateMap()
drawField()

mainGameCycle = setInterval(function() {
  moveMap()
  drawGivenField()
}, time)
