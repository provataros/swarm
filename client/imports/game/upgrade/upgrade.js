import {Factory} from "/imports/factory"
import {localdb} from "/client/imports/localdb"
import {State} from "/client/imports/state"

_upgrade = {};


function u_structure(up){
  localdb.update({"structures.upgrades.pending.name" : up.name },{
    $pull : {"structures.$.upgrades.pending" : {name : up.name} },
    $push : {"structures" : Factory.structure(up.name) },
  });
}

function u_hp(up){
  var s = []
  console.log(s.length);
  for (var i=0;i<State().units.length;i++){
    s[i] = $.extend({},State().units[i]);
    s[i].stats.hp += 10;
  }
  console.log(s);
  localdb.update({},{$set : {units  :  s }});
}

actions = {
  structure : u_structure,
  hp : u_hp
}



//checks done here
var reserve = function(up){
  localdb.update({"structures.upgrades.available.name" : up.name },{
    $pull : {"structures.$.upgrades.available" : {name : up.name} },
    $push : {"structures.$.upgrades.pending" :   Factory.upgrade(up.name) },
  });
}


var cancel = function(up){
  localdb.update({"structures.upgrades.pending.name" : up.name,}, {
    $pull : {"structures.$.upgrades.pending" : {name : up.name} },
    $push : {"structures.$.upgrades.available" : Factory.upgrade(up.name) },
  });
}


function cost(up){
  if (!up.cost)return {};
  var flag = true;
  var check = {};
  var state = localdb.findOne();
  for (var i=0;i<up.cost.length;i++){
    flag = flag && (state.resources[unit.cost[i].type].amount >=unit.cost[i].amount);
    check["resources."+unit.cost[i].type+".amount"] = - unit.cost[i].amount;
  }
  return flag?check:undefined;
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
