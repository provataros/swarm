Meteor.startup(function() {
  db.units = {};
  db.units.insert = function(unit){
    db.collections.players.update({user : Meteor.userId()},{ $push : {units : unit}});
  }
});
