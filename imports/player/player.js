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
            }
          ]
        },

      ]
    }
  }
};

export const Player = player;
