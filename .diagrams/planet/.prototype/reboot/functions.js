var game_status = {
  units : {
    spawn : 0,
    drone : 0,
    meat : 100,
  },
  population : 0,
  meat_pools : [10000,55,50000],
  selected_pool : -1,
};



function canHatch(type){
  var cost = units[type].cost;
  if (game_status.population>=settings.hive_capacity){
    return false;
  }
  if (enoughResources(type)){
    return true;
  }
  else{
    return false;
  }
}

function hatch(type){
  if (canHatch(type)){
    game_status.units[type]++;
    game_status.population++;
    for (var i=0;i<units[type].cost.length;i++){
      game_status.units[units[type].cost[i].type]-=units[type].cost[i].amount;
      //updates[units[type].cost[i].type]();
      if (!isResource(units[type].cost[i].type)){
        game_status.population--;
      }
    }
  }
}

function enoughResources(type){
  var cost = units[type].cost;
  for (var i=0; i < cost.length;i++){
    if (game_status.units[cost[i].type] < cost[i].amount){
      console.log("not enough ",cost[i].type);
      return false;
    }
  }
  return true;
}
function isResource(type){
  if (type=="meat"){
    return true;
  }
  return false;
}
