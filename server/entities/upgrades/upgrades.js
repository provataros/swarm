import {Players} from "/imports/database";
import {Structure} from "/imports/structure";
import {Upgrade} from "/imports/upgrade";

function researchUpgrade(id,u){
  Players.update({user : id},{
    $push : {
      structures : Structure[u.object],
      "upgrades.completed" : {name : u.object }
    },
    $pull : {
      "upgrades.available" : {name : u.object},
      queue : { "id" : u.id }
    }
  })
}

Meteor.methods({
  queueUpgrade(u){
    var d =  Date.now();
    var o = {
      id : d,
      action : "researchUpgrade",
      object : u,
      time : d + Upgrade[u].time,
    }
    var id = Meteor.userId();
    Players.update({user : id},{
      $push : {
        queue : o
      }
    })

    Meteor.setTimeout(function(){
      researchUpgrade(id,o);
      console.log("this");
    },Structure[u].time);
  }
})
