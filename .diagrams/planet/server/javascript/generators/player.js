Generators.player = {};

Generators.player.new = function(name){
  x = {
    name : name,
    planet : null,
    achievments : {},
    units :[
      {
        name : "hydralisk",
        count : 10
      },
      {
        name : "larvae",
        count : 50
      },
      {
        name : "drone",
        count : 15
      },
    ],
  };
  return x;
}
