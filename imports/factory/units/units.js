var unit = {};

var units = {
  spawn : {
    name : "Spawn"
  }
}

unit.create = function(name){
  return units[name]?units[name]:{};
}
unit.exists = function(name){
  return !(units[name] == undefined);
}
export const Unit  = unit;
