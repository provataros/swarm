import {Factory} from "/imports/factory"
import {db} from "/client/imports/localdb"

_upgrade = {};


function u_structure(up){
  var f = db.structures.update({"upgrades.pending"  : up.name },{
    $pull : {"upgrades.pending" : up.name}
  });
  db.structures.insert(Factory.structure(up.name));
}

function u_hp(up){
  var s = [];
  db.units.update({},{$inc : {"stats.hp" : 10 }},{multi : true});
  db.base.update({type : "unit"},{$inc : {"stats.hp" : 10 }},{multi : true});
}

actions = {
  structure : u_structure,
  hp : u_hp
}



//checks done here
var reserve = function(up){
  var f = db.structures.update({"upgrades.available"  : up.name },{
    $pull : {"upgrades.available" : up.name},
    $push : {"upgrades.pending" : up.name},
  });
}


var cancel = function(up){
  var f = db.structures.update({"upgrades.pending"  : up.name },{
    $pull : {"upgrades.pending" : up.name},
    $push : {"upgrades.available" : up.name},
  });
}


function cost(unit){
  var flag = true;
  var check = [];
  var cost = unit.cost

  for (var i=0;i<cost.length;i++){
    check.push({name : cost[i].type ,amount : {"$gte" : cost[i].amount}});
  }
  if (check.length <= 0)return;

  var num = db.resources.find( { $or : check });
  return num.count()==cost.length;
}



_upgrade.execute = function(up){
  actions[up.action](up);
  return true;
}
_upgrade.reserve = function(up){
  reserve(up);
  return true;
}

_upgrade.cancel = function(up){
  cancel(up);
  return true;
}

export const Upgrade  = _upgrade;
