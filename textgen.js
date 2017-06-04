const tilesData = (function() {
const c = document.getElementById("map_id");
const ctx = c.getContext("2d");

const tiles = {
  grass: ["#0e7f03", "#0d6700", "#0f9235", "#0bad11"],
  tree: ["#964b16", "#0d6700", "#0f9235", "#0bad11"],
  sand: ["#d5d210", "#e0dc18", "#f7f44a", "#edea68"],
  water: ["#0d8ac4", "#60c4f2", "#c2e8f9", "#268fbf"],
  rock: ["#9da5b2", "#b5b8bc", "#ced6e0", "#898b8e"],
  ironOre: ["#477999", "#b5b8bc", "#ced6e0", "#898b8e"],
  goldOre: ["#ffee00", "#b5b8bc", "#ced6e0", "#898b8e"],
  coalOre: ["#383838", "#b5b8bc", "#ced6e0", "#898b8e"],
  diamondOre: ["#56eeff", "#b5b8bc", "#ced6e0", "#898b8e"]
};

function drawTile(type) {
  const colors = tiles[type];
  let limit = 8;
  let coef = 4
  let height = 32
  let x, y;
  for (x = 0; x < limit; ++x) {
    for (y = 0; y < limit; ++y) {
      ctx.fillStyle = colors[~~(Math.random() * coef)];
      ctx.fillRect(x * coef, y * coef, coef, coef);
    }
  }
  return ctx.getImageData(0, 0, height, height);
}

function generate() {
  const textures = {};
  Object.keys(tiles).forEach((tile, i) => {
    textures[tile] = drawTile(tile);
  });
  return textures;
}

const dat = generate();
return dat;
})();
