import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import {Mongo} from "meteor/mongo";
import {Factory} from "/imports/factory"

localdb = new Mongo.Collection(null);
var id = {};
Meteor.startup(function(){
  if (!Meteor.userId()){
    Meteor.loginWithPassword("p","a",function(e){

    });
  }
});

function sync(id,fields){
  f = {a : 5};
  localdb.update({_id : Meteor.userId()},f,{upsert : true});
  console.log("sync()");
}

Accounts.onLogin(function(){
  id = {_id : Meteor.userId()}
  sync();
});

Template.body.events({
  "click #gogogo" : create
});



function create(){
  localdb.update({user : Meteor.userId()},{$set : { f : Date.now()}});
  var u = Factory.createUnit();
  u.id= Math.random();
  localdb.update(id,{$push : {units : u}});
  console.log(localdb.findOne());
  Meteor.call("createUnit",function(err,result){
    if (result == false){
      console.log(u.id);
      localdb.update(id,{$pull : {units : {id : u.id} } });
      console.log(localdb.findOne());
    }
    if (result == true){
      localdb.update({_id : Meteor.userId(), "units.id": {$exists : true}},{$unset : {"units.$.id" : true} });

      console.log(localdb.findOne());
    }
  });

}
