import settings from "../settings";
import ToImage from "../ToImage/ToImage";

function MinimapGenerator() {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  c.width = settings.canvas.width;
  c.height = settings.canvas.height;

  function drawMinimap(mapObject: Map): HTMLImageElement {
    let size = 2;
    ctx.globalAlpha = 0.8;
    let height = settings.height;
    let width = settings.width;
    let map = mapObject.map;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let cell = map[x][y];
        let xCoord = x*size;
        let yCoord = y*size + settings.canvas.height - height*size;
        if(cell.type == "water")
          ctx.fillStyle = "#a0a0a0";
        else
          ctx.fillStyle = "#636363";
        ctx.fillRect(xCoord, yCoord, size, size);
      }
    }
    ctx.fillStyle = "black";
    ctx.rect(1, settings.canvas.height - settings.height*size - 1,
      settings.width*size, settings.height*size);
    ctx.stroke();
    return  ToImage().toImage(c);
  }


  c.remove();
  return {
    drawMinimap
  };
}

export default MinimapGenerator;
