import settings from "../settings";
import Mod from "../Mod";

const mod = Mod();

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

  function calculateCurrentPosition(minimapState: MapState) {
    let mSize = 2;
    let widthToSubtract = 0;
    let heightToSubtract = 0;
    let size = settings.cell.size;
    let height = mSize*settings.canvas.height/size;
    let width = mSize*settings.canvas.width/size;
    let mWidth = settings.width*mSize;
    let mHeight = settings.height*mSize;
    let xDisp = mod(minimapState.position.x*mSize, mWidth);
    let yDisp = mod(minimapState.position.y*mSize, mHeight);
    let x = xDisp/size*size;
    let y = (yDisp + settings.canvas.height -
      settings.height*mSize)/size*size;
    if(xDisp > mWidth - width)
      widthToSubtract = Math.abs(mWidth - width - xDisp);
    if(yDisp > mHeight - height)
      heightToSubtract = Math.abs(mHeight - height - yDisp);
    drawCurrentPosition(x, y, mSize, width, height,
      widthToSubtract, heightToSubtract);
  }

  function drawCurrentPosition(x, y, mSize, width, height,
    widthToSubtract, heightToSubtract) {
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(x, y, width - widthToSubtract, height - heightToSubtract);
    ctx.fillRect(x - settings.width*mSize, y, width, height);
    ctx.fillRect(x, y - settings.height*mSize - heightToSubtract + height,
      width - widthToSubtract, heightToSubtract);
    ctx.fillRect(x - settings.width*mSize, y - settings.height*mSize - heightToSubtract + height,
      width, heightToSubtract);
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
    mapState: MapState, minimapState: MapState) {
    drawMap(map, mapState);
    drawMouseHover(mouseState);
    drawMinimap(minimap);
    calculateCurrentPosition(minimapState);
  }

  return {
    draw
  };
}

export default Canvas;
