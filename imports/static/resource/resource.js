var items = {
  meat : {
    title : "Meat",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
    icon : "meat.png"
  },
  metal : {
    title : "Metal",
    desc : "Unholy spawn of something, this unit is the motherfucker of things",
    icon : "metal.png"
  },
}

var item = function(name){
  return items[name]?items[name]:{};
}
item.exists = function(name){
  return !(items[name] == undefined);
}
export const Resource  = item;
