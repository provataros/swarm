console.log("persistence");
import {db} from "/client/imports/localdb";
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
  db.import(state);
}

function set(){
  if (typeof(Storage) !== "undefined") {
    var state = JSON.stringify(db.export());
    localStorage.setItem("state",pako.deflate(state,{ to: 'string' }));
  } else {
      console.log("no storage");
  }
}

db.observe({
  changed : function(){
    set();
  }
});


Template.body.events({
  "click #hardReset" : function(){
    console.log("reset");
    hardReset();
  }
});



function hardReset(){
  delete localStorage.state;
  Session.set("selectedStructure",null);
  Session.set("selectedUnit",null);
  db.drop();
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
