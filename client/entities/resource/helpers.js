import {Template} from 'meteor/templating';
import {Game} from "/imports/game"

Template.showResources.events({
  "click button"(e){
    Game.resource.gather(this.name);
  }
});

Template.showResources.helpers({
    "resources"(a){
      return $.map(this.resources, function(value, index) {
        return [value];
      });
  }
})
