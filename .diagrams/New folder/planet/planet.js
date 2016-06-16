var canvas = document.getElementById("universe");
if (canvas !=null ){
	canvas.width = window.innerWidth*5;
	canvas.height = window.innerHeight*5;
	var context = canvas.getContext("2d");
}

function renderHexasphere(geometry){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 500;
	scene.add( camera );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild( renderer.domElement );

	var stats = new Stats();
	stats.setMode( 1 ); // 0: fps, 1: ms, 2: mb

	// align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	document.body.appendChild( stats.domElement );
	var update = function () {
			stats.begin();
			stats.end();
			requestAnimationFrame( update );
	};
	requestAnimationFrame( update );

	var material  = new THREE.MeshNormalMaterial({color : '#'+Math.floor(Math.random()*16777215).toString(16)});

	var mesh = new THREE.Mesh(geometry, material);
	var light = new THREE.AmbientLight(0xffffff);

	scene.add(light);
	scene.add(mesh);

	var rotation = 0;

	function render() {
		requestAnimationFrame( render );
		renderer.render( scene, camera );
		mesh.rotation.x -= 0.005;
		mesh.rotation.y -= 0.005;
		mesh.rotation.z -= 0.005;
	}
	render();
}

function createHexasphere(){

	var time = Date.now();
	var hexasphere = new Hexasphere(100,16,50);

	console.log(Date.now()-time);
	console.log(hexasphere.tiles.length);
	var count = 0;

	var geometry = new THREE.Geometry();
	for(var i = 0; i< hexasphere.tiles.length; i++){
			var t = hexasphere.tiles[i];
			var c = count;
			for(var j = 0; j< t.boundary.length; j++){
					var bp = t.boundary[j];
					var vec = new THREE.Vector3(bp.x, bp.y, bp.z);
					geometry.vertices.push(vec);
					count ++;
			}
			var f1 = new THREE.Face3(c+2,c+1,c);
			f1.centroid = t.centerPoint;
			var f2 = new THREE.Face3(c+3,c+2,c);
			f2.centroid = t.centerPoint;
			var f3 = new THREE.Face3(c+4,c+3,c);
			f3.centroid = t.centerPoint;
			geometry.faces.push(f1);
			geometry.faces.push(f2);
			geometry.faces.push(f3);
			cTiles = [c,c+1,c+2,c+3,c+4];

			if(t.boundary.length==6){
				var f4 = new THREE.Face3(c+5,c+4,c);
				f4.centroid = t.centerPoint;
				geometry.faces.push(f4);
				cTiles.push(c+5);
			}
			//drawTile(geometry.vertices,cTiles,t.centerPoint);
	}

	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	for (var i =0;i<geometry.faces.length;i++){
		var c = new THREE.Vector3(geometry.faces[i].centroid.x,geometry.faces[i].centroid.y,geometry.faces[i].centroid.z);
		if (c.normalize().distanceToSquared(geometry.faces[i].normal.normalize())>=0.5){
			var tmp = geometry.faces[i].c;
			geometry.faces[i].c = geometry.faces[i].a;
			geometry.faces[i].a = tmp;
		}
	}

	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	return geometry;
}
var time = Date.now();
var g = createHexasphere();
console.log(Date.now()-time);
var time = Date.now();
renderHexasphere(g);
console.log(Date.now()-time);
