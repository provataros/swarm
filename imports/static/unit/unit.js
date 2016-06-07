var items = {
  spawn : {
    title : "Spawn",
    desc : "Larva tending to the hive",
  },
  drone : {
    title : "Drone",
    desc : "Scout used for meat gathering",
  },
  warrior : {
    title : "Warrior",
    desc : "Unit adept at combat",
  }

}





var item = function(name){
  return items[name]?items[name]:{};
}
item.exists = function(name){
  return !(items[name] == undefined);
}
export const Unit  = item;
