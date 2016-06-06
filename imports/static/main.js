import {Unit} from "./unit/unit.js";
import {Structure} from "./structure/structure.js";
import {Upgrade} from "./upgrade/upgrade.js";
import {Resource} from "./resource/resource.js";

function stat(item){
  return stat[item.type](item.name);
}

stat.unit = Unit;
stat.structure = Structure;
stat.resource = Resource;
stat.upgrade = Upgrade;

export const Static = stat;
