Generators.units = {};
Generators.units.defaults = {};

Meteor.startup(function() {
  var u = db.collections.defaults.find({type : "unit"},{fields : {"_id" : 0}});
  u.forEach(function(e){
    Generators.units.defaults[e.id] = e;
  });

  Generators.units.createUnit = function(name){
    if (Generators.units.defaults[name]){
      return Generators.units.defaults[name];
    }
  };
});


//defaults
/*

{
"id" : "spawn",
"name" : "Spawn",
"type" : "unit",
"atk" : 5,
"def" : 12,
"hp" : 50,
"spd" : 20
}

{
"id" : "spawn",
"name" : "Spawn",
"type" : "unit",
"atk" : 5,
"def" : 12,
"hp" : 50,
"spd" : 20
}
{"id" : "drone","name" : "Drone","type" : "unit","atk" : 15,"def" : 19,"hp" : 150,"spd" : 50}
{"id" : "queen","name" : "Queen","type" : "unit","atk" : 50,"def" : 22,"hp" : 200,"spd" : 5}
{"id" : "nest","name" : "Nest","type" : "structure",units : { id : "drone"}}
*/
