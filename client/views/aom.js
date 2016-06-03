
import {Template} from 'meteor/templating';



Template.registerHelper("queue",function(){
  return db.queue.find({});
});
