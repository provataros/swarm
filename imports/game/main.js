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
var enough = {
    unit : Unit.enough,
    structure : _true,
    resource : _true,
    upgrade : _true,
}


game.action = function(obj){
  if (!obj || !obj.type)return;
  return actions[obj.type](obj);
}
game.enough = function(obj){
  if (!obj || !obj.type)return true;
  return enough[obj.type](obj);
}


export const Game = game;
