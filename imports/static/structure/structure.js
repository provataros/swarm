var items = {
  hatchery : {
    title : "Hatchery",
    desc : "Basic structure for spawing spawns and drones",
    icon : "hatchery.png"
  },
  barracks : {
    title : "Barracks",
    desc : "Military buildng for warriors",
    icon : "barracks.png"
  },
  hive : {
    title : "Hive",
    desc : "Advanced spawning grounds",
    icon : "hive.png"
  }

}

var item = function(name){
  return items[name]?items[name]:{};
}
item.exists = function(name){
  return !(items[name] == undefined);
}
export const Structure  = item;
