import {Template} from 'meteor/templating';

Template.showResources.events({
  "click .gatherBtn"(e){
    Meteor.call("queueGather",e.target.name);
  }
});
