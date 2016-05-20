import {Players} from "/imports/database";
import {Resource} from "/imports/resource"


function gatherResource(id,u){
  var res = "resources."+u.object;
  Players.update({user : id},{
    $pull : {queue : { id : u.id } },
    $inc :  { "resources."+u.object : Resource[u.object].amount}
  });
}

Meteor.methods({
  queueGather(u){
    console.log(u);
    var d =  Date.now();
    var o = {
      id : d,
      time : d + Resource[u].time,
      object : u
    }
    var id = Meteor.userId();
    Players.update({user : id},{
      $push : {
        queue : o
      }
    })

    Meteor.setTimeout(function(){
      gatherResource(id,o);
      console.log("this");
    },Resource[u].time);
  }
})
