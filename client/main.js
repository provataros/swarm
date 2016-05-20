import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Structure} from  "/imports/structure";
import './main.html';
import {Player} from "/imports/player";
import {Players} from "/imports/database"
import {Progressbar} from "./imports/progressbar"

Meteor.subscribe("players");

Meteor.startup(function(){
  if (!Meteor.userId()){
    Meteor.loginWithPassword("p","a",function(e){});
  }
  Session.set("selectedStructure",null);
});


Template.login.events({
  'click button'() {
    // increment the counter when button is clicked
    var u = $("#uid").val();
    var p = $("#pwd").val();
    if (p && u){
      Meteor.loginWithPassword(u,p,function(e){
      });
    }
  }
});

Template.showUpgrades.events({
  'click .upgrade'() {
    var id = Players.findOne({})._id;
    Players.update({
      _id : id
    },
    {
      $push : {
        structures : Structure.barracks,
        "upgdares.completed" : {name : this.name }
      },
      $pull : {
        "upgrades.available" : {name : this.name}
      }
    }
    );
  }
});
Progressbar.run();

Template.body.events({
  "click #hardReset"(){
    Meteor.call("hardReset");
    Meteor.loginWithPassword("p","a",function(e){});
  },
});


Template.showUpgrades.helpers({
  upgrades(){
    var f = Players.findOne();
    if (f){
      return f.upgrades.available;
    }
  }
});

Template.registerHelper("debug", function(optionalValue) {
  if (optionalValue) {
    console.log(optionalValue);
  }
});

Template.registerHelper("player", function(optionalValue) {
  var f = Players.findOne();
  if (f){
    return f;
  }
});

/*
if (Meteor.isClient) {

  // log sent messages
  var _send = Meteor.connection._send;
  Meteor.connection._send = function (obj) {
    console.log("send", obj);
    _send.call(this, obj);
  };

  // log received messages
  Meteor.connection._stream.on('message', function (message) {
    console.log("receive", JSON.parse(message));
  });
}
*/
