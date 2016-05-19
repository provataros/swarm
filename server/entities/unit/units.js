import {Players} from "/imports/database";
import {Unit} from "/imports/unit"

function createUnit(u){
  Players.update({user : Meteor.userId()},{$push : {units : unit[u]}})
}

Meteor.methods({
  queueUnit(u){
    var d =  Date.now();
    Players.update({user : Meteor.userId()},{
      $push : {
        queue : {
          id : d,
          time : d + Unit[u].time,
          action : createUnit,
          object : u,
        }
      }
    })
  }
})
