var items = {
  hp : {
    title : "Global HP buff",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
    icon : "hp.png"
  },
  barracks : {
    title : "Barracks",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
    icon : "barracks.png"
  },
  hp2 : {
    title : "Unit HP Buff",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
    icon : "hp.png"
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
export const Upgrade  = item;
