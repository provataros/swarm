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

export const Game = game;
