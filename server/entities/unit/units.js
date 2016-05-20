import {Players} from "/imports/database";
import {Unit} from "/imports/unit"


function createUnit(id,u){
  Players.update({user : id},{
    $pull : {queue : { "id" : u.id } },
    $push : {units : Unit[u.object]}
  });
}

Meteor.methods({
  queueUnit(u){
    var d =  Date.now();
    var o = {
      id : d,
      time : d + Unit[u].time,
      action : "createUnit",
      object : u
    }
    var id = Meteor.userId();
    Players.update({user : id},{
      $push : {
        queue : o
      }
    })
    console.log("sdfaf");
    Meteor.setTimeout(function(){
      createUnit(id,o);
      console.log("this");
    },Unit[u].time);
  }
})
