var canvas = document.getElementById("map_id");
var ctx = canvas.getContext("2d");

const FIELD_HEIGHT = 32;

const GET_RANDOM = array => array[~~(Math.random() * (array.length - 1)) + 1];
const HEIGHT = 30;
const WIDTH = 30;

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
        x * FIELD_HEIGHT,
        y * FIELD_HEIGHT
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
      console.log(x, y);
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
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function continueStep(x, y) {
  return x < HEIGHT && y < WIDTH && x >= 0 && y >= 0;
}

function generateMap() {
  noise.seed(Math.random());
  let x = 3;
  let y = 0;
  let i = 0;
  for (let x = 0; x < HEIGHT; x++) {
    for (let y = 0; y < WIDTH; y++) {
      var value = noise.simplex2(x / 40, y / 40);
      value = Math.abs(~~(value * 5));
      map[x][y] = tilesTypes[value] || "path";
    }
  }
}

setMap("grass");
generateMap();
drawField();
