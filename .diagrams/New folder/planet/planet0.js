var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 100;
scene.add( camera );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

var tao = 1.61803399;
var corners = [
	 new THREE.Vector3(1, tao * 1, 0),
	 new THREE.Vector3(-1, tao * 1, 0),
	 new THREE.Vector3(1,-tao * 1,0),
	 new THREE.Vector3(-1,-tao * 1,0),
	 new THREE.Vector3(0,1,tao * 1),
	 new THREE.Vector3(0,-1,tao * 1),
	 new THREE.Vector3(0,1,-tao * 1),
	 new THREE.Vector3(0,-1,-tao * 1),
	 new THREE.Vector3(tao * 1,0,1),
	 new THREE.Vector3(-tao * 1,0,1),
	 new THREE.Vector3(tao * 1,0,-1),
	 new THREE.Vector3(-tao * 1,0,-1)
];



var faces = [
       new THREE.Face3(corners[0], corners[1], corners[4]),
       new THREE.Face3(corners[1], corners[9], corners[4]),
       new THREE.Face3(corners[4], corners[9], corners[5]),
       new THREE.Face3(corners[5], corners[9], corners[3]),
       new THREE.Face3(corners[2], corners[3], corners[7]),
       new THREE.Face3(corners[3], corners[2], corners[5]),
       new THREE.Face3(corners[7], corners[10], corners[2]),
       new THREE.Face3(corners[0], corners[8], corners[10]),
       new THREE.Face3(corners[0], corners[4], corners[8]),
       new THREE.Face3(corners[8], corners[2], corners[10]),
       new THREE.Face3(corners[8], corners[4], corners[5]),
       new THREE.Face3(corners[8], corners[5], corners[2]),
       new THREE.Face3(corners[1], corners[0], corners[6]),
       new THREE.Face3(corners[11], corners[1], corners[6]),
       new THREE.Face3(corners[3], corners[9], corners[11]),
       new THREE.Face3(corners[6], corners[10], corners[7]),
       new THREE.Face3(corners[3], corners[11], corners[7]),
       new THREE.Face3(corners[11], corners[6], corners[7]),
       new THREE.Face3(corners[6], corners[0], corners[10]),
       new THREE.Face3(corners[9], corners[1], corners[11])
   ];

var geom = new THREE.Geometry();



for (var i=0;i<corners.length;i++){
	geom.vertices.push(corners[i]);
}



for (var i=0;i<faces.length;i++){
	geom.faces.push( faces[i] );

}

geom.computeFaceNormals();

var mesh= new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );
scene.add(mesh);

renderer.render( scene, camera );
