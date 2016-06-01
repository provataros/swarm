import {Template } from 'meteor/templating';
import {State} from "/client/imports/state"

function select(that){
  Session.set("selectedStructure",that);
}

Template.structure.events({
  "click" : function(e){
    e.stopPropagation();
    select(this);
  }
})

Template.structure.helpers({
  reselect : function(){
    var s = Session.get("selectedStructure");
    if (!s)return;
    if (this.name == s.name){
      select(this);
    }
  },
})

Template.registerHelper("selectedStructure",function(){
  var s = Session.get("selectedStructure");
  if (s){
    return s;
  }
});
