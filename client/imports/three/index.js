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
	var p = this.vertices;
	this.test.triangles = [];
	var xx = 666;
	var yy = 555;
	var zz = 444;

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
		xx = this.vertices[i].x;
		yy = this.vertices[i].y;
		zz = this.vertices[i].z;
		var f = reg();
		that.test.vertices[f.index].x *= radius;
		that.test.vertices[f.index].y *= radius;
		that.test.vertices[f.index].z *= radius;
		this.vertices[i].index = f.index;
	}

	for ( var i = 0, l = faces.length; i < l; i ++ ) {
		subdiv(faces[i],1);
		subdivide( faces[ i ], 0 );

	}
	console.log(this.test.vertices.length + " number of vertices");

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


	for ( var i = 0, l = this.vertices.length; i < l; i ++ ) {
		this.vertices[ i ].multiplyScalar( radius );
	}

	// Merge vertices

	this.mergeVertices();
  this.computeFaceNormals();

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
    ).multiplyScalar( radius+1 );

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

		var v = {x:xx,y:yy,z:zz};
		v.index = that.test.vertices.length;
		that.test.vertices.push(v);
		return v;
	}

	function subdiv(face,it){
		it = 1;
		var a = that.test.vertices[face.a];
		var b = that.test.vertices[face.b];
		var c = that.test.vertices[face.c];
		var top = [];
		var bottom = [];
		var v1;
		var v2;
		var t=null;
		var i,j;
		for (i=1;i<=it+1;i++){
			xx = a.x + i*((b.x-a.x)/(it+1));
			yy = a.y + i*((b.y-a.y)/(it+1));
			zz = a.z + i*((b.z-a.z)/(it+1));
			v1 = reg();
			bottom.push(v1);
			xx = a.x + i*((c.x-a.x)/(it+1));
			yy = a.y + i*((c.y-a.y)/(it+1));
			zz = a.z + i*((c.z-a.z)/(it+1));
			v2 = reg();
			if (i==1)that.test.triangles.push({a : a.index, b: v1.index,c:v2.index});
			t = null;
			for (j=1;j<=i-1;j++){
				xx = v1.x + j*((v2.x-v1.x)/i);
				yy = v1.y + j*((v2.y-v1.y)/i);
				zz = v1.z + j*((v2.z-v1.z)/i);
				t	= reg();
				if (top[j-1]){
					that.test.triangles.push({a:bottom[bottom.length-1].index,b:top[j-1].index,c:t.index});
				}
				if (top[j]){
					that.test.triangles.push({a: top[j].index,b:top[j-1].index,c :t.index});
				}
				bottom.push(t);
			}
			if (t){
				that.test.triangles.push({a: top[top.length-1].index,b:t.index,c :v2.index});
			}
			bottom.push(v2);
			top = bottom;
			bottom = [];
		}
		//console.log(top,bottom)
	}



























	function subdivide( face, detail ) {

		var cols = Math.pow( 2, detail );
		var a = prepare( that.vertices[ face.a ] );
		var b = prepare( that.vertices[ face.b ] );
		var c = prepare( that.vertices[ face.c ] );
		var v = [];

		// Construct all of the vertices for this subdivision.

		for ( var i = 0 ; i <= cols; i ++ ) {

			v[ i ] = [];

			var aj = prepare( a.clone().lerp( c, i / cols ) );
			var bj = prepare( b.clone().lerp( c, i / cols ) );
			var rows = cols - i;

			for ( var j = 0; j <= rows; j ++ ) {

				if ( j === 0 && i === cols ) {

					v[ i ][ j ] = aj;

				} else {

					v[ i ][ j ] = prepare( aj.clone().lerp( bj, j / rows ) );

				}

			}

		}

		// Construct all of the faces.

		for ( var i = 0; i < cols ; i ++ ) {

			for ( var j = 0; j < 2 * ( cols - i ) - 1; j ++ ) {

				var k = Math.floor( j / 2 );

				if ( j % 2 === 0 ) {

					make(
						v[ i ][ k + 1 ],
						v[ i + 1 ][ k ],
						v[ i ][ k ]
					);

				} else {

					make(
						v[ i ][ k + 1 ],
						v[ i + 1 ][ k + 1 ],
						v[ i + 1 ][ k ]
					);

				}

			}

		}

	}


	// Angle around the Y axis, counter-clockwise when looking from above.

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

};

THREE.HexasphereGeometry.prototype = Object.create( THREE.Geometry.prototype );
THREE.HexasphereGeometry.prototype.constructor = THREE.HexasphereGeometry;

export {Three};
