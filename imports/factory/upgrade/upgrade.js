var upgrades = {
  barracks : {
    type : "upgrade",
    name : "barracks",
    action : "structure",
    time : 1000,
  },
  hive : {
    type : "upgrade",
    name : "hive",
    action : "structure",
    time : 1000,
  },
  hp : {
    type : "upgrade",
    name : "hp",
    action : "hp",
    time : 1000,
  },
  hp2 : {
    type : "upgrade",
    name : "hp2",
    action : "hp2",
    time : 1000,
    cost : [
      {
        type : "meat",
        amount : 10
      },
    ],
  },
}


var upgrade = function(name){
  return upgrades[name]?upgrades[name]:{};
}
upgrade.exists = function(name){
  return !(upgrades[name] == undefined);
}

export const Upgrade  = upgrade;
