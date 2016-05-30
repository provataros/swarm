var upgrades = {
  barracks : {
    name : "barracks",
    action : "barracks"
  },
  hive : {
    name : "hive",
    action : "hive"
  },
}


var upgrade = function(name){
  return upgrades[name]?upgrades[name]:{};
}
upgrade.exists = function(name){
  return !(upgrades[name] == undefined);
}

export const Upgrade  = upgrade;
