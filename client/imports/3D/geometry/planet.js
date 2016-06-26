import {Texture} from "/client/imports/texture";
import {Three} from "/client/imports/three";
import {Random} from "/imports/random";

var THREE = Three;


var size = 1024;

function createPlanet(planet){


  var meshes = new THREE.Object3D();


  var measure = Date.now();
  var grid   = new THREE.HexasphereGeometry(planet.radius+1,15);
  var sphere = new THREE.SphereGeometry(planet.radius,32,32);
  console.log(Date.now()-measure);

  //var geometry   = new THREE.SphereGeometry(planet.radius,32,32);
  THREE.ImageUtils.crossOrigin = '';

  var rnd = new Math.seedrandom(planet.id);
  var map = Texture.full(planet.id,size,size/2,rnd);

  var transparent = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent: true, opacity: 0 } );
  //var transparent = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, wireframe : true , color : new THREE.Color("#f44")} );
  var globe = new THREE.MeshBasicMaterial({wireframe : false});
	globe.map = new THREE.DataTexture(map.color,size,size/2,THREE.RGBAFormat);
  globe.map.needsUpdate = true;

  var earthMesh = new THREE.Mesh(sphere, globe);
  var gridMesh = new THREE.Mesh(grid, transparent);

  return {
    planet : earthMesh,
    grid : gridMesh,
    data : planet,
    extra : {
      camps : function(map){
        var a = [];
        var rnd = new Math.seedrandom(planet.id);
        for (var i=0;i<planet.camps.length;i++){
          a.push(createCamp(rnd,map,planet));
        }
        return a;
      }(map),
    }
  }
}

/*

320 400
18 93
750 220
*/

function createCamp(rnd,map,planet){
  var noise = map.noise;
  var p = Random.number(0,noise.length-1,rnd);
  var n = 0;
  var index = 0;
  //for (var i=0;i<4;i++){
  while (true){
    index = Random.number(0,map.noise.length,rnd);
    n = map.noise[index];
    if (n>=150){
      break;
    }
  }
  var x = ~~(index/(size));
  var y = index%(size);

  var u = y / 1024;
  var v = x / 512;

  var theta = 2 * Math.PI * u;
  var phi = Math.PI * v;

  var _x = -Math.cos(theta) * Math.sin(phi) * planet.radius;
  var _z = Math.sin(theta) * Math.sin(phi) * planet.radius;
  var _y = -Math.cos(phi) * planet.radius;

  var res = {x:_x,y:_y,z:_z};

  return res;
}


export const Planet = {
  create : createPlanet,
}

/*
0.5537109375 0.044921875
0.0849609375 0.033203125
0.9482421875 0.396484375
*/
