import {Template } from 'meteor/templating';
import {Factory} from "/imports/factory";
import {Game} from "/imports/game";

import {Progressbar} from "/client/imports/progressbar";

Template.unitCreate.events({
  "click button"(){
    //Progressbar.register()
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
