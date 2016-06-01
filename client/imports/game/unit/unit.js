import {Factory} from "/imports/factory"
import {localdb} from "/client/imports/localdb"

_unit = {};


function sufficientResources(unit){
  var flag = true;
  var check = {};
  var state = localdb.findOne();
  for (var i=0;i<unit.cost.length;i++){
    flag = flag && (state.resources[unit.cost[i].type].amount >=unit.cost[i].amount);
    check["resources."+unit.cost[i].type+".amount"] = - unit.cost[i].amount;
  }
  return flag?check:undefined;
}


function create(unit){
  localdb.update({},{$push : {units : unit}});
}

function reserve(unit){
  var check = sufficientResources(unit);
  if (check){
    localdb.update({},{$inc : check});
  }
  return check;
}

function refund(obj){

  var check = {};

  for (var i=0;i<obj.cost.length;i++){
    check["resources."+obj.cost[i].type+".amount"] =  obj.cost[i].amount;
  }

  localdb.update({},{$inc :check});
}

function cancel(obj){
  refund(obj);
}


_unit.create = create;
_unit.reserve = reserve;
_unit.cancel = cancel;

export const Unit  = _unit;
