import {Unit} from "./unit/unit.js"
import {Structure} from "./structure/structure.js"
import {Player} from "./player/player.js"
import {Upgrade} from "./upgrade/upgrade.js"

var factory = {};

factory.unit = Unit;
factory.structure = Structure;
factory.player = Player;
factory.upgrade = Upgrade;

export const Factory = factory;
