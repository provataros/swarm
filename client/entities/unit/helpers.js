import {Template } from 'meteor/templating';
import {Factory} from "/imports/factory";
import {Game} from "/client/imports/game";

Template.unitCreate.events({
  "click button"(){
    var u = Game.do(this);
  }
});

Template.unitList.events({
  "click" : function(e){
    e.stopPropagation();
    Session.set("selectedUnit",this);
  }
});

Template.registerHelper("selectedUnit",function(){
  var s = Session.get("selectedUnit");
  if (s){
    return s;
  }
});
