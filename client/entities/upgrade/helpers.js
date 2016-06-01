import { Template } from 'meteor/templating';
import {Game} from "/client/imports/game"

Template.upgrade.events({
  "click"(){
    //Meteor.call("queueUpgrade",this.name);
    Game.do(this);
  }
});
