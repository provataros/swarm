import { Meteor } from 'meteor/meteor';
import {Mongo} from "meteor/mongo";
import {Player} from "/imports/player";
import {Structure} from  "/imports/structure";

Players = new Mongo.Collection("players");

Players.before.update(function(userId, doc, fieldNames, modifier, options){
  return true;
});

Players.allow({
  update: function(userId, docs, fields, modifier){

    return true;
  }
});


Meteor.publish("players",function(){
  return Players.find({user : this.userId});
});
Meteor.startup(() => {
  // code to run on server at startup
});

var upgrades = {
  barracks(e){
    Players.update({
      user : Meteor.userId()
    },
    {
      $push : {
        structures : Structure.barracks,
        "upgdares.completed" : {name : e }
      },
      $pull : {
        "upgrades.available" : {name : e}
      }
    }
    );
    console.log(this);
  }
}

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
  }
})
