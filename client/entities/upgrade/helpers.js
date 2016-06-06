import { Template } from 'meteor/templating';
import {Game} from "/client/imports/game";
import {db} from "/client/imports/localdb";


Template.upgrade.events({
  "click"(){
    //Meteor.call("queueUpgrade",this.name);
    this.parent = Session.get("selectedItem");
    Game.do(this);
  }
});

Template.registerHelper("upgrades",function(){
  if (!this.upgrades)return;
  return db.base.find({name : {$in : this.upgrades.available }});
})
