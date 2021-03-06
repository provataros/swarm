var units = {
  spawn : {
    name : "spawn",
    type : "unit",
    cost : [
      {
        type : "meat",
        amount : 10
      },
      {
        type : "metal",
        amount : 5
      }
    ],
    upgrades : {
      available : [
        "hp2",
      ]
    },
    stats : {
      hp : 10,
      speed : 5,
    },
    time : 1000,
  },
  drone : {
    name : "drone",
    type : "unit",
    cost : [
      {
        type : "meat",
        amount : 50
      },
      {
        type : "metal",
        amount : 20
      }
    ],
    stats : {
      hp : 120,
      speed : 16,
    },
    time : 10000,
  },
  warrior : {
    name : "warrior",
    type : "unit",
    cost : [
      {
        type : "meat",
        amount : 150
      },
      {
        type : "metal",
        amount : 40
      }
    ],
    stats : {
      hp : 250,
      speed : 20,
    },
    time : 1000,
  }
}

var unit = function(name,owner){
  var u = units[name]?units[name]:{};
  u.owner = owner;
  return $.extend({},u);
}
unit.exists = function(name){
  return !(units[name] == undefined);
}
export const Unit  = unit;
