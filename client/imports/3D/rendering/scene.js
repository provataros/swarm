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
	//console.log(planet);
	scene.add( camera );



//311 278 318742 225 220 207
// /310 283 317723 38 114 49
	var p = new THREE.Object3D();


	p.add(planet.planet);

	var material = new THREE.LineBasicMaterial({
  	color: 0xffffff
  });

	console.log(planet);
	var sss = Date.now();
	for (var i =0;i<planet.planet.geometry.tiles.length;i++){
		continue;
		var tile = new THREE.Geometry();
		var t = planet.planet.geometry.tiles[i];
		var c = planet.planet.geometry.vertices[t.center];

		tile.vertices = $.merge([new THREE.Vector3(c.x,c.y,c.z)],t);
		tile.faces.push(new THREE.Face3(0,1,2))
		tile.faces.push(new THREE.Face3(0,2,3))
		tile.faces.push(new THREE.Face3(0,3,4))
		tile.faces.push(new THREE.Face3(0,4,5))
		tile.faces.push(new THREE.Face3(0,5,1))
		var meshh = new THREE.Mesh(tile , new THREE.MeshBasicMaterial( { color: new THREE.Color( Math.random(), Math.random(), Math.random() ) ,side : THREE.DoubleSide} ) );
		p.add(meshh);
	}

  console.log(Date.now()-sss);
	for (var i =0;i<planet.extra.camps.length;i++){
		/*var camp = new THREE.Mesh( new THREE.SphereGeometry(2,8,8), new THREE.MeshNormalMaterial() );
	  camp.position.copy(planet.extra.camps[i]);
		p.add(camp);*/
	}





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
	var size = 1024;

	$("#renderer").on("mousemove",function(e){
		return;
		mouse.x = ( e.offsetX / $(this).width() ) * 2 - 1;
		mouse.y = - ( e.offsetY / $(this).height() ) * 2 + 1;
		mouse.z = 1;
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObject( planet.planet , true );
		if (intersects.length > 0){
			var x = Math.round(intersects[0].uv.x * size);
			var y = Math.round(intersects[0].uv.y * size/2);

			console.log(x,y,intersects[0].point,(y * (size) + x));

			var r = intersects[0].object.material.map.image.data[(y * (size) + x)*4];
			var g = intersects[0].object.material.map.image.data[(y * (size) + x)*4+ 1];
			var b = intersects[0].object.material.map.image.data[(y * (size) + x)*4+ 2];

			test.x = intersects[0].point.x;
			test.y = intersects[0].point.y;
			test.z = intersects[0].point.z;

			return;

			intersects[0].object.parent.worldToLocal(test);
			line.geometry.vertices[1] = test.multiplyScalar(1.5);
			line.material.color.x = r/120;
			line.material.color.y = g/120;
			line.material.color.z = b/120;
			line.material.needsUpdate = true;
			line.geometry.verticesNeedUpdate = true;

			$("#display").css("background-color","rgba("+r+","+g+","+b+",1)");
		}
	});

	updateRender(scene,camera,[p]);
}

export const Scene = {
	showPlanet : showPlanet,
}
