import {Players} from "/imports/database";

upgrades = {
  barracks(e){
    Players.update({
      user : Meteor.userId()
    },
    {
      $push : {
        structures : Structure.barracks,
        "upgdares.completed" : {name : e }
      },
      $pull : {
        "upgrades.available" : {name : e}
      }
    }
    );
    console.log(this);
  }
}


Meteor.methods({
  upgrade(name){
    upgrades[name](name);
  },
})
