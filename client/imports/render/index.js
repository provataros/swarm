import {Three} from "./three";
import {Noise} from "./noise";
import {Texture} from "./texture";
import {Geometry} from "./geometry/planet.js";

console.log(Geometry);

export const Render = {
  three : Three,
  noise : Noise,
  texture : Texture,
};
