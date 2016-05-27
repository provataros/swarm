import {Template } from 'meteor/templating';


Template.listUnits.helpers({
  units(){
    var f = Players.findOne();
    if (f){
      return f.units;
    }
  }
});

Template.showUnits.helpers({
  units(){
    return this.units;
  }
});

Template.listUnits.helpers({
  units(){
    var f = Players.findOne();
    if (f){
      return f.units;
    }
  }
});
Template.unitCreate.events({
  "click .createBtn"(){
    Meteor.call("queueUnit",this.name);
  }
});
