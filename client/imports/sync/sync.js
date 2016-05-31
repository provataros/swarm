import {localdb} from "/client/imports/localdb";
import {Template} from "meteor/templating"

Template.registerHelper("online",function(){
  return true;
});

Meteor.startup(function(){
  if (!Meteor.userId()){
    Meteor.loginWithPassword("p","a",function(e){
    });
  }
});


function sync(){
  Meteor.call("getState",function(err,result){
    if (err){
      console.log(err);
      return;
    }
    delete result._id;
    localdb.update({},result,{upsert : true});
    console.log(localdb.findOne());
  })
}

Template.body.events({
  "click #hardReset" : function(){
    Meteor.call("hardReset");
  }
});


Accounts.onLogin(function(){
  id = {_id : Meteor.userId()}
  sync();
});
