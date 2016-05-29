var resources = {
  meat : {
    name : "meat",
    amount : 250,
  },
  metal : {
    name : "metal",
    amount : 500,
  },
}

var resource = function(name){
  return resources[name]?resources[name]:{};
}
resource.exists = function(name){
  return !(resources[name] == undefined);
}
export const Resource  = resource;
