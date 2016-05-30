import { Template } from 'meteor/templating';
import {Game} from "/imports/game"

Template.upgrade.events({
  "click"(){
    //Meteor.call("queueUpgrade",this.name);
    Game.upgrade.execute(this);
    console.log(this);
  }
});
