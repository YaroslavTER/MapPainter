import TileGenerator from "./TileGenerator";
import noise from "./perlin";
import settings from "../settings";

function setTypes(inputTypes) {
  for (let type of inputTypes) {
    for (let i = 0; i < type.repeats; i++) {
      settings.cell.types.push(type.name);
    }
  }
}

function initMap(): Map {
  const newMap = [];
  for (let i = 0; i < settings.height; i++) {
    newMap[i] = [];
  }
  return { map: newMap };
}

function setVisibility(cellTypeName, inputVisibility){
  for (let x = 0; x < settings.height; x++) {
    for (let y = 0; y < settings.width; y++) {
      let cell = map[x][y];
      let name = cell.cellType;
      if(name == cellTypeName)
        cell.visibility = inputVisibility;
    }
  }
}

function MapGenerator(): Map {
  const tiles = TileGenerator();
  const mapObject = initMap();
  let typesLength = settings.cell.types.length;
  let coef = 40;
  noise.seed(Math.random());
  for (let x = 0; x < settings.height; x++) {
    for (let y = 0; y < settings.width; y++) {
      const value = Math.abs(
        ~~(noise.simplex2(x / coef, y / coef) * typesLength)
      );
      const type = settings.cell.types[value] || "path";
      mapObject.map[x][y] = {
        type,
        image: tiles[type],
        visibility: "visible"
      };
    }
  }

  return mapObject;
}

setTypes(
  [
    { name: "water", repeats: 6 },
    { name: "path", repeats: 2 },
    { name: "grass", repeats: 5 },
    { name: "tree", repeats: 2 },
    { name: "grass", repeats: 2 },
    { name: "tree", repeats: 1 },
    { name: "rock", repeats: 2 },
    { name: "coalOre", repeats: 1 },
    { name: "ironOre", repeats: 1 },
    { name: "rock", repeats: 2 },
    { name: "goldOre", repeats: 1 },
    { name: "diamondOre", repeats: 2 }
  ]
)

export default MapGenerator;
