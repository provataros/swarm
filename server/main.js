import {Meteor} from 'meteor/meteor';
import {Mongo} from "meteor/mongo";
import {Factory} from "/imports/factory"

var Players = new Mongo.Collection("players");

Meteor.startup(() => {
});

Meteor.methods({
  hardReset(){
    Players.remove({});
    Accounts.users.remove({});
    var u = Accounts.createUser({username : "p",password : "a"});
    var p = Factory.player.default();
    p.user = u;
    Players.insert(p);
  },
  createUnit(name){
    var f = Factory.unit.create(name);
    if (!Factory.unit.exists(name))return false;
    return true;
  },
  getState(){
    return Players.findOne({user : Meteor.userId()});
  }
});
