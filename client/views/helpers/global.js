
import {Template} from 'meteor/templating';
import {db} from "/client/imports/localdb";
import {Static} from "/imports/static";


Template.registerHelper("selectedUnit",function(){
  return db.unit.findOne({_id : Session.get("selectedItem")._id});
});

Template.registerHelper("units",function(){
  var f = db.unit.find({owner : Session.get("selectedCamp")});
  return f;
});

Template.registerHelper("getUnit",function(id){
  return db.unit.findOne({_id : id});
});

Template.registerHelper("selectedStructure",function(){
  return db.structure.findOne({_id : Session.get("selectedItem")._id});
});

Template.registerHelper("structures",function(){
  var f = db.structure.find({owner : Session.get("selectedCamp")});
  return f;
});
