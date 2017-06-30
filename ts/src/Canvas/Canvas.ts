import settings from "../settings";
import Mod from "../Mod";

function Canvas() {
  const c = document.querySelector("canvas");
  const ctx = c.getContext("2d");
  c.width = settings.canvas.width;
  c.height = settings.canvas.height;

  const mod = Mod();
  const { height, width, cell: { size } } = settings;

  function drawMap(mapObj: Map, mapState: MapState) {
    const map = mapObj.map;
    const offsetX = mapState.position.x;
    const offsetY = mapState.position.y;
    ctx.clearRect(0, 0, (width - 1)*size, (height - 1)*size);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        ctx.drawImage(
          map[mod(x - offsetX, width)][mod(y - offsetY, height)].image,
          x * size,
          y * size
        );
      }
    }

  }

  function drawCurrentPosition(currentPosition: CurrentPoition) {
    let x = currentPosition.position.x;
    let y = currentPosition.position.y;
    let mSize = currentPosition.cell.size;
    let width = currentPosition.width;
    let height = currentPosition.height;
    let widthToSubtract = currentPosition.toSubtract.width;
    let heightToSubtract = currentPosition.toSubtract.height;
    let yCoord = y - settings.height*mSize - heightToSubtract + height;
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(x, y, width - widthToSubtract, height - heightToSubtract);
    ctx.fillRect(x - settings.width*mSize, y, width, height);
    ctx.fillRect(x, yCoord, width - widthToSubtract, heightToSubtract);
    ctx.fillRect(x - settings.width*mSize, yCoord, width, heightToSubtract);
    ctx.globalAlpha = 1;
  }

  function drawMouseHover(mouseState: HTMLImageElement) {
    const { x, y } = mouseState;
    const cellSize = settings.cell.size;
    const hoverX = x - x % cellSize;
    const hoverY = y - y % cellSize;
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(hoverX, hoverY, cellSize, cellSize);
  }

  function drawMinimap(minimap) {
    ctx.drawImage(
      minimap,
      0,
      0
    );
  }

  function drawArea(mapState: MapState, currentPosition: CurrentPosition) {
    let x = 0;
    let y = 0;
    let areaX = x - x % size;
    let areaY = y - y % size;
    let offsetX = mapState.position.x;
    let offsetY = mapState.position.y;
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 5;
    ctx.strokeRect(mod((areaX + offsetX)*size, width*size),
      mod((areaY + offsetY)*size, height*size), 10*size, 10*size);
  }

  function draw(map: Map, minimap: HTMLImageElement, mouseState,
    mapState: MapState, minimapState: MapState,
    currentPosition: CurrentPosition) {
    drawMap(map, mapState);
    drawMouseHover(mouseState);
    drawMinimap(minimap);
    drawCurrentPosition(currentPosition);
    drawArea(mapState, currentPosition);
  }

  return {
    draw
  };
}

export default Canvas;
