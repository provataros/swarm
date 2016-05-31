import {Factory} from "/imports/factory"
import {localdb} from "/client/imports/localdb"

_resource = {};

function sufficientResources(state,unit){
  var flag = true;
  var check = {};
  return flag?check:undefined;
}


function gather(unit){
  console.log(unit);
  var tmp = {};
  tmp["resources."+unit.name+".amount"] = 10;
    localdb.update({},{$inc : tmp });
}

_resource.gather = gather;



export const Resource  = _resource;
