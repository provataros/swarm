var factory = {};

factory.createUnit = function(){
  console.log("create unit");
  return {hp : 50};
}

export const Factory = factory;
