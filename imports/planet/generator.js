import {Random} from "/imports/random";

function Generate(id){
  var rnd = new Math.seedrandom(id);
  var planet = {
    id : id,
    radius : Random.number(70,110,rnd),
    camps : [
      Random.number(1,10,rnd),
      Random.number(1,10,rnd),
      Random.number(1,10,rnd),
    ],
    type : Random.number(0,2,rnd),
  }
  console.log(planet);
  return planet;
}

export const generate = Generate
