import {Template } from 'meteor/templating';
import {db} from "/client/imports/localdb"


Template.structure.events({
  "click" : function(e){
    e.stopPropagation();
    Session.set("selectedStructure",this._id);
  }
})

Template.registerHelper("selectedStructure",function(){
  return db.structures.findOne({_id : Session.get("selectedStructure")});
});


Template.registerHelper("structures",function(){
  return db.structures.find({});
});

Template.structureUnits.helpers({
  selectedStructureUnits(){
    return db.base.find({name : {$in : this.units }});
  }
})
