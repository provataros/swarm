
import {Mongo} from "meteor/mongo";
import {Structure} from  "/imports/structure";
import {Player} from "/imports/player";
import {Players} from "/imports/database";


Players.before.update(function(userId, doc, fieldNames, modifier, options){
  return true;
});
