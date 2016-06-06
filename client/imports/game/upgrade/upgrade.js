import {Factory} from "/imports/factory"
import {db} from "/client/imports/localdb"

_upgrade = {};


function u_structure(up){
  var f = db.structure.update({_id : up.parent._id },{
    $pull : {"upgrades.pending" : up.name}
  });
  db.structure.insert(Factory.structure(up.name));
}

function u_hp(up){
  var s = [];
  db.unit.update({},{$inc : {"stats.hp" : 10 }},{multi : true});
  db.base.update({type : "unit"},{$inc : {"stats.hp" : 10 }},{multi : true});
}
function u_hp2(up){
  var f = db.unit.update({_id : up.parent._id },{
    $pull : {"upgrades.pending" : up.name},
    $inc : {"stats.hp" : 10 },
    $push : {"upgrades.available" : up.name},
  });
}
actions = {
  structure : u_structure,
  hp : u_hp,
  hp2 : u_hp2
}

function sufficientResources(unit){
  var flag = true;
  var check = [];
  var cost = unit.cost
  if (!cost)return true;
  for (var i=0;i<cost.length;i++){
    check.push({name : cost[i].type ,amount : {"$gte" : cost[i].amount}});
  }
  if (check.length <= 0)return false;

  var num = db.resources.find( { $or : check });
  return num.count()==cost.length;
}

//checks done here
var reserve = function(up){
  var check = sufficientResources(up);
  if (check){
    if (up.cost){
      for (var i=0;i<up.cost.length;i++){
        db.resources.update({name : up.cost[i].type},{$inc : { amount : -up.cost[i].amount }});
      }
    }
    var f = db[up.parent.type].update({_id : up.parent._id},{
      $pull : {"upgrades.available" : up.name},
      $push : {"upgrades.pending" : up.name},
    });
  }
  return check;
}

function refund(unit){
  if (unit.cost){
    for (var i=0;i<unit.cost.length;i++){
      db.resources.update({name : unit.cost[i].type},{$inc : { amount : unit.cost[i].amount }});
    }
  }
  return true;
}


var cancel = function(up){
  var f = db[up.parent.type].update({_id : up.parent._id},{
    $pull : {"upgrades.pending" : up.name},
    $push : {"upgrades.available" : up.name},
  });
  refund(up);
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
  return reserve(up);
}

_upgrade.cancel = function(up){
  cancel(up);
  return true;
}

export const Upgrade  = _upgrade;
