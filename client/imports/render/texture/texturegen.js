/*
colormap template


range = maximum noise value;
a = low gradient boundary
b = high gradient boundary

map = [
  {range : r,a:x,b:y},,,
]

*/

import {Noise} from "/client/imports/render/noise";


var datat  = [2,2,88,255,3,3,89,255,3,3,90,255,4,4,91,255,4,5,92,255,5,5,93,255,6,6,94,255,7,7,94,255,7,7,95,255,8,8,96,255,9,8,97,255,10,9,99,255,10,9,100,255,10,10,100,255,11,11,101,255,11,12,102,255,12,12,103,255,13,13,104,255,14,14,105,255,15,14,105,255,16,15,107,255,15,16,108,255,17,16,109,255,17,17,109,255,18,18,110,255,18,18,112,255,19,20,112,255,20,20,114,255,20,21,114,255,21,22,115,255,22,22,116,255,23,22,117,255,24,23,117,255,24,24,119,255,25,24,119,255,26,25,120,255,26,26,122,255,26,27,122,255,27,27,124,255,28,28,124,255,29,28,125,255,30,30,127,255,30,30,127,255,30,31,128,255,32,32,129,255,32,32,129,255,33,33,131,255,33,34,132,255,34,34,133,255,35,34,134,255,35,35,135,255,36,36,135,255,37,37,136,255,38,37,137,255,39,39,139,255,39,39,140,255,40,39,140,255,40,40,141,255,41,41,142,255,42,42,143,255,42,42,144,255,43,42,145,255,43,43,146,255,44,44,146,255,45,45,148,255,46,46,148,255,47,46,149,255,47,47,150,255,47,48,151,255,48,49,152,255,49,49,153,255,50,50,154,255,50,50,155,255,51,51,156,255,51,51,157,255,52,53,157,255,53,53,158,255,54,53,160,255,55,55,160,255,55,55,161,255,56,56,162,255,56,56,164,255,57,57,164,255,58,58,165,255,59,58,166,255,59,59,167,255,59,60,168,255,61,60,169,255,61,61,169,255,62,62,171,255,63,62,172,255,63,63,173,255,64,64,173,255,65,64,175,255,65,65,175,255,66,65,177,255,67,66,177,255,67,67,179,255,68,68,179,255,69,69,180,255,69,69,181,255,70,70,182,255,70,70,183,255,71,71,184,255,72,72,184,255,73,73,185,255,73,73,186,255,74,74,187,255,74,74,188,255,76,76,189,255,78,79,190,255,80,83,191,255,82,86,192,255,84,90,192,255,87,93,193,255,89,96,194,255,92,100,194,255,94,103,195,255,96,107,196,255,98,110,197,255,101,113,197,255,103,117,197,255,105,120,198,255,108,124,200,255,110,127,199,255,112,130,201,255,114,134,201,255,116,137,202,255,119,140,202,255,121,144,203,255,124,147,204,255,125,151,205,255,128,154,205,255,130,157,206,255,132,161,207,255,136,167,208,255,145,172,205,255,154,176,202,255,164,181,199,255,172,186,196,255,182,191,193,255,191,196,190,255,201,201,187,255,210,205,183,255,219,210,181,255,228,215,177,255,212,210,147,255,200,207,140,255,188,204,134,255,176,202,127,255,164,199,120,255,153,197,114,255,140,194,107,255,128,192,101,255,117,189,94,255,104,186,88,255,92,184,81,255,81,182,75,255,69,178,68,255,56,176,63,255,45,173,56,255,32,171,49,255,25,169,45,255,25,165,45,255,27,159,46,255,27,158,46,255,28,157,47,255,29,155,46,255,28,154,46,255,29,152,46,255,29,150,46,255,30,150,46,255,29,148,46,255,31,146,47,255,31,145,47,255,31,143,47,255,31,142,47,255,32,141,47,255,32,139,47,255,32,137,47,255,32,136,47,255,33,134,47,255,33,133,48,255,34,131,48,255,34,130,48,255,35,129,48,255,35,128,48,255,35,126,48,255,35,124,48,255,35,122,48,255,35,121,48,255,36,119,48,255,36,118,49,255,37,117,48,255,37,116,48,255,38,114,49,255,38,112,48,255,38,111,48,255,39,109,49,255,39,108,48,255,39,106,49,255,39,105,48,255,39,103,49,255,41,102,49,255,41,101,49,255,41,99,49,255,41,97,50,255,42,96,49,255,42,94,49,255,42,93,49,255,43,91,50,255,42,90,49,255,45,91,51,255,52,96,55,255,59,100,60,255,66,103,64,255,73,107,68,255,80,111,72,255,87,115,77,255,94,119,82,255,101,123,86,255,108,127,90,255,115,131,94,255,123,136,99,255,130,139,103,255,136,144,108,255,143,148,111,255,150,151,116,255,157,156,121,255,164,160,125,255,172,164,129,255,179,168,134,255,183,170,136,255,186,174,141,255,190,177,147,255,192,181,151,255,195,184,157,255,198,188,162,255,201,192,166,255,204,196,172,255,207,199,177,255,211,202,181,255,214,206,187,255,217,210,191,255,219,213,196,255,222,217,202,255,225,220,207,255,229,224,211,255,231,227,217,255,235,231,221,255,237,234,227,255,241,238,232,255,244,242,237,255,247,245,242,255,250,249,247,255,253,252,252,255]


