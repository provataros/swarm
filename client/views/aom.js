import {Players} from "/imports/database";
import { Template } from 'meteor/templating';

Template.registerHelper("selectedStructure", function() {
  return Session.get("selectedStructure");
});

var timeouts = {};

Template.showQueue.helpers({
  time(){
    var t = this.time - Date.now();
    timeouts[this.id] = Meteor.setTimeout(function(){
      console.log("hehehe");
    },t)
    return this.time
  }
})
