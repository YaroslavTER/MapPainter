var c = document.getElementById("map_id");
var ctx = c.getContext("2d");

const gameSetting = {
  refreshTime: 45
};

const canvasSettings = {
  width: c.clientWidth,
  height: c.clientHeight
};

var mapSettings = {
  cell: {
    size: 32,
    types: []
  },
  width: 400,
  height: 400
};

const mapState = {
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

function setTypes(inputTypes) {
  for (let type of inputTypes) {
    for(let i = 0; i < type.repeats; i++) {
      mapSettings.cell.types.push(type.name);
    }
  }
}

function initMap() {
  const newMap = [];
  for (let i = 0; i < mapSettings.height; i++) {
    newMap[i] = [];
  }
  map = newMap;
}

function setVisibility(cellTypeName, inputVisibility){
  for (let x = 0; x < mapSettings.height; x++) {
    for (let y = 0; y < mapSettings.width; y++) {
      let cell = map[x][y];
      let name = cell.cellType;
      if(name == cellTypeName)
        cell.visibility = inputVisibility;
    }
  }
}

function drawMap() {
  const height = mapSettings.height;
  const width = mapSettings.width;
  const cellSize = mapSettings.cell.size;
  const offsetX = mapState.position.x;
  const offsetY = mapState.position.y;
  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      let cell = map[mod(x - offsetX, height)][mod(y - offsetY, width)];
      let cellType = "";
      if(cell.visibility == "visible")
        cellType = cell.cellType;
      else cellType = "rock";
      ctx.putImageData(
        tilesData[cellType],
        x * cellSize,
        y * cellSize
      );
    }
  }
}

function generateMap() {
  noise.seed(Math.random());
  mapState.position.x = getRandomFom(0, mapSettings.height - 1)
  mapState.position.y = getRandomFom(0, mapSettings.width - 1)
  let i = 0;
  let coef = 40;
  let typesLength = mapSettings.cell.types.length;
  for (let x = 0; x < mapSettings.height; x++) {
    for (let y = 0; y < mapSettings.width; y++) {
      let value = noise.simplex2(x / coef, y / coef);
      value = Math.abs(~~(value * typesLength));
      map[x][y] = {
                    cellType: mapSettings.cell.types[value],
                    visibility: "visible"
                  };
    }
  }
}

function getRandomFom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

c.addEventListener(
  "mousemove",
  e => {
    updateMousePosition(e);
  },
  false
);

function updateMousePosition(e) {
  const rect = c.getBoundingClientRect();
  mouseState.x = e.clientX - rect.left;
  mouseState.y = e.clientY - rect.top;
}

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
    counter++;
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

function drawMinimap() {
  let size = 0.5;
  for (let x = 0; x < mapSettings.height; x++) {
    for (let y = 0; y < mapSettings.width; y++) {
      let cell = map[x][y];
      let xCoord = x*size;
      let yCoord = canvasSettings.height - y*size;
      if(cell.cellType == "grass")
        ctx.fillStyle = "#636363";
      else if(cell.cellType == "water")
        ctx.fillStyle = "#a0a0a0";
      ctx.fillRect(xCoord, yCoord, size, size);
    }
  }
}

setTypes(
          [
            { name: "water", repeats: 6 },
            { name: "sand", repeats: 2 },
            { name: "grass", repeats: 5 },
            { name: "tree", repeats: 2 },
            { name: "grass", repeats: 2 },
            { name: "tree", repeats: 1 },
            { name: "rock", repeats: 2 },
            { name: "coalOre", repeats: 1 },
            { name: "ironOre", repeats: 1 },
            { name: "rock", repeats: 2 },
            { name: "goldOre", repeats: 1 },
            { name: "diamondOre", repeats: 2 }
          ]
        )

initMap();
generateMap();
drawMap();

mainGameCycle = setInterval(function() {
  moveMap();
  drawMap();
  drawMouseHover();
}, gameSetting.refreshTime);
