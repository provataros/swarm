import {Template } from 'meteor/templating';
import {Factory} from "/imports/factory";
import {Game} from "/client/imports/game";
import {db} from "/client/imports/localdb";
import {Helpers} from "/client/imports/helpers"


Template.unitCreate.events({
  "click button"(){
    var u = Game.do(this);
  },
  "mouseenter" : function(e){
    e.stopPropagation();
    Helpers.hover(this);
  },
  "mouseleave" : function(e){
    e.stopPropagation();
    Helpers.unhover(this);
  }
});

Template.unitList.events({
  "click" : function(e){
    e.stopPropagation();
    if (e.ctrlKey){
      Helpers.deselectSingle();
      Helpers.toggleMulti(this);
    }
    else{
      Helpers.deselectMulti();
      Helpers.selectSingle(this);
    }
  },
  "mouseenter" : function(e){
    e.stopPropagation();
    Helpers.hover(this);
  },
  "mouseleave" : function(e){
    e.stopPropagation();
    Helpers.unhover();
  },
});
