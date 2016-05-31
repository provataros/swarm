
import {Template} from 'meteor/templating';
import {Progressbar} from "/client/imports/progressbar"

Template.registerHelper("selectedStructure", function() {
  return Session.get("selectedStructure");
});

var timeouts = {};


Template.showQueue.helpers({
  time(){
    var id = "t"+this.id;
    var self = this;
    Progressbar.register(
      id,
      self.id,
      self.time,
      function(val){
        $("#"+id).val(val);
      },
      function(){
        $("#"+id).val(100);
      }
    );
    return this.time
  }
})
