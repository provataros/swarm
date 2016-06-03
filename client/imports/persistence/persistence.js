console.log("persistence");
import {db} from "/client/imports/localdb";
import {Factory} from "/imports/factory";
import {Template} from "meteor/templating"


var pako = require("pako");

var observe = function(name){
  return{
    changed : function(){
      set(name);
    },
    added : function(){
      set(name);
    },
    removed : function(){
      set(name);
    }
  };
}

var names = [
  "resources",
  "units",
  "structures",
  "upgrades",
  "base",
  "queue",
]



Template.registerHelper("offline",function(){
  return true;
});

function get(name){
  if (typeof(Storage) !== "undefined" && localStorage.getItem(name) != undefined) {
    var state = pako.inflate(localStorage.getItem(name),{to : "string"});
    state = JSON.parse(state);
  } else {
    var state =  Factory.player.default()[name];
  }
  db.import(name,state);
}

function set(name){
  if (typeof(Storage) !== "undefined") {
    var state = JSON.stringify(db.export(name));
    localStorage.setItem(name,pako.deflate(state,{ to: 'string' }));
  } else {
      console.log("no storage");
  }
}


Template.body.events({
  "click #hardReset" : function(){
    console.log("reset");
    hardReset();
  }
});

var observers = [];

function start(){
  for (var i=0;i<names.length;i++){
    observers[names[i]] = db[names[i]].find({}).observe(observe(names[i]));
  }
}

function stop(){
  for (var i=0;i<names.length;i++){
    observers[names[i]].stop();
  }
}

function hardReset(){
  Session.set("selectedStructure",null);
  Session.set("selectedUnit",null);
  for (var i=0;i<names.length;i++){
    stop();
    delete localStorage[names[i]];
    db.drop(names[i]);
    get(names[i]);
    set(names[i]);
    start();
  }
}


Meteor.startup(function(){
  for (var i=0;i<names.length;i++){
    get(names[i]);
    set(names[i]);
  }
  start();
});


export const Persistence = {
  get : get,
  set : set
}
