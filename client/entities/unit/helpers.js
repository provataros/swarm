import {Template } from 'meteor/templating';
import {Factory} from "/imports/factory";
import {Game} from "/client/imports/game";
import {db} from "/client/imports/localdb";

Template.unitCreate.events({
  "click button"(){
    var u = Game.do(this);
  }
});

Template.unitList.events({
  "click" : function(e){
    e.stopPropagation();
    Session.set("selectedUnit",this._id);
  }
});

Template.registerHelper("selectedUnit",function(){
  return db.units.findOne({_id : Session.get("selectedUnit")});
});

Template.registerHelper("units",function(){
  return db.units.find({});
});
