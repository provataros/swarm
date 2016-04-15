import { Meteor } from 'meteor/meteor';
import {Mongo} from "meteor/mongo";
import {Player} from "/imports/player";
import {Structure} from  "/imports/structure";
import {Unit} from "/imports/unit";

Players = new Mongo.Collection("players");

Players.before.update(function(userId, doc, fieldNames, modifier, options){
  return true;
});

Players.allow({
  update: function(userId, docs, fields, modifier){
    console.log(fields);
    return true;
  }
});


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  hardReset(){
    Players.remove({});
    Accounts.users.remove({});
    var u = Accounts.createUser({username : "p",password : "a"});
    var p = Player.default();
    p.user = u;
    Players.insert(p);
  },
  upgrade(name){
    upgrades[name](name);
  },
  inc(){
    Players.update({user : Meteor.userId()},{$inc : {counter : 1}});
  },
  createUnit(u){
    console.log("creating unit "+u);
    Players.update({user : Meteor.userId()},{$push : {units : units[u]}})
  }
})
