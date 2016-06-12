import {Three} from "/client/imports/three";


var THREE = Three;

export function createCamp(id){
  var camp = new THREE.Mesh(new THREE.SphereGeometry(5,8,8), new THREE.MeshNormalMaterial() );
  camp.id = id;
  console.log("this "+id);
}
