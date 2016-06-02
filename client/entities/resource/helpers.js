import {Template} from 'meteor/templating';
import {Game} from "/client/imports/game";
import {db} from "/client/imports/localdb";

Template.showResources.events({
  "click button"(e){
    Game.do(this);
  }
});

Template.registerHelper("resources",function(){
  return db.resources.find({});
});
