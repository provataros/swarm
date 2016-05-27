import {Unit} from "./unit/unit.js"
import {Structure} from "./structure/structure.js"
import {Player} from "./player/player.js"

var factory = {};

factory.unit = Unit;
factory.structure = Structure;
factory.player = Player;

export const Factory = factory;
