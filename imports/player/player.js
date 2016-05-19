var player = {
  default(){
    return {
      upgrades : {
        available : [{name : "barracks"}]
      },
      structures : [
        {
          name : "hatchery",
          units : [
            {
              name : "spawn",
              hp   : 10
            },
            {
              name : "larva",
              hp   : 5
            }
          ]
        },

      ]
    }
  }
};

export const Player = player;
