import {Factory} from "/imports/factory"
import {db} from "/client/imports/localdb"

_unit = {};


function sufficientResources(unit){
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


function create(unit){
  console.log(unit);
  delete unit._id;
  db.units.insert(unit);
}

function reserve(unit){
  var check = sufficientResources(unit);
  if (check){
    for (var i=0;i<unit.cost.length;i++){
      db.resources.update({name : unit.cost[i].type},{$inc : { amount : -unit.cost[i].amount }});
    }
  }
  return check;
}

function refund(unit){
  for (var i=0;i<unit.cost.length;i++){
    db.resources.update({name : unit.cost[i].type},{$inc : { amount : unit.cost[i].amount }});
  }
  return true;
}

function cancel(obj){
  refund(obj);
}


_unit.create = create;
_unit.reserve = reserve;
_unit.cancel = cancel;

export const Unit  = _unit;
