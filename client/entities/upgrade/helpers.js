import { Template } from 'meteor/templating';
import {Game} from "/client/imports/game";
import {db} from "/client/imports/localdb";


Template.upgrade.events({
  "click"(){
    //Meteor.call("queueUpgrade",this.name);
    Game.do(this);
  }
});

Template.registerHelper("upgrades",function(){
  return db.base.find({name : {$in : this.upgrades.available }});
})
