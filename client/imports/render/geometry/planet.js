import {Texture} from "/client/imports/render/texture";
import {Three} from "/client/imports/render/three";
import "/imports/random";
console.log(Texture);

var renderer = null;
var THREE = Three;
//=======================================================================================================
var planet_templates = {
  earth : {
    min_radius : 2,
    max_radius : 8,
    persistence : 0.5,
    scale : 0.006,
    colormap : 0,
  },
}


var rng = {

  number : function(min,max,rnd){
    if (!rnd){
      rnd = Math.random;
    }
    if (!min && min != 0 ){
      min = 0;
    }
    if (!max && max != 0 ){
      max =  Number.MAX_SAFE_INTEGER-100;
    }
    return Math.floor(rnd() * (max - min + 1)) + min;
  }

};


//=======================================================================================================


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
	if (!renderer) renderer =  new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.id = "renderer";
	var displ = $("#display");
	displ.empty();
	displ.append(renderer.domElement);
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

var save = true;
var pako = require("pako");

function getMap(){
  if (save && localStorage.getItem("texture")){
    return null;
    return pako.inflate(localStorage.getItem("texture"));
  }
  else{
    return null;
  }
}

function saveMap(map){
  if (save && !localStorage.getItem("texture")){
    //console.log(pako.deflate(map));
    //localStorage.setItem("texture",pako.deflate(map));
  }
}

function showPlanet(p){
	var renderer = createRenderer();
	var scene = createScene();
	var camera = createCamera();




	scene.add( camera );

	var geometry   = new THREE.SphereGeometry(100,32,32);
	THREE.ImageUtils.crossOrigin = '';




	var size = 1024;

	var rnd = new Math.seedrandom(p._id);


	var map = getMap();

  var sss = Date.now();
  map = Texture.full(size,size/2,rnd);
  console.log(Date.now()-sss);

	var material = new THREE.MeshPhongMaterial();
	material.map = new THREE.DataTexture(map.color,size,size/2,THREE.RGBAFormat);

	material.map.needsUpdate = true;


  var canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size/2;
  canvas.id = "testcanvas";
  var ctx = canvas.getContext('2d');
  var imgData = ctx.createImageData(size,size/2);
  var test = {};
  for (var i=0;i<imgData.data.length;i++)
  {
    test[map.color[i]] = true;
    imgData.data[i]=map.color[i];
  }
  console.log(test);
  ctx.putImageData(imgData,0,0);
  $("#display").append(canvas);
  //$("#renderer")[0].getContext("2d").putImageData(map.color,0,0);
  $("#testcanvas").on("mousemove",function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var d = e.target.getContext("2d").getImageData(x,y,1,1).data;
    console.log(e.target.getContext("2d").getImageData(x,y,1,1).data);
    $("#display").css("background-color","rgba("+d[0]+","+d[1]+","+d[2]+",1)");
  })
	var earthMesh = new THREE.Mesh(geometry, material);

	var p = new THREE.Object3D();

	p.add(earthMesh);

	var material = new THREE.LineBasicMaterial({
  	color: 0xffffff
  });

	geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(850, 850, 850));
  geometry.dynamic = true;
	var line = new THREE.Line(geometry, material);

  p.add(line);
	p.orbit = {x:0,y:(Math.random() * (0.001 - 0.01) + 0.01),z:  (Math.random() * (0.001 - 0.01) + 0.01)  };
	scene.add(p);

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set( 1, 1, 0 );
	//scene.add( directionalLight );
	light = new THREE.AmbientLight( 0xffffff, 1, 0 );
	scene.add( light );




  var raycaster = new THREE.Raycaster(); // create once
  var mouse = new THREE.Vector3(); // create once


  $("#renderer").on("mousemove",function(e){
    mouse.x = ( e.offsetX / $(this).width() ) * 2 - 1;
    mouse.y = - ( e.offsetY / $(this).height() ) * 2 + 1;
    mouse.z = 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObject( earthMesh , true );
    if (intersects.length > 0){
      var x = Math.round(intersects[0].uv.x * size);
      var y = Math.round(intersects[0].uv.y * size/2);
      var r = intersects[0].object.material.map.image.data[(y * (size/2) + x)*4];
      var g = intersects[0].object.material.map.image.data[(y * (size/2) + x)*4 + 1];
      var b = intersects[0].object.material.map.image.data[(y * (size/2) + x)*4 + 2];
      console.log(x,y,x*size+y,r,g,b);
      line.geometry.vertices[1] = intersects[0].point.multiplyScalar(1.5);
      line.material.color.x = r/255;
      line.material.color.y = g/255;
      line.material.color.z = b/255;
      line.material.needsUpdate = true;
      line.geometry.verticesNeedUpdate = true;
    }
  });

	updateRender(renderer,scene,camera,[p]);


}

function createAndTexturePlanet(p,d){
	var rnd = new Math.seedrandom(p);
	var keys = Object.keys( planet_templates );
	var index = rng.number(0,keys.length-1,rnd);
	var t = planet_templates[keys[index]];



	var radius = rng.number(t.min_radius,t.max_radius,rnd);

	var size = 64;

	var map = Texture.full(size,size/2,rnd);


	var p = new THREE.Object3D();
	var g = new THREE.SphereGeometry(radius, 32, 32);

	var material = new THREE.MeshPhongMaterial();

	material.map = new THREE.DataTexture(map.color,size,size/2,THREE.RGBAFormat);
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


export const Geometry = {
	showPlanet : showPlanet,
	showSystem : showSystem,
}
