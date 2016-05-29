import {Factory} from "/imports/factory"
import {localdb} from "/client/imports/localdb"

_upgrade = {};


var actions = {
  barracks(){
    console.log(localdb.findOne())
    localdb.update({},{ $pull : {"structures.upgrades.available" : {"name" : "barracks" }}});
    console.log(localdb.findOne())
  },
}



_upgrade.execute = function(up){
  actions[up.name]();
}




export const Upgrade  = _upgrade;
