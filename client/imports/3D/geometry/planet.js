import {Texture} from "/client/imports/texture";
import {Three} from "/client/imports/three";
import {Random} from "/imports/random";
import "/imports/random";

var THREE = Three;


var size = 1024;

function createPlanet(planet){
  var geometry   = new THREE.SphereGeometry(100,32,32);
  THREE.ImageUtils.crossOrigin = '';
  console.log(planet);
  var rnd = new Math.seedrandom(planet.id);
  var map;

  var sss = Date.now();

  map = Texture.full(planet.id,size,size/2,rnd);

  console.log(Date.now()-sss);
  rnd = new Math.seedrandom(planet.id);

  var camps = [];
  for (var i=0;i<4;i++){
    var index = Random.number(0,map.noise.length,rnd);
    var u = ~~(index/size);
    var v = index%size;
    var theta = 2 * Math.PI * u;
    var phi = Math.PI * v;

    var x = Math.cos(u) * Math.sin(v) * planet.radius;
    var y = Math.sin(u) * Math.sin(v) * planet.radius;
    var z = Math.cos(v) * planet.radius;

    camps.push(new THREE.Vector3(x,y,z));
  }

  var material = new THREE.MeshPhongMaterial();
	material.map = new THREE.DataTexture(map.color,size,size/2,THREE.RGBAFormat);

	material.map.needsUpdate = true;

  var earthMesh = new THREE.Mesh(geometry, material);
  return earthMesh;
}


export const Planet = {
  create : createPlanet,
}

/*
$("#renderer").on("mousemove",function(e){
  mouse.x = ( e.offsetX / $(this).width() ) * 2 - 1;
  mouse.y = - ( e.offsetY / $(this).height() ) * 2 + 1;
  mouse.z = 1;
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObject( p , true );
  if (intersects.length > 0){
    if (intersects[0].object.uuid == cube1.uuid){
      console.log("muahaha");
    }
    var x = Math.round(intersects[0].uv.x * size);
    var y = Math.round(intersects[0].uv.y * size/2);
    return;

    var r = intersects[0].object.material.map.image.data[(y * (size) + x)*4];
    var g = intersects[0].object.material.map.image.data[(y * (size) + x)*4+ 1];
    var b = intersects[0].object.material.map.image.data[(y * (size) + x)*4+ 2];

    test.x = intersects[0].point.x;
    test.y = intersects[0].point.y;
    test.z = intersects[0].point.z;

    intersects[0].object.parent.worldToLocal(test);
    line.geometry.vertices[1] = test.multiplyScalar(1.5);
    //line.material.color.x = r/255;
    //line.material.color.y = g/255;
    //line.material.color.z = b/255;
    line.material.needsUpdate = true;
    line.geometry.verticesNeedUpdate = true;

    $("#display").css("background-color","rgba("+r+","+g+","+b+",1)");
  }
});
*/
