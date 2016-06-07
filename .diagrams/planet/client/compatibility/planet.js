var renderer = null;


function updateRender(renderer,scene,camera,mesh){
	///renderer.setClearColor( 0xffffff, 1);
	display.renderer = renderer;
	display.scene = scene;
	display.camera = camera;
	display.mesh = mesh;
	if (!display.running){
		display.running = true;
		display.render();
	}
	else{

	}
}

var display = {
	render : function() {
		//console.log(display);
		requestAnimationFrame( display.render );
		display.renderer.render( display.scene, display.camera );
		if (display.mesh){
			for (var i=0;i<display.mesh.length;i++){
				var m = display.mesh[i];
				//m.rotation.x += m.orbit.x;
				//m.rotation.y += m.orbit.y;
				//m.rotation.z += m.orbit.z;
			}
		}
	}
}


function createRenderer(){
	if (!renderer) renderer =  new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.id = "renderer";

	var display = document.getElementById("display");
	while (display.firstChild) {
			display.removeChild(display.firstChild);
	}
	display.appendChild(renderer.domElement);
	return renderer;
}

function createScene(){
	var scene = new THREE.Scene();

	return scene;
}
function createCamera(){
	var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 500;
	return camera;
}

function showPlanet(p){
	createRenderer();
	var scene = createScene();
	var camera = createCamera();
	scene.add( camera );





	var geometry   = new THREE.SphereGeometry(100,32,32);
	THREE.ImageUtils.crossOrigin = '';



	var size = 512;

	var rnd = new Math.seedrandom(p._id);
	var noiseMap = generateNoiseMap(size,size/2,rnd);
	var texture = generateTextureColor(size,size/2,noiseMap);

	var material = new THREE.MeshPhongMaterial();
	material.map = new THREE.DataTexture(texture,size,size/2,THREE.RGBAFormat);

	material.map.needsUpdate = true;


	var earthMesh = new THREE.Mesh(geometry, material);

	var p = new THREE.Object3D();

	p.add(earthMesh);

	var material = new THREE.LineBasicMaterial({
  	color: 0xffffff
  });

	geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(50, 50, 50));

	var line = new THREE.Line(geometry, material);

  p.add(line);
	p.orbit = {x:0,y:(Math.random() * (0.001 - 0.01) + 0.01),z:  (Math.random() * (0.001 - 0.01) + 0.01)  };
	scene.add(p);

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set( 1, 1, 0 );
	//scene.add( directionalLight );
	light = new THREE.AmbientLight( 0xffffff, 1, 0 );
	scene.add( light );

	updateRender(renderer,scene,camera,[p]);


}

function createAndTexturePlanet(p,d){
	var rnd = new Math.seedrandom(p);
	var keys = Object.keys( planet_templates );
	var index = rng.number(0,keys.length-1,rnd);
	var t = planet_templates[keys[index]];



	var radius = rng.number(t.min_radius,t.max_radius,rnd);

	var size = 64;
	var noiseMap = generateNoiseMap(size,size/2,new Math.seedrandom(p));
	var texture = generateTextureColor(size,size/2,noiseMap);


	var p = new THREE.Object3D();
	var g = new THREE.SphereGeometry(radius, 32, 32);

	var material = new THREE.MeshPhongMaterial();

	material.map = new THREE.DataTexture(texture,size,size/2,THREE.RGBAFormat);
	material.map.needsUpdate = true;
	var m = new THREE.Mesh(g, material);
	if (d>0)m.position.x += d+20;
	//p.orbit = {x:0,y:0,z:  (rnd() * (0.001 - 0.01) + 0.01)  };
	p.add(m);
	return p;
}


function recreatePlanet(id){
	var rnd = new Math.seedrandom(id);
}


function showSystem(s){
	createRenderer();
	var scene = createScene();
	var camera = createCamera();
	scene.add( camera );


	var earthMesh = createAndTexturePlanet(s._id,0);

	scene.add(earthMesh);

	material = new THREE.MeshPhongMaterial();

	var light = new THREE.PointLight( 0xffffff, 1, 0 );
	light.position.set( 0, 0, 0 );
	scene.add( light );
	light = new THREE.AmbientLight( 0xffffff, 1, 0 );
	scene.add( light );


	var planets = [];

	var srnd = new Math.seedrandom(s._id);
	console.log(s);
	srnd();srnd();
	for (var i = 0;i<s.planets.length;i++){
		var distance = rng.number((i+1)*20,(i+1)*20,srnd);

		var p = createAndTexturePlanet(s.planets[i],distance);
		planets.push(p);
		scene.add(p);
	}
	updateRender(renderer,scene,camera,planets);
}
