var settings = {
  times : {
    spawn : 2000,
    meat : 100,
    drone : 1000,
  },
  drone_meat : 10,
  hive_capacity : 50
};


var units = {

  spawn : {
    name : "Spawn",
    cost : [
      {
        amount : 0,
        type : "spawn"
      }
    ]
  },

  drone : {
    name : "Drone",
    cost : [
      {
        amount : 1,
        type : "spawn"
      },
      {
        amount : 100,
        type : "meat",
      }
    ],
  }
}
