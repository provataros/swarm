import {Factory} from "/imports/factory"
import {localdb} from "/client/imports/localdb"
import {UI} from "/client/imports/ui";
_resource = {};

function sufficientResources(state,unit){
  var flag = true;
  var check = {};
  return flag?check:undefined;
}


function gather(unit){
  console.log(unit);
  var tmp = {};
    ui.resources.update({name : unit.name},{$inc : {amount : 50 }});
}

_resource.gather = gather;



export const Resource  = _resource;
