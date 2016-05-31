var upgrades = {
  barracks : {
    name : "barracks",
    action : "barracks",
    time : 5000,
  },
  hive : {
    name : "hive",
    action : "hive",
    time : 15000,
  },
}


var upgrade = function(name){
  return upgrades[name]?upgrades[name]:{};
}
upgrade.exists = function(name){
  return !(upgrades[name] == undefined);
}

export const Upgrade  = upgrade;
