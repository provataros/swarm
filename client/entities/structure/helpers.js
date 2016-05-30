import {Template } from 'meteor/templating';
import {Factory} from "/imports/factory";
import {Game} from "/imports/game"
import {localdb} from "/client/imports/localdb"


localdb.find({}).observe({
  changed : function(){
    reselect();
  }
});

function reselect(){
  var f = localdb.findOne();
  var s = Session.get("selectedStructure");
  if (s){
    for (var i=0;i<f.structures.length;i++){
      if (f.structures[i].name == s.name){
        s = f.structures[i];
      }
    }
  }
  Session.set("selectedStructure",s);
}

function select(that){
  Session.set("selectedStructure",that);
}

Template.structure.events({
  "click" : function(e){
    e.stopPropagation();
    select(this);
  }
})

Template.structureCreate.events({
  "click button"(){
    console.log(this);
    var u = Game.unit.create(this);
  }
})
