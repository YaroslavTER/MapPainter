import Canvas from "./Canvas/Canvas";
import MapGenerator from "./Generator/MapGenerator";
import TileGenerator from "./Generator/TileGenerator";
import Listeners from "./Listeners/Listeners";
import MapMover from "./Updater/MapMover";
import settings from "./settings";

const map = MapGenerator();
const canvas = Canvas();
const mouseState = Listeners();
const mapMover = MapMover();
const mapState: MapState = { position: { x: 0, y: 0 } };

setInterval(function() {
  canvas.draw(map, mouseState, mapState);
  mapMover.move(mouseState, mapState);
}, settings.gameSettings.refreshTime);
