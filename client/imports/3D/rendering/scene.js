import {Three} from "/client/imports/three";




import "/imports/random";

var THREE = Three;

export function updateRender(scene,camera,mesh){
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
				continue;
				m.rotation.x += m.orbit.x;
				m.rotation.y += m.orbit.y;
				m.rotation.z += m.orbit.z;
			}
		}
	},
	rotate : function(rotation){
		if (display.mesh){
			for (var i=0;i<display.mesh.length;i++){
				var m = display.mesh[i];
				var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(rotation.y * 1),
                toRadians(rotation.x * 1),
                0,
                'XYZ'
            ));

        m.quaternion.multiplyQuaternions(deltaRotationQuaternion, m.quaternion);
			}
		}
	},
	zoom(direction){
		display.camera.fov += direction?0.5:-0.5;
		display.camera.fov = display.camera.fov>50?50:display.camera.fov;
		display.camera.fov = display.camera.fov<1?1:display.camera.fov;
  	display.camera.updateProjectionMatrix();
	}
}

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}

var renderer = null;

export function createRenderer(){
	if (!renderer) renderer =  new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.id = "renderer";
	var displ = $("#display");
	//displ.empty();
	displ.append(renderer.domElement);
	var down = false;
	var old = {};
	$("#renderer").mousedown(function(e){
		down = true;
		old.x = e.offsetX;
		old.y = e.offsetY;
	});
	$("#renderer").mouseup(function(){
		down = false;
	});
	$("#renderer").mousemove(function(e){
		e.stopPropagation();
		e.preventDefault();
		if (down){
			var x = e.offsetX - old.x;
			var y = e.offsetY - old.y;
			old.x = e.offsetX;
			old.y = e.offsetY;
			display.rotate({x:x/10,y:y/10});
		}
	});
	$("#renderer").on("wheel",function(e){
		e.preventDefault();
		e.stopPropagation();
		display.zoom(e.originalEvent.deltaY>=0);
	})
	return renderer;
}



export function createScene(){
	var scene = new THREE.Scene();

	return scene;
}

export function createCamera(){
	var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 500;
	return camera;
}





function showPlanet(planet){
	createRenderer();
	var scene = createScene();
	var camera = createCamera();

	scene.add( camera );



//311 278 318742 225 220 207
// /310 283 317723 38 114 49
	var p = new THREE.Object3D();


	p.add(planet);

	var material = new THREE.LineBasicMaterial({
  	color: 0xffffff
  });

	geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(1200, 1200, 1200));
  geometry.dynamic = true;
	var line = new THREE.Line(geometry, material);

  p.add(line);

  var cube2 = new THREE.Mesh( new THREE.SphereGeometry(5,8,8), new THREE.MeshNormalMaterial() );
  cube2.position.copy(new THREE.Vector3(-60,-60,-60));

  p.add(cube2);

	p.orbit = {x:0,y:(Math.random() * (0.001 - 0.01) + 0.01),z:  (Math.random() * (0.001 - 0.01) + 0.01)  };
	scene.add(p);

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set( 1, 1, 0 );
	//scene.add( directionalLight );
	light = new THREE.AmbientLight( 0xffffff, 1, 0 );
	scene.add( light );

  var raycaster = new THREE.Raycaster(); // create once
  var mouse = new THREE.Vector3(); // create once
  var test = new THREE.Vector3(1,1,1);


	updateRender(scene,camera,[p]);
}

export const Scene = {
	showPlanet : showPlanet,
}
