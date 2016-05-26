import { Meteor } from 'meteor/meteor';
import {Mongo} from "meteor/mongo";
import {Player} from "/imports/player";
import {Structure} from  "/imports/structure";
import {Unit} from "/imports/unit";
import {Players} from "/imports/database";

Meteor.startup(() => {
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
  test(a,b,c){
    console.log(a,b,c);
    return false;
  }
});
