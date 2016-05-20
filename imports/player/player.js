import {Structure} from "/imports/structure"
var player = {
  default(){
    return {
      upgrades : {
        available : [{name : "barracks"}]
      },
      structures : [Structure.hatchery]
    }
  }
};

export const Player = player;
