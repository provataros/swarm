import { Template } from 'meteor/templating';
import {Game} from "/imports/game"

Template.upgrade.events({
  "click"(){
    //Meteor.call("queueUpgrade",this.name);
    console.log(this);
    Game.upgrade.execute(this);
  }
});
