

Meteor.methods({


  createPlanet : function(){
    var p = {};
    var id = null;

    id = planets.insert(p);
    p = gen.planet.new(id);
    p._id = id;

    var c = planets.find({name : p.name}).count(); //change sometime
    if (c>=1){
      p.name += ((" ") + (c+1));
    }
    planets.update({_id : id},p);
    return p;
  },
  createSystem : function(){
    var p = {};
    var id = null;
    id = systems.insert(p);
    Math.seedrandom(id);
    p = gen.system.new(id);
    p._id = id;
    var c = systems.find({name : p.name}).count(); //change sometime
    if (c>=1){
      p.name += ((" ") + (c+1));
    }
    systems.update({_id : id},p);
    return id;
  },
  createPlayer : function(name){
    exists = players.find({name:name}).count();
    if (exists >= 1){
      console.log("player exists");
      return;
    }
    planetID = Meteor.call("createPlanet");
    p = gen.player.new(name);
    p.planet = planetID;
    playerID = players.insert(p);
    planets.update({_id : planetID},{$set : {player : playerID}});
  },
  purgePlayers : function(){
    players.remove({});
  },
  purgePlanets : function(){
    planets.remove({});
  },
  purgeSystems : function(){
    systems.remove({});
  },
  getUsername : function(id){
    var x = players.findOne({_id : id});
    var y = x? x.name : null;
    return y;
  }
});
