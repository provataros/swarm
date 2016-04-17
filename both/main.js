
import {Mongo} from "meteor/mongo";
import {Structure} from  "/imports/structure";
import {Player} from "/imports/player";
import {Players} from "/imports/database";


Players.before.update(function(userId, doc, fieldNames, modifier, options){
  return true;
});

units = {
  spawn : {
    hp : 15,
    name : "spawn"
  },
  warrior : {
    hp : 15,
    name : "warrior"
  },
  drone : {
    hp : 15,
    name : "drone"
  },
}
