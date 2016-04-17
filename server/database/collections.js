import {Players} from "/imports/database";


Meteor.publish("players",function(){
  return Players.find({user : this.userId});
});


Players.allow({
  update: function(userId, docs, fields, modifier){
    return true;
  }
});
