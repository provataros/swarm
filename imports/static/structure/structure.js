var items = {
  hatchery : {
    title : "Hatchery",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
    icon : "hatchery.png"
  },
  barracks : {
    title : "Barracks",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
    icon : "barracks.png"
  },
  hive : {
    title : "Hive",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
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
