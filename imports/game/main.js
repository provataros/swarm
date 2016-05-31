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

var actions = {
    unit : Unit.create,
    upgrade : Upgrade.execute,
    resource : Resource.gather,
}

game.action = function(obj){
  console.log( obj.type);
  if (!obj || !obj.type)return;
  actions[obj.type](obj);
}


export const Game = game;
