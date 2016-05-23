import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Structure} from  "/imports/structure";
import './main.html';
import {Player} from "/imports/player";
import {Players} from "/imports/database"
import {Progressbar} from "./imports/progressbar"
import {Mongo} from "meteor/mongo";


localdb = new Mongo.Collection(null);

Meteor.startup(function(){
  if (!Meteor.userId()){
    Meteor.loginWithPassword("p","a",function(e){});
  }
});

function sync(id,fields){
  if (fields){
    localdb.update({_id : id},{$set : fields },{upsert : true});
  }
  console.log(fields);
  console.log(localdb.findOne());
}

Accounts.onLogin(function(a,b,c){
  Meteor.subscribe("players", {
    onReady: function(){
      Players.find({user : Meteor.userId()}).observeChanges({
         added: function (id, fields) {
             sync(id,fields);
         },
         changed: function (id, fields) {
             sync(id,fields);
         },
         removed: function (id) {
             sync(id);
        }
      });;
    }
  });
});
