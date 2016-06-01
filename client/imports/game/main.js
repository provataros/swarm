import {Unit} from "./unit/unit.js"
import {Structure} from "./structure/structure.js"
import {Player} from "./player/player.js"
import {Resource} from "./resource/resource.js"
import {Upgrade} from "./upgrade/upgrade.js"

var game = {};

game.unit = Unit;
game.structure = Structure;
game.player = Player;
game.resource = Resource;
game.upgrade = Upgrade;


function _true(){
  return true;
}

var actions = {
    unit : Unit.create,
    upgrade : Upgrade.execute,
    resource : Resource.gather,
    structure : _true,
}
var reserve = {
    unit : Unit.reserve,
    structure : _true,
    resource : _true,
    upgrade : Upgrade.reserve,
}

var cancel = {
    unit : Unit.cancel,
    structure : _true,
    resource : _true,
    upgrade : Upgrade.cancel,
}

var cost = {
    unit : Unit.cost,
    structure : Structure.cost,
    resource : _true,
    upgrade : Upgrade.cost,
}



game.do = function(obj){
  if (!obj || !obj.type)return true;
  var f = reserve[obj.type](obj);
  if (f) actions[obj.type](obj);
}

game.action = function(obj){
  if (!obj || !obj.type)return;
  return actions[obj.type](obj);
}
game.reserve = function(obj){
  if (!obj || !obj.type)return true;
  return reserve[obj.type](obj);
}
game.cancel = function(obj){
  if (!obj || !obj.type)return true;

    console.log(cancel);
  return cancel[obj.type](obj);
}
game.cost = function(obj){
  if (!obj || !obj.type)return true;
  return cost[obj.type](obj);
}



export const Game = game;
