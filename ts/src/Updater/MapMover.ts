import settings from "../settings";
import Mod from "../Mod";

const mod = Mod();

function MapMover() {

  function move(mouseState, mapState: MapState,
    minimapState: MapState): MapState {
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
  return {
    move
  };
}

export default MapMover;
