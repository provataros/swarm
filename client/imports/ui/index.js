console.log("UI");
import {Mongo} from "meteor/mongo";
import {localdb} from "/client/imports/localdb";
import {State} from "/client/imports/state"


_ui = {};

resources = new Mongo.Collection(null);
units = new Mongo.Collection(null);
structures = new Mongo.Collection(null);
upgrades = new Mongo.Collection(null);
base = new Mongo.Collection(null);

var _state = {};

localdb.find({}).observe({
  changed : function(a,b,c){
  },
  added : function(a,b,c){
    _state = init(localdb.findOne());
  }
});

function init(state){
  if (state.resources)$.each(state.resources,function(){
    resources.insert(this);
  });
  if (state.units)$.each(state.units,function(){
    units.insert(this);
  });
  if (state.structures)$.each(state.structures,function(){
    structures.insert(this);
  });
  if (state.upgrades)$.each(state.upgrades,function(){
    upgrades.insert(this);
  });
  if (state.base)$.each(state.base,function(){
    base.insert(this);
  });
}

_ui.resources = resources;
_ui.units = units;
_ui.structures = structures;
_ui.upgrades = upgrades;
_ui.base = base;

window.ui = _ui;

export const UI = _ui;
