var units = {
  spawn : {
    name : "spawn",
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
    stats : {
      hp : 10,
      speed : 5,
    }
  },
  drone : {
    name : "drone",
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
    }
  },
  warrior : {
    name : "warrior",
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
    }
  }
}

var unit = function(name){
  return units[name]?units[name]:{};
}
unit.exists = function(name){
  return !(units[name] == undefined);
}
export const Unit  = unit;
