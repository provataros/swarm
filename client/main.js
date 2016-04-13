import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Mongo} from "meteor/mongo";
import {Structure} from  "/imports/structure";
import './main.html';


Players = new Mongo.Collection("players");

Meteor.subscribe("players");



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


Template.body.events({
  "click #hardReset"(){
    Meteor.call("hardReset");
  }
});

Template.showStructures.helpers({
  structures(){
    var f = Players.findOne();
    if (f){
      return f.structures;
    }
  }
});

Template.showUpgrades.helpers({
  upgrades(){
    var f = Players.findOne();
    if (f){
      return f.upgrades.available;
    }
  }
});

Template.showUnits.helpers({
  units(){
    return this.units;
  }
});


Template.registerHelper("debug", function(optionalValue) {
  if (optionalValue) {
    console.log(optionalValue);
  }
});
