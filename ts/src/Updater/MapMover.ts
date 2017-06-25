import settings from "../settings";
import Mod from "../Mod";

const mod = Mod();

function MapMover() {
  let widthCounter = 0;
  let heightCounter = 0;

  function move(mouseState, mapState: MapState, minimapState: MapState): MapState {
    const shiftBy = 1;
    const { x, y } = mouseState;
    const { width, height } = settings.canvas;
    const cellSize = settings.cell.size;
    if (x <= cellSize && x >= 0) {
      mapState.position.x += shiftBy;
      minimapState.position.x -= shiftBy;
    } else if (x >= width - cellSize) {
      mapState.position.x -= shiftBy;
      minimapState.position.x += shiftBy;
    }
    if (y <= cellSize && y >= 0) {
      mapState.position.y += shiftBy;
      minimapState.position.y -= shiftBy;
    } else if (y >= height - cellSize) {
      mapState.position.y -= shiftBy;
      minimapState.position.y += shiftBy;
    }
  }

  function calculateCurrentPosition(minimapState: MapState) {
    let mSize = 2;
    let size = settings.cell.size;
    let height = mSize*settings.canvas.height/size;
    let width = mSize*settings.canvas.width/size;
    let mX = minimapState.position.x*mSize;
    let mY = minimapState.position.y*mSize;
    let mWidth = settings.width*mSize;
    let mHeight = settings.height*mSize;
    let x = mod(mX, mWidth)/size*size;
    let y = (mod(mY, mHeight) + settings.canvas.height -
      settings.height*mSize)/size*size;
    if(mod(mX, mWidth) > mWidth - width + 4)
      widthCounter++;
    else if(mod(mX, mWidth) == 0)
      widthCounter = 0;
    if(mod(mY, mWidth) > mHeight - height)
      heightCounter++;
    else if(mod(mY, mHeight) == 0)
      heightCounter = 0;
    //drawCurrentPosition(x, y, mSize, width, height, widthCounter, heightCounter);
  }
  return {
    move
  };
}

export default MapMover;
