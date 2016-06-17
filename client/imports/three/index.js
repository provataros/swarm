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

	var p = this.vertices;

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


	for ( var i = 0, l = faces.length; i < l; i ++ ) {
		subdiv(faces[i],4);
		subdivide( faces[ i ], 0 );

	}

	//console.log(edges);
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

	this.mergeVerts = mergeVerts;
  this.mergeVerts();
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



	function subdiv(face,it){
		var a = that.vertices[face.a];
		var b = that.vertices[face.b];
		var c = that.vertices[face.c];

		var left = [];
		var right = [];
		var top = [];

		for (var i=1;i<=it;i++){
			var x = i*((a.x + b.x)/(it+1));
			var y = i*((a.y + b.y)/(it+1));
			var z = i*((a.z + b.z)/(it+1));
			var v1 = new THREE.Vector3(x,y,z);
			left.push(v1);
			x = i*((a.x + c.x)/(it+1));
			y = i*((a.y + c.y)/(it+1));
			z = i*((a.z + c.z)/(it+1));
			var v2 = new THREE.Vector3(x,y,z);
			right.push(v2);

			for (var j=1;j<=i-1;j++){
				x = j*((v1.x + v2.x)/(i));
				y = j*((v1.y + v2.y)/(i));
				z = j*((v1.z + v2.z)/(i));
				var t = new THREE.Vector3(x,y,z);
				top.push(t);
			}

		}
		console.log(left,right,top);
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

  function mergeVerts () {

  		var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
  		var unique = [], changes = [];
      //console.log(dict);
  		var v, key;
  		var precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
  		var precision = Math.pow( 10, precisionPoints );
  		var i, il, face;
  		var indices, j, jl;
      var un = 0;
  		for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

  			v = this.vertices[ i ];
  			key = Math.round( v.x * precision ) + '_' + Math.round( v.y * precision ) + '_' + Math.round( v.z * precision );

  			if ( verticesMap[ key ] === undefined ) {

  				verticesMap[ key ] = i;
  				unique.push( this.vertices[ i ] );
  				changes[ i ] = unique.length - 1;
          if (!dict[verticesMap[ key ]])dict[verticesMap[ key ]] = [];
          un++;
  			} else {

  				//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
  				changes[ i ] = changes[ verticesMap[ key ] ];
          if (dict[i]) $.merge(dict[verticesMap[ key ]],dict[i]);
  			}

  		}
      this.tiles = [];
      for (var i=0;i<unique.length;i++){
        var j = unique[i].index;
        dict[j].center = i;
        this.tiles.push(dict[j]);
      }


  		// if faces are completely degenerate after merging vertices, we
  		// have to remove them from the geometry.
  		var faceIndicesToRemove = [];

			console.log(this.faces.length);
  		for ( i = 0, il = this.faces.length; i < il; i ++ ) {

  			face = this.faces[ i ];

  			face.a = changes[ face.a ];
  			face.b = changes[ face.b ];
  			face.c = changes[ face.c ];

  			indices = [ face.a, face.b, face.c ];

  			var dupIndex = - 1;

  			// if any duplicate vertices are found in a Face3
  			// we have to remove the face as nothing can be saved
  			for ( var n = 0; n < 3; n ++ ) {

  				if ( indices[ n ] === indices[ ( n + 1 ) % 3 ] ) {

  					dupIndex = n;
  					faceIndicesToRemove.push( i );
						console.log(i);
  					break;

  				}

  			}

  		}


			//console.log(faceIndicesToRemove);

  		for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {

  			var idx = faceIndicesToRemove[ i ];

  			this.faces.splice( idx, 1 );

  			for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

  				this.faceVertexUvs[ j ].splice( idx, 1 );

  			}

  		}

  		// Use unique set of vertices

  		var diff = this.vertices.length - unique.length;
  		this.vertices = unique;

						console.log(this.faces.length);
  		return diff;

  	}




};

THREE.HexasphereGeometry.prototype = Object.create( THREE.Geometry.prototype );
THREE.HexasphereGeometry.prototype.constructor = THREE.HexasphereGeometry;

export {Three};
