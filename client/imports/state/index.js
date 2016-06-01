console.log("state");
import {localdb} from "/client/imports/localdb";

var _state = {};

localdb.find({}).observe({
  changed : function(){
    _state = localdb.findOne();
  },
  added : function(){
    _state = localdb.findOne();
  }
});

function state(){
  return _state;
}
export const State = state;
