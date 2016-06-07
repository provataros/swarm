Template.info.helpers({
  units : function(){
    var f  = db.collections.players.findOne(
      {user : Meteor.userId()},
      {fields : {units : 1}} );
    if (f){
      console.log(f);
      return f.units;
    }
  },

});

Template.info.events({
  "click .create_btn": function(e){
    var f = Meteor.call("createUnit",e.target.name);
    console.log(f);
  }
});
