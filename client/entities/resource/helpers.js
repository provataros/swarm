import {Template} from 'meteor/templating';
import {Game} from "/client/imports/game"

Template.showResources.events({
  "click button"(e){
    Game.do(this);
  }
});

Template.showResources.helpers({
    "resources"(a){
      return $.map(this.resources, function(value, index) {
        return [value];
      });
  }
})
