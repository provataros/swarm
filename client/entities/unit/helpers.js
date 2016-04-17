import {Players} from "/imports/database";
import { Template } from 'meteor/templating';

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
    Meteor.call("createUnit",this.name);
    //console.log("tsak");
      //Players.update({_id : Players.findOne({})._id},{$push : {units : units[this.name]}})
  }
});
