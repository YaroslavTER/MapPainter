import settings from "../settings";
import Mod from "../Mod";

function CalculateCurrentPosition(): CurrentPosition {
  const mod = Mod();
  function calculateCurrentPosition(minimapState: MapState): CurrentPoition {
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
    return {
      width: width,
      height: height,
      cell: {
        size: mSize
      },
      position: {
        x: x,
        y: y
      },
      toSubtract: {
        width: widthToSubtract,
        height: heightToSubtract
      }
    };
  }
  return {
    calculateCurrentPosition
  };
}

export default CalculateCurrentPosition;
