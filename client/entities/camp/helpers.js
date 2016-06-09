import {Template } from 'meteor/templating';
import {db} from "/client/imports/localdb"
import {Helpers} from "/client/imports/helpers"

Template.registerHelper("camps",function(){
  return db.camp.find({});
})

Template.camp.events({
  click(){
    Helpers.deselectMulti();
    Helpers.deselectSingle();
    Session.set("selectedCamp",this.name);
  }
})
