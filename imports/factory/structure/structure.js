import {Unit} from "../unit/unit.js"
import {Upgrade} from "../upgrade/upgrade.js"


var structures = {
  hatchery : {
    name : "hatchery",
    units : [
      Unit("spawn"),
      Unit("drone")
    ],
    upgrades : {
      available : [
        Upgrade("barracks"),
      ]
    },
  },
  barracks : {
    name : "barracks",
    units : [
      Unit("warrior"),
    ],
    upgrades : {
      available : [
        Upgrade("Hive"),
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
