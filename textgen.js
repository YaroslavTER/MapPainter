const c = document.getElementById("c");
const ctx = c.getContext("2d");

const tiles = {
  grass: ["#0e7f03", "#0d6700", "#0f9235", "#0bad11"],
  path: ["#d5d210", "#e0dc18", "#f7f44a", "#edea68"],
  water: ["#0d8ac4", "#60c4f2", "#c2e8f9", "#268fbf"]
};

function drawTile(type) {
  const colors = tiles[type];
  let x, y;
  for (x = 0; x < 10; ++x) {
    for (y = 0; y < 10; ++y) {
      ctx.fillStyle = colors[~~(Math.random() * 4)];
      ctx.fillRect(x * 10, y * 10, 10, 10);
    }
  }
  return ctx.getImageData(0, 0, 100, 100);
}

function generate() {
  const textures = {};
  Object.keys(tiles).forEach((tile, i) => {
    textures[tile] = drawTile(tile);
  });
  return textures;
}

function draw(dat) {
  const l = Object.keys(dat);
  const len = l.length;
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      ctx.putImageData(dat[l[(i & j) != 0 ? 1 : 0]], i * 100, j * 100);
    }
  }
}

const dat = generate();
draw(dat);