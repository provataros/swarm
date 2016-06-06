import {Template } from 'meteor/templating';
import {Factory} from "/imports/factory";
import {Game} from "/client/imports/game";
import {db} from "/client/imports/localdb";

Template.unitCreate.events({
  "click button"(){
    var u = Game.do(this);
  },
  "mouseenter" : function(e){
    e.stopPropagation();
    Session.set("hoverItem",this);
  },
  "mouseleave" : function(e){
    e.stopPropagation();
    Session.set("hoverItem",null);
  }
});

Template.unitList.events({
  "click" : function(e){
    e.stopPropagation();
    Session.set("selectedItem",this);
  },
  "mouseenter" : function(e){
    e.stopPropagation();
    Session.set("hoverItem",this);
  },
  "mouseleave" : function(e){
    e.stopPropagation();
    Session.set("hoverItem",null);
  }
});

Template.registerHelper("selectedUnit",function(){
  return db.unit.findOne({_id : Session.get("selectedItem")._id});
});

Template.registerHelper("units",function(){
  return db.unit.find({});
});
