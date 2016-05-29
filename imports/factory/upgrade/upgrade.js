var upgrades = {
  barracks : {
    name : "barracks",
    action : "test"
  },
}


var upgrade = function(name){
  return upgrades[name]?upgrades[name]:{};
}
upgrade.exists = function(name){
  return !(upgrades[name] == undefined);
}

export const Upgrade  = upgrade;
