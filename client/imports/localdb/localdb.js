console.log("localdb");
import {Mongo} from "meteor/mongo";

var localdb = {};

localdb.resources = new Mongo.Collection(null);
localdb.unit = new Mongo.Collection(null);
localdb.structure = new Mongo.Collection(null);
localdb.upgrades = new Mongo.Collection(null);
localdb.base = new Mongo.Collection(null);
localdb.queue = new Mongo.Collection(null);
localdb._db = new Mongo.Collection(null);

localdb.import = function (name,state){
  var that = this;
  if (state)$.each(state,function(){
    that[name].insert(this);
  });
}

localdb.export = function(name){
  var state = {};
  state = this[name].find({}).fetch();
  return state;
}


localdb.drop = function(name){
  this[name].remove({});
}

localdb.reset = function(){
  localdb.drop();
  //_localdb.
}



window.db = localdb;

export const db = localdb;
