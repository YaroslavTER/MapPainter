import Canvas from "./Canvas/Canvas";
import MapGenerator from "./Generator/MapGenerator";
import MinimapGenerator from "./Generator/MinimapGenerator";
import TileGenerator from "./Generator/TileGenerator";
import Listeners from "./Listeners/Listeners";
import MapMover from "./Updater/MapMover";
import settings from "./settings";
import CalculateCurrentPosition from "./Minimap/CalculateCurrentPosition";

const map = MapGenerator();
const minimap = MinimapGenerator().drawMinimap(map);
const canvas = Canvas();
const mouseState = Listeners();
const mapMover = MapMover();
const calculateCurrentPosition = CalculateCurrentPosition();
const initialX = getRandomFom(0, settings.width - 1);
const initialY = getRandomFom(0, settings.height - 1);
const mapState: MapState = {
  position: {
    x: initialX,
    y: initialY
  }
};
const minimapState: MapState = {
  position: {
    x: settings.width - mapState.position.x,
    y: settings.height - mapState.position.y
  }
};

function getRandomFom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

setInterval(function() {
  canvas.draw(map, minimap, mouseState, mapState, minimapState,
    calculateCurrentPosition.calculateCurrentPosition(minimapState));
  mapMover.move(mouseState, mapState, minimapState);
}, settings.gameSettings.refreshTime);
