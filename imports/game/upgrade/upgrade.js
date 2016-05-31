import {Factory} from "/imports/factory"
import {localdb} from "/client/imports/localdb"

_upgrade = {};


var actions = {
  barracks(){
    localdb.update({"structures.upgrades.available" : {$exists : true} },{
      $pull : {"structures.$.upgrades.available" : {name : "barracks"} },
      $push : {"structures" : Factory.structure("barracks") },
    });
  },
  hive(){
    console.log("not implemented yet");
  }
}



_upgrade.execute = function(up){
  actions[up.name]();
}




export const Upgrade  = _upgrade;
