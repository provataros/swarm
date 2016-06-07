import {Template } from 'meteor/templating';
import {db} from "/client/imports/localdb"
import {Helpers} from "/client/imports/helpers"

Template.structure.events({
  "click" : function(e){
    e.stopPropagation();
    console.log(Helpers);
    Helpers.selectSingle(this);
  },
  "mouseenter" : function(e){
    e.stopPropagation();
    Helpers.hover(this);
  },
  "mouseleave" : function(e){
    e.stopPropagation();
    Helpers.unhover(this);
  }
})

Template.structureUnits.helpers({
  selectedStructureUnits(){
    return db.base.find({name : {$in : this.units }});
  }
})
