

Generators.planet = {};

Generators.planet.new = function(id,type){
  var rnd = new Math.seedrandom(id);
  var templates = type!=null?sun_templates:planet_templates;
  var keys = Object.keys( templates );
  var index = rng.number(0,keys.length-1,rnd);
  var t = templates[keys[index]];
  console.log(rng.number(0,0,rnd));
  x = {
    _id : id,
    radius : rng.number(t.min_radius,t.max_radius,rnd),
    type : index,
    moons : rng.number(0,2,rnd),
    name : randomPlanetName(rnd),
  };
  return x;
}

randomPlanetName = function(rnd){
  index = rng.number(0,gen.planetNamePool.length,rnd);
  return gen.planetNamePool[index];
}
