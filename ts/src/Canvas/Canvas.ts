import settings from "../settings";

const mod = (a, b) => (a % b + b) % b;

function Canvas() {
  const c = document.querySelector("canvas");
  const ctx = c.getContext("2d");
  c.width = settings.canvas.width;
  c.height = settings.canvas.height;

  const { height, width, cell: { size } } = settings;

  function drawMap(mapObj: Map, mapState: MapState) {
    const map = mapObj.map;
    const offsetX = mapState.position.x;
    const offsetY = mapState.position.y;
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        ctx.drawImage(
          map[mod(x - offsetX, height)][mod(y - offsetY, width)].image,
          x * size,
          y * size
        );
      }
    }
  }

  function drawMouseHover(mouseState) {
    const { x, y } = mouseState;
    const cellSize = settings.cell.size;
    const hoverX = x - x % cellSize;
    const hoverY = y - y % cellSize;
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(hoverX, hoverY, cellSize, cellSize);
  }

  function draw(map: Map, mouseState, mapState: MapState) {
    drawMap(map, mapState);
    drawMouseHover(mouseState);
  }

  return {
    draw
  };
}

export default Canvas;
