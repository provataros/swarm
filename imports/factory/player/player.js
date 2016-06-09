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
      structure : [
        Structure("hatchery","player"),
        Structure("barracks","ai_1"),
      ],
      unit : [
        Unit("spawn","player"),
        Unit("warrior","player"),
        Unit("spawn","ai_1"),
        Unit("spawn","ai_1"),
        Unit("spawn","ai_1"),
        Unit("spawn","ai_1"),
        Unit("spawn","ai_1"),
        Unit("spawn","ai_1"),
        Unit("spawn","ai_1"),
      ],
      base : [
        Unit("spawn",null),
        Unit("warrior",null),
        Upgrade("barracks"),
        Upgrade("hp"),
        Upgrade("hp2"),
        Upgrade("hive"),
        Unit("drone",null),
      ],
      camp : [
        {
          name : "player",
        },
        {
          name : "ai_1"
        }
      ]
    }
  }
};


export const Player = player;
