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

  function draw(map: Map, minimap: HTMLImageElement, mouseState,
    mapState: MapState, minimapState: MapState, currentPosition: CurrentPosition) {
    drawMap(map, mapState);
    drawMouseHover(mouseState);
    drawMinimap(minimap);
    drawCurrentPosition(currentPosition);
    //calculateCurrentPosition(minimapState);
  }

  return {
    draw
  };
}

export default Canvas;
