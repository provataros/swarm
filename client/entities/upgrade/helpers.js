import { Template } from 'meteor/templating';


Template.upgrade.events({
  "click"(){
    Meteor.call("queueUpgrade",this.name);
  }
});
