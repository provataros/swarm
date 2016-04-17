import {Players} from "/imports/database";
import { Template } from 'meteor/templating';

Template.listStructures.helpers({
  structures(){
    var f = Players.findOne();
    if (f){
      return f.structures;
    }
  }
});

Template.showStructures.helpers({
  structures(){
    return this.structures;
  }
});

Template.registerHelper("showStructures", function(optionalValue) {
  var f = Players.findOne();
  if (f){
    return f;
  }
});
