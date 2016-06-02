console.log("localdb");
import {Mongo} from "meteor/mongo";

var localdb = {};

localdb.resources = new Mongo.Collection(null);
localdb.units = new Mongo.Collection(null);
localdb.structures = new Mongo.Collection(null);
localdb.upgrades = new Mongo.Collection(null);
localdb.base = new Mongo.Collection(null);
localdb._db = new Mongo.Collection(null);

localdb.import = function (state){
  var that = this;
  if (state.resources)$.each(state.resources,function(){
    that.resources.insert(this);
  });
  if (state.units)$.each(state.units,function(){
    that.units.insert(this);
  });
  if (state.structures)$.each(state.structures,function(){
    that.structures.insert(this);
  });
  if (state.upgrades)$.each(state.upgrades,function(){
    that.upgrades.insert(this);
  });
  if (state.base)$.each(state.base,function(){
    that.base.insert(this);
  });
}

localdb.export = function(){
  var state = {};
  state.resources = this.resources.find({}).fetch();
  state.units = this.units.find({}).fetch();
  state.structures = this.structures.find({}).fetch();
  state.upgrades = this.upgrades.find({}).fetch();
  state.base = this.base.find({}).fetch();
  console.log(state);
  return state;
}

localdb.observe = function(obs){
  this.resources.find({}).observe(obs);
  this.units.find({}).observe(obs);
  this.structures.find({}).observe(obs);
  this.upgrades.find({}).observe(obs);
  this.base.find({}).observe(obs);
  this._db.find({}).observe(obs);
}

localdb.drop = function(){
  this.resources.remove({});
  this.units.remove({});
  this.structures.remove({});
  this.upgrades.remove({});
  this.base.remove({});
  this._db.remove({});
}

localdb.reset = function(){
  localdb.drop();
  //_localdb.
}



window.db = localdb;

export const db = localdb;
