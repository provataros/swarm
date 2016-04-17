import {Players} from "/imports/database";
import { Template } from 'meteor/templating';

Template.registerHelper("aomView", function(optionalValue) {
  var f = Players.findOne();
  if (f){
    return f;
  }
});
