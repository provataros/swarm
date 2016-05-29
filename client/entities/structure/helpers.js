import {Template } from 'meteor/templating';
import {Factory} from "/imports/factory";
import {Game} from "/imports/game"

Template.registerHelper("selectedStructure",function(){
  var s = Session.get("selectedStructure");
  if (s){
    return [];
  }
})

Template.structure.events({
  "click" : function(e){
    e.stopPropagation();
    Session.set("selectedStructure",this);
  }
})

Template.structureCreate.events({
  "click button"(){
    console.log(this);
    var u = Game.unit.create(this);
  }
})
