console.log("persistence");
import {localdb} from "/client/imports/localdb";
import {Factory} from "/imports/factory";
import {Template} from "meteor/templating"


var pako = require("pako");

Template.registerHelper("offline",function(){
  return true;
});

function get(){
  if (typeof(Storage) !== "undefined" && localStorage.getItem("state") != undefined) {
    var state = pako.inflate(localStorage.getItem("state"),{to : "string"});
    state = JSON.parse(state);
  } else {
    var state =  Factory.player.default();
  }
  localdb.importState(state);
}

function set(){
  if (typeof(Storage) !== "undefined") {
    var state = JSON.stringify(localdb.exportState());
    localStorage.setItem("state",pako.deflate(state,{ to: 'string' }));
  } else {
      console.log("no storage");
  }
}

localdb.find({}).observe({
  changed : function(){
    set();
  }
});


Template.body.events({
  "click #hardReset" : function(){
    hardReset();
  }
});



function hardReset(){
  delete localStorage.state;
  Session.set("selectedStructure",null);
  Session.set("selectedUnit",null);
  Persistence.get();
  Persistence.set();
}


Meteor.startup(function(){
  Persistence.get();
  Persistence.set();
  console.log("start persistence");
});


export const Persistence = {
  get : get,
  set : set
}
