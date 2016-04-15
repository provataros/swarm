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
