import {Players} from "/imports/database";

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


Meteor.methods({
  createUnit(u){
    console.log("creating unit "+u);
    Players.update({user : Meteor.userId()},{$push : {units : units[u]}})
  }
})
