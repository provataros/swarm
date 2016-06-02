console.log("state");
import {db} from "/client/imports/localdb";

var _state = {};

function state(){
  return _state;
}
export const State = state;
