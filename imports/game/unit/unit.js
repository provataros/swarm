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
  var check = sufficientResources(unit);
  if (check){
    localdb.update({},{$push : {units : unit}});
    localdb.update({},{$inc : check});
  }

  else{
    console.log("not enough resources");
  }
}

_unit.create = create;
_unit.enough = sufficientResources;


export const Unit  = _unit;
