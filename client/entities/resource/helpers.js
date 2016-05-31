import {Template} from 'meteor/templating';
import {Game} from "/imports/game"

Template.showResources.events({
  "click button"(e){
    Game.action(this);
  }
});

Template.showResources.helpers({
    "resources"(a){
      return $.map(this.resources, function(value, index) {
        return [value];
      });
  }
})
