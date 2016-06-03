import {Unit} from "../unit/unit.js"
import {Upgrade} from "../upgrade/upgrade.js"


var structures = {
  hatchery : {
    type : "structure",
    name : "hatchery",
    units : [
      "spawn",
      "drone",
    ],
    upgrades : {
      available : [
        "barracks",
        "hp",
      ]
    },
  },
  barracks : {
    type : "structure",
    name : "barracks",
    units : [
      "warrior",
    ],
    upgrades : {
      available : [
        "hive",
      ]
    },
  },
  hive : {
    type : "structure",
    name : "hive",
    units : [
      "warrior",
    ],
    upgrades : {
      available : [
      ]
    },
  }
}


var structure = function(name){
  return structures[name]?structures[name]:{};
}

structure.exists = function(name){
  return !(structures[name] == undefined);
}

export const Structure = structure;
