import {Meteor} from 'meteor/meteor';
import {Mongo} from "meteor/mongo";
import {Factory} from "/imports/factory"
Meteor.startup(() => {
});

Meteor.methods({
  hardReset(){
    Players.remove({});
    Accounts.users.remove({});
    var u = Accounts.createUser({username : "p",password : "a"});
    var p = {};
    p.user = u;
  },
  createUnit(){
    return true;
  }
});
