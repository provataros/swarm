Meteor.methods({
  createUnit : function(type){
    var g = Generators.units;
    var u = g.createUnit(type);
    if (u){
      db.units.insert(u);
    }
    console.log(u);
  }
});
