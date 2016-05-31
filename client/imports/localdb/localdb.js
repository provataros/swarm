import {Mongo} from "meteor/mongo";

_localdb = new Mongo.Collection(null);

_localdb.importState = function(state){
  delete state._id;
  this.update({},state,{upsert : true,reactive : false});
}
_localdb.exportState = function(){
  var state = this.findOne({},{reactive: false});
  delete state._id;
  return state;
}

window.db = _localdb;

export const localdb = _localdb;
