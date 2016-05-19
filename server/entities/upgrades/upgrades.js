import {Players} from "/imports/database";
import {Structure} from "/imports/structure";
import {Upgrade} from "/imports/upgrade";

function researchUpgrade(u){
  Players.update({user : Meteor.userId()},{
    $push : {
      structures : Structure[u],
      "upgdares.completed" : {name : u }
    },
    $pull : {
      "upgrades.available" : {name : u}
    }
  })
}

Meteor.methods({
  queueUpgrade(name){
    Players.update({user : Meteor.userId()},{$push : {queue : {
      time : Date.now(),
      action : researchUpgrade,
      object : name
    }
  }})}
});
