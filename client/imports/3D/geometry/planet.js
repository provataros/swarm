import {Texture} from "/client/imports/texture";
import {Three} from "/client/imports/three";
import {Random} from "/imports/random";

var THREE = Three;


var size = 1024;

function createPlanet(planet){



  var sss = Date.now();
  var geometry   = new THREE.HexasphereGeometry(planet.radius,3);
  console.log(Date.now()-sss);
  var verts = geometry.vertices;
  var faces = geometry.faces;
  for (var i=0;i<geometry.faces.length;i++){
  }
  //var geometry   = new THREE.SphereGeometry(planet.radius,32,32);
  THREE.ImageUtils.crossOrigin = '';
  console.log(planet);
  var rnd = new Math.seedrandom(planet.id);
  var map;
  console.log(geometry);



  map = Texture.full(planet.id,size,size/2,rnd);


  var material = new THREE.MeshBasicMaterial();
  material.wireframe = true;
  map.color = 0x000000;
	//material.map = new THREE.DataTexture(map.color,size,size/2,THREE.RGBAFormat);

	//material.map.needsUpdate = true;

  var earthMesh = new THREE.Mesh(geometry, material);
  //console.log(map.noise);
  //console.log(map.noise.length,map.noise);
  return {
    planet : earthMesh,
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
