import {Template} from 'meteor/templating';
import {Game} from "/client/imports/game";
import {UI} from "/client/imports/ui"

Template.showResources.events({
  "click button"(e){
    Game.do(this);
  }
});

Template.showResources.helpers({
    meat(a){
      return UI.resources.findOne({name : "meat"});
    },
    metal(){
      return UI.resources.findOne({name : "metal"});
    }
})
