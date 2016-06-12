import {Planet} from "./geometry/planet.js";
import {Scene} from "./rendering/scene.js";
import {createCamp} from "./geometry/misc.js";
var scene;

function initialize(reset){
  if (!window["3D"] || reset){
    scene = Scene;
    console.log("init 3d");
    window["3D"] = true;
  }
};

var map = {
  create : {
    planet : Planet.create,
    camp : createCamp,
  },
  show : {
    planet : Scene.showPlanet
  },
  reset : function(){
    initialize(true);
  }
}


initialize();

export const _3D = map;
