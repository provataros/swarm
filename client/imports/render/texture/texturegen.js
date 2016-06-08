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
  var img=new Image();
  img.src="./download.png";
  img.onload = function(){

  }
  console.log(img);
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.drawImage(img, 0, 0 );
  if (false){//temnp
    var theData = context.getImageData(0, temp, 256,1).data;
  }
  else{
    var theData = context.getImageData(0, 5, 256,1).data;
  }
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
    var per = 0.6;
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
