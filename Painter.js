var c = document.getElementById("map_id");
var ctx = c.getContext("2d");

const gameSetting = {
  refreshTime: 45
};

const canvasSettings = {
  width: c.clientWidth,
  height: c.clientHeight
};

const mapSettings = {
  cell: {
    size: 32,
    types: ["grass", "path", "water"]
  },
  width: 30,
  height: 30
};

const mapState = {
  /** Map position relative to (0,0) */
  position: {
    x: 0,
    y: 0
  }
};

const mouseState = {
  x: -1,
  y: -1
};

let map = [];

const mod = (a, b) => (a % b + b) % b;
const getRandomFromArray = array =>
  array[~~(Math.random() * (array.length - 1)) + 1];

function initMap() {
  const newMap = [];
  for (let i = 0; i < mapSettings.width; i++) {
    newMap[i] = [];
  }
  map = newMap;
}

function drawMap() {
  const height = mapSettings.height;
  const width = mapSettings.width;
  const cellSize = mapSettings.cell.size;
  const offsetX = mapState.position.x;
  const offsetY = mapState.position.y;
  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      ctx.putImageData(
        tilesData[map[mod(x - offsetX, height)][mod(y - offsetY, width)]],
        x * cellSize,
        y * cellSize
      );
    }
  }
}

function generateMap() {
  noise.seed(Math.random());
  let x = 3;
  let y = 0;
  let i = 0;
  for (let x = 0; x < mapSettings.height; x++) {
    for (let y = 0; y < mapSettings.width; y++) {
      let value = noise.simplex2(x / 40, y / 40);
      value = Math.abs(~~(value * 5));
      map[x][y] = mapSettings.cell.types[value] || "path";
    }
  }
}

function updateMousePosition(e) {
  const rect = c.getBoundingClientRect();
  mouseState.x = e.clientX - rect.left;
  mouseState.y = e.clientY - rect.top;
}

c.addEventListener(
  "mousemove",
  e => {
    updateMousePosition(e);
  },
  false
);

function drawMouseHover() {
  const cellSize = mapSettings.cell.size;
  const { x, y } = mouseState;
  const hoverX = x - x % cellSize;
  const hoverY = y - y % cellSize;

  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(hoverX, hoverY, cellSize, cellSize);
}

c.addEventListener(
  "click",
  function(evt) {
    let clickX = evt.clientX;
    let clickY = evt.clientY;

    console.log("x " + clickX, "y " + clickY);
  },
  false
);

function moveMap() {
  const shiftBy = 1;
  const { x, y } = mouseState;
  const { width, height } = canvasSettings;
  const cellSize = mapSettings.cell.size;
  if (x <= cellSize && x >= 0) mapState.position.x += shiftBy;
  else if (x >= width - cellSize) mapState.position.x -= shiftBy;
  if (y <= cellSize && y >= 0) mapState.position.y += shiftBy;
  else if (y >= height - cellSize) mapState.position.y -= shiftBy;
}

initMap();
generateMap();
drawMap();

mainGameCycle = setInterval(function() {
  moveMap();
  drawMap();
  drawMouseHover();
}, gameSetting.refreshTime);
