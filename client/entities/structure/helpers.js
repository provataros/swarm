import {Template } from 'meteor/templating';
import {db} from "/client/imports/localdb"


Template.structure.events({
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
})

Template.registerHelper("selectedStructure",function(){
  return db.structure.findOne({_id : Session.get("selectedItem")._id});
});


Template.registerHelper("structures",function(){
  return db.structure.find({});
});

Template.structureUnits.helpers({
  selectedStructureUnits(){
    return db.base.find({name : {$in : this.units }});
  }
})
