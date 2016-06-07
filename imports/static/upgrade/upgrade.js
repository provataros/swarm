var items = {
  hp : {
    title : "Global HP buff",
    desc : "Increases all unit's HP by 10",
    icon : "hp.png"
  },
  barracks : {
    title : "Barracks",
    desc : "Allows the creationg of barracks",
    icon : "barracks.png"
  },
  hp2 : {
    title : "HP Buff",
    desc : "Increases this unit's HP by 10",
    icon : "hp.png"
  },
  hive : {
    title : "Hive",
    desc : "Allows the creation of another hive",
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
