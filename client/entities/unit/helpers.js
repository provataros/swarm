import {Template } from 'meteor/templating';
import {Factory} from "/imports/factory";
import {Game} from "/imports/game"

Template.unitCreate.events({
  "click button"(){
    console.log(this);
    var u = Game.unit.create(this);
  }
});

Template.unitList.events({
  "click" : function(e){
    e.stopPropagation();
    Session.set("selectedUnit",this);
    console.log(this);
  }
});

Template.registerHelper("selectedUnit",function(){
  var s = Session.get("selectedUnit");
  if (s){
    return s;
  }
});