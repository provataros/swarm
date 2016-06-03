import {Structure} from "../structure/structure.js"
import {Resource} from "../resource/resource.js"
import {Upgrade} from "../upgrade/upgrade.js"
import {Unit} from "../unit/unit.js"


var player = {
  default(){
    return {
      resources : {
        meat : Resource("meat"),
        metal : Resource("metal"),
      },
      structures : [
        Structure("hatchery"),
      ],
      units : [
        Unit("spawn"),
        Unit("warrior"),
      ],
      base : [
        Unit("spawn"),
        Unit("warrior"),
        Upgrade("barracks"),
        Upgrade("hp"),
        Upgrade("hive"),
        Unit("drone"),
      ]
    }
  }
};


export const Player = player;