function sumOctave(num_iterations, x, y,z, persistence, scale, low, high,simplex,d){

  var maxAmp = 0;
  var amp = 1;
  var freq = scale;
  var noise = 0;

  for(var i = 0; i < num_iterations; ++i){
      if (d==2 || !d) {
				noise += simplex.noise2D(x * freq, y * freq) * amp;
			}
			else {
				noise += simplex.noise3D(x * freq, y * freq,z*freq) * amp;
			}
      maxAmp += amp;
      amp *= persistence;
      freq *= 2;
		}
  noise /= maxAmp;
  var OldRange = 2;
  var NewRange = (high - low);
//  if (noise<=-0.95 || noise >= 0.95 )console.log(noise);
  noise = (((noise + 1) * NewRange) / 2) + low;
  return noise;
}


function generateTextureColor(w,h,map){
  var noiseMap = new Uint8Array(w*h*4);
  var c = 0;

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  if (false){//temnp
    var theData = context.getImageData(0, temp, 256,1).data;
  }
  else{
    var theData = context.getImageData(0, 5, 256,1).data;
  }

  theData = datat;
  //console.log(theData);

  for (var j=0;j<h;j++){
    for (var i=0;i<w;i++){
      var n = map[c];
      var index = c*4;
      var last = 0;
      var curr;
      var r;
      /*for (r = 0;r<earthColorMap.length;r++){
        if (n<=earthColorMap[r].range){
          curr = earthColorMap[r].range;
          break;
        }
        last =  earthColorMap[r].range;
      }
      if (r>=earthColorMap.length)r=earthColorMap.length-1;*/
      var p = (n-last)/(curr-last);
      //console.log(r,n);
      /*var red = earthColorMap[r].b[0] * p + earthColorMap[r].a[0] *  (1 - p);
      var green = earthColorMap[r].b[1] * p + earthColorMap[r].a[1] *  (1 - p);
      var blue = earthColorMap[r].b[2] * p + earthColorMap[r].a[2] *  (1 - p);*/
      n = Math.floor(n);
      noiseMap[index] = theData[n*4];
      noiseMap[index + 1] = theData[n*4+1];
      noiseMap[index + 2] = theData[n*4+2];
      noiseMap[index + 3] = 255;
      /*noiseMap[index] = red;
      noiseMap[index + 1] = green;
      noiseMap[index + 2] = blue;
      noiseMap[index + 3] = 255;*/
      c++;
    }
  }
  return noiseMap;
}


function generateTextureGrayScale(w,h,map){

	var noiseMap = new Uint8Array(w*h*4);
	var c = 0;
	for (var j=0;j<h;j++){
		for (var i=0;i<w;i++){
			var n = map[c];
			noiseMap[c*4] = n;
			noiseMap[c*4+1] = n;
			noiseMap[c*4+2] = n;
			noiseMap[c*4+3] = 255;
			c++;
		}
	}

	return noiseMap;
}

function rescaleMap(map,min,max){
  for (var i =0;i<map.length;i++){
    map[i] = (((map[i] - min) * (255 - 0)) / (max - min)) + 0;
  }
  return map;
}

function generateNoiseMap(noiseWidth,noiseHeight,rnd,temp){
	var w = noiseWidth;
	var h = noiseHeight;

	var noiseMap = new Array(w*h);

	var simplex = new Noise.simplex(rnd);

	var radius = 100;
	var c = 0;

	var DEG_TO_RAD = 0.0174533;
  if (temp){
    var per = temp.p;
    var sc = temp.s
  }
  else{
    var per = 0.3;
    var sc = 0.06;
  }


  var min = 999999;
  var max = -999999;

	for (var j=0;j<h;j++){
		for (var i=0;i<w;i++){

			var theta = (2 * Math.PI/w) * i;
			var phi = (Math.PI/h) * j;

			var x = Math.cos(theta) * Math.sin(phi) * radius;
			var y = Math.sin(theta) * Math.sin(phi) * radius;
			var z = -Math.cos(phi) * radius;

			var n = sumOctave(6, x,y,z, per, sc, 0,255,simplex,3);
      if (n<min)min = n;
      if (n>max)max = n;
			noiseMap[c] = n;
			c++;
		}
	}
  var n = rescaleMap(noiseMap,min,max);
  //console.log(n);
	return noiseMap;
}

export const Texture = {
  map : generateNoiseMap,
  color : generateTextureColor,
  gray : generateTextureGrayScale,
};
