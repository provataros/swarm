Generators.system = {};

Generators.system.new = function(id){
  var x = {
    _id : id,
  };
  var rnd = new Math.seedrandom(id);
  var s = Meteor.call("createPlanet");
  x.name = randomPlanetName(rnd);
  x.sun = s._id;

  var p = rng.number(1,10,rnd);
  var r = [];
  for (var i=0;i<p;i++){
    var nn = Meteor.call("createPlanet",1);
    nn.distance = rng.number((i+1)*2,(i+1)*10,rnd);
    r.push(nn._id);
  }
  x.planets = r;
  return x;
}
