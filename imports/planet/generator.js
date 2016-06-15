import {Random} from "/imports/random";

function Generate(id){
  var rnd = new Math.seedrandom(id);
  var planet = {
    id : id,
    radius : Random.number(70,110,rnd),
    camps : function(){
      var a = [];
      for (var i=0;i<Random.number(1,5,rnd);i++){
        a.push(Math.random());
      }
      return a;
    }(),
    type : Random.number(0,2,rnd),
  }
  return planet;
}

export const generate = Generate
