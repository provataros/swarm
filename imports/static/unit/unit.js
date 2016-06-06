var items = {
  spawn : {
    title : "Spawn",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
  },
  drone : {
    title : "Drone",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
  },
  warrior : {
    title : "Warrior",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
  }

}





var item = function(name){
  return items[name]?items[name]:{};
}
item.exists = function(name){
  return !(items[name] == undefined);
}
export const Unit  = item;
