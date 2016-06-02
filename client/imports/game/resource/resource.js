import {Factory} from "/imports/factory"
import {db} from "/client/imports/localdb"

_resource = {};

function sufficientResources(state,unit){
  var flag = true;
  var check = {};
  return flag?check:undefined;
}


function gather(unit){
  var tmp = {};
    db.resources.update({name : unit.name},{$inc : {amount : 50 }});
}

_resource.gather = gather;



export const Resource  = _resource;
