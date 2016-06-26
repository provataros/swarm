import Three from "./three.js";

var THREE = Three;

THREE.HexasphereGeometry = function (radius, detail ) {

	THREE.Geometry.call( this );

  var t = ( 1 + Math.sqrt( 5 ) ) / 2;

  var vertices = [
		- 1,  t,  0,    1,  t,  0,   - 1, - t,  0,    1, - t,  0,
		 0, - 1,  t,    0,  1,  t,    0, - 1, - t,    0,  1, - t,
		 t,  0, - 1,    t,  0,  1,   - t,  0, - 1,   - t,  0,  1
	];

	var indices = [
		 0, 11,  5,    0,  5,  1,    0,  1,  7,    0,  7, 10,    0, 10, 11,
		 1,  5,  9,    5, 11,  4,   11, 10,  2,   10,  7,  6,    7,  1,  8,
		 3,  9,  4,    3,  4,  2,    3,  2,  6,    3,  6,  8,    3,  8,  9,
		 4,  9,  5,    2,  4, 11,    6,  2, 10,    8,  6,  7,    9,  8,  1
	];



	this.type = 'IcosahedronGeometry';
	this.parameters = {
		vertices: vertices,
		indices: indices,
		radius: radius,
		detail: detail
	};

	radius = radius || 1;
	detail = detail || 0;

	var that = this;

	for ( var i = 0, l = vertices.length; i < l; i += 3 ) {

		prepare( new THREE.Vector3( vertices[ i ], vertices[ i + 1 ], vertices[ i + 2 ] ) );

	}
	this.test = {};
	this.test.vertices = [];
	this.test.faces = [];
	this.test.centers = [];
	this.test.hex = [];
	this.test.sides = {};
	this.test.penta = {};
	var p = this.vertices;
	this.test.triangles = [];
	var xx = 666;
	var yy = 555;
	var zz = 444;
	var vert = null;
	var faces = [];

	for ( var i = 0, j = 0, l = indices.length; i < l; i += 3, j ++ ) {

		var v1 = p[ indices[ i ] ];
		var v2 = p[ indices[ i + 1 ] ];
		var v3 = p[ indices[ i + 2 ] ];

		faces[ j ] = new THREE.Face3( v1.index, v2.index, v3.index, [ v1.clone(), v2.clone(), v3.clone() ] );
	}

	var centroid = new THREE.Vector3();
  var dict = {};
	var edges = {}


	for (var i=0;i<this.vertices.length;i++){
		vert = this.vertices[i];
		var f = reg();
		that.test.vertices[f.index].x *= radius;
		that.test.vertices[f.index].y *= radius;
		that.test.vertices[f.index].z *= radius;
		this.vertices[i].index = f.index;
	}

	var helper = {};
	//console.log(helper);
	console.log(faces);
	for ( var i = 0, l = faces.length; i < l; i ++ ) {
		subdiv(faces[i], detail);
		//subdivide( faces[ i ], it );
	}
	join();
	//console.log(helper);
	//console.log(this.test.vertices.length + " number of vertices");

	//console.log(that.test.vertices.length,that.test.vertices);
	// Handle case when face straddles the seam

	for ( var i = 0, l = this.faceVertexUvs[ 0 ].length; i < l; i ++ ) {

		var uvs = this.faceVertexUvs[ 0 ][ i ];

		var x0 = uvs[ 0 ].x;
		var x1 = uvs[ 1 ].x;
		var x2 = uvs[ 2 ].x;

		var max = Math.max( x0, x1, x2 );
		var min = Math.min( x0, x1, x2 );

		if ( max > 0.9 && min < 0.1 ) {

			// 0.9 is somewhat arbitrary

			if ( x0 < 0.2 ) uvs[ 0 ].x += 1;
			if ( x1 < 0.2 ) uvs[ 1 ].x += 1;
			if ( x2 < 0.2 ) uvs[ 2 ].x += 1;

		}

	}


	// Merge vertices
  //this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius );



	// Project vector onto sphere's surface

	function prepare( vector ) {

		var vertex = vector.normalize().clone();
		vertex.index = that.vertices.push( vertex ) - 1;

		// Texture coords are equivalent to map coords, calculate angle and convert to fraction of a circle.

		var u = azimuth( vector ) / 2 / Math.PI + 0.5;
		var v = inclination( vector ) / Math.PI + 0.5;
		vertex.uv = new THREE.Vector2( u, 1 - v );

		return vertex;

	}


	// Approximate a curved face with recursively sub-divided triangles.



  function assoc(e,a){
    if (dict[e])dict[e].push(a);
    else dict[e] = [a];
  }

	function side(e1,e2,c){
		var key;
		if (e1>e2){
			key = e2 + "_" + e1;
		}
		else{
			key = e1 + "_" + e2;
		}
    if (edges[key]){
			edges[key].push(c);
		}
		else{
			edges[key] = [c];
		}
  }


	function make( v1, v2, v3 ) {
		var face = new THREE.Face3( v1.index, v2.index, v3.index, [ v1.clone(), v2.clone(), v3.clone() ] );
    face.centroid = new THREE.Vector3(
      (v1.x + v2.x + v3.x ) / 3,
      (v1.y + v2.y + v3.y ) / 3,
      (v1.z + v2.z + v3.z ) / 3,
    ).multiplyScalar( radius );

    assoc(v1.index,face.centroid);
    assoc(v2.index,face.centroid);
    assoc(v3.index,face.centroid);


		side(v1.index,v2.index,face.centroid);
		side(v2.index,v3.index,face.centroid);
		side(v3.index,v1.index,face.centroid);

		that.faces.push( face );

		centroid.copy( v1 ).add( v2 ).add( v3 ).divideScalar( 3 );

		var azi = azimuth( centroid );

		that.faceVertexUvs[ 0 ].push( [
			correctUV( v1.uv, v1, azi ),
			correctUV( v2.uv, v2, azi ),
			correctUV( v3.uv, v3, azi )
		] );

	}


	// Analytically subdivide a face to the required detail level.

	function reg(){

		var v = {x:vert.x,y:vert.y,z:vert.z};
		v.index = that.test.vertices.length;
		that.test.vertices.push(v);
		return v;
	}



	function split(a,b,it){

		var edge = [];
		var min = Math.min(a.index,b.index);
		var max = Math.max(a.index,b.index)
		var done = helper[min] && helper[min][max]
		if (!done){
			for (var i=1;i<it+1;i++){
				edge.push({
					x : a.x + i*((b.x-a.x)/(it+1)),
					y : a.y + i*((b.y-a.y)/(it+1)),
					z : a.z + i*((b.z-a.z)/(it+1)),
				})
			}
			if (!helper[min])helper[min] = {};
			edge = registerVertices(edge);
			if (a.index > b.index)edge.r = true;
			helper[min][max] = edge;
			return edge;
		}
		else{
			var tmp = helper[min][max];
			return (tmp.r && (a.index < b.index) )|| (!tmp.r && (a.index > b.index))? $.merge([],helper[min][max]).reverse() : helper[min][max];
		}
	}

	function registerVertices(s){
		for (var i=0;i<s.length;i++){
			vert = s[i];
			s[i] = reg();
		}
		return s;
	}


	function triangle(a,b,c){
		var o = that.test.centers.length;
		var center = new THREE.Vector3(
			(a.x + b.x + c.x)/3,
			(a.y + b.y + c.y)/3,
			(a.z + b.z + c.z)/3
		);
		center.setLength(radius+0.5);
		that.test.centers.push(center);
		that.test.triangles.push({
			a : a.index,
			b : b.index,
			c : c.index,
		});
		return o;
	}

	function subdiv(face,it){

		//split(faces[i],3);

		var a = that.test.vertices[face.a];
		var b = that.test.vertices[face.b];
		var c = that.test.vertices[face.c];
		var top = [];
		var bottom = [];
		var stack = [];
		var cents = [];

		var sidesa = [];
		var sidesb = [];
		var sidesc = [];

		var side = [];
		var v1;
		var v2;
		var t=null;
		var i,j;

		var s1 = split(a,b,it);
		var s2 = split(a,c,it);
		var s3 = split(b,c,it);

		var r1 = a.index > b.index;
		var r2 = a.index > c.index;
		var r3 = b.index > c.index;

		var m1,m2,m3,M1,M2,M3;
		m1 = Math.min(a.index,b.index);
		m2 = Math.min(a.index,c.index);
		m3 = Math.min(b.index,c.index);
		M1 = Math.max(a.index,b.index);
		M2 = Math.max(a.index,c.index);
		M3 = Math.max(b.index,c.index);

		if (!that.test.sides[m1])that.test.sides[m1] = {};
		if (!that.test.sides[m1][M1])that.test.sides[m1][M1] = [];
		if (!that.test.sides[m2])that.test.sides[m2] = {};
		if (!that.test.sides[m2][M2])that.test.sides[m2][M2] = [];
		if (!that.test.sides[m3])that.test.sides[m3] = {};
		if (!that.test.sides[m3][M3])that.test.sides[m3][M3] = [];

		for (i=0;i<=it;i++){
			if (true || i!=it){
				bottom = [];
				cents = [];
				v1 = i==it?b:s1[i];
				v2 = i==it?c:s2[i];
				bottom.push(v1);
				if (i==0){
					cents.push(triangle(a,v1,v2));
				}
				t = null;
				for (j=1;j<=i;j++){
					if (i != it){
						vert = {
							x	: v1.x + j*((v2.x-v1.x)/(i+1)),
							y : v1.y + j*((v2.y-v1.y)/(i+1)),
							z : v1.z + j*((v2.z-v1.z)/(i+1)),
						}
						t = reg();
					}
					else{
						t = s3[j-1];
					}

					if (top[j-1]){
						cents.push(triangle(bottom[bottom.length-1],top[j-1],t));
					}
					if (top[j]){
						cents.push(triangle(top[j],top[j-1],t));
					}
					bottom.push(t);
				}
				if (t){
					cents.push(triangle(top[top.length-1],t,v2));
				}

				if (i>=2){
					for (var k=1;k<top.length-1;k++){
						var tile = [stack[i-1][2*k - 2],stack[i-1][2*k - 1],stack[i-1][2*k],cents[2*k+1],cents[2*k],cents[2*k-1]];
						tile.c = top[k];
						createTile(tile);
					}
				}
			}
			var half;
			if (i >= 1){
				half = [stack[stack.length-1][0],cents[1],cents[0]];
				half.c = s1[i-1];
				sidesa.push(half);
				half = [stack[stack.length-1][stack[stack.length-1].length-1],cents[cents.length-2],cents[cents.length-1]];
				half.c = s2[i-1];
				sidesb.push(half);
			}
			if (i == it){
				var k;
				for (var j = 0,k=0;j<cents.length - 2;j+=2,k++){
					half = [cents[j],cents[j+1],cents[j+2]];
					half.c = s3[k];
					sidesc.push(half);
				}
			}
			if (i!=it){
				bottom.push(v2);
				top = bottom;
				stack.push(cents);
			}
			//console.log(side);
		}
		//end of loop

		sidesa.r = r1;
		that.test.sides[m1][M1].push(sidesa);
		sidesb.r = r2;
		that.test.sides[m2][M2].push(sidesb);
		sidesc.r = r3;
		that.test.sides[m3][M3].push(sidesc);
		stack.push(cents);


		if (!that.test.penta[a.index]){
			that.test.penta[a.index] = {l : [],r : [],c : []};
		}
		if (!that.test.penta[b.index]){
			that.test.penta[b.index] = {l : [],r : [],c : []};
		}
		if (!that.test.penta[c.index]){
			that.test.penta[c.index] = {l : [],r : [],c : []};
		}
		that.test.penta[a.index].c.push(stack[0][0]);
		that.test.penta[a.index].l.push(b.index);
		that.test.penta[a.index].r.push(c.index);

		that.test.penta[b.index].c.push(cents[0]);
		that.test.penta[b.index].l.push(c.index);
		that.test.penta[b.index].r.push(a.index);

		that.test.penta[c.index].c.push(cents[cents.length-1]);
		that.test.penta[c.index].l.push(a.index);
		that.test.penta[c.index].r.push(b.index);


	}



	function azimuth( vector ) {

		return Math.atan2( vector.z, - vector.x );

	}


	// Angle above the XZ plane.

	function inclination( vector ) {

		return Math.atan2( - vector.y, Math.sqrt( ( vector.x * vector.x ) + ( vector.z * vector.z ) ) );

	}


	// Texture fixing helper. Spheres have some odd behaviours.

	function correctUV( uv, vector, azimuth ) {

		if ( ( azimuth < 0 ) && ( uv.x === 1 ) ) uv = new THREE.Vector2( uv.x - 1, uv.y );
		if ( ( vector.x === 0 ) && ( vector.z === 0 ) ) uv = new THREE.Vector2( azimuth / 2 / Math.PI + 0.5, uv.y );
		return uv.clone();

	}

	function createTile(tile){
		if (!that.tiles)that.tiles = [];
		var l = that.tiles.length;
		that.tiles[l] = tile;
		for (var j=0;j<tile.length-2;j++){
			var f = new THREE.Face3(tile[0],tile[j+1],tile[j+2]);
			f.tile = l;
			that.faces.push(f)
		}
	}

	function join(){
		var h1,h2,s1,s2,tile;
		h1 = that.test.sides;
		Object.keys(h1).forEach(function(key,index) {
			Object.keys(h1[key]).forEach(function(key2,index2) {
				h2 = h1[key][key2];
		    s1 = h2[0];
				s2 = h2[1];
				if (s1.s || s2.s){}
				else{
					if (s1[0].c.index != s2[0].c.index){
						s2.reverse();
					}
					for (var i=0;i<s1.length;i++){
						if (s1.r!=s2.r)tile = [s1[i][0],s1[i][1],s1[i][2],s2[i][0],s2[i][1],s2[i][2]];
						else tile = [s1[i][0],s1[i][1],s1[i][2],s2[i][2],s2[i][1],s2[i][0]]
						tile.c = s2[i].c;
						createTile(tile);
					}
				}
			});
		});

		h1 = that.test.penta;
		var l,r,c,i;
		var tile;
		Object.keys(h1).forEach(function(key,index) {
				l = h1[key].l;
				r = h1[key].r;
				c = h1[key].c;
				tile = [c[0]];
				i=0;
				i = l.indexOf(r[i]);
				tile.push(c[i]);
				i = l.indexOf(r[i]);
				tile.push(c[i]);
				i = l.indexOf(r[i]);
				tile.push(c[i]);
				i = l.indexOf(r[i]);
				tile.push(c[i]);
				//tile.c = that.test.hex[0].c;
				createTile(tile);
		});
		that.vertices =  $.merge([],that.test.centers);
	}

};



THREE.HexasphereGeometry.prototype = Object.create( THREE.Geometry.prototype );
THREE.HexasphereGeometry.prototype.constructor = THREE.HexasphereGeometry;

export {Three};
