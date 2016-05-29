import {Factory} from "/imports/factory"
import {localdb} from "/client/imports/localdb"

_unit = {};

function sufficientResources(state,unit){
  var flag = true;
  var check = {};
  for (var i=0;i<unit.cost.length;i++){
    flag = flag && (state.resources[unit.cost[i].type].amount >=unit.cost[i].amount);
    check["resources."+unit.cost[i].type+".amount"] = - unit.cost[i].amount;
  }
  return flag?check:undefined;
}


function create(unit){
  var state = localdb.findOne();
  var check = sufficientResources(state,unit);
  if (check){
    console.log(check);
    localdb.update({},{$push : {units : unit}});
    localdb.update({},{$inc : check});
  }

  else{

    console.log("not enough resources");

  }
}

_unit.create = create;



export const Unit  = _unit;
