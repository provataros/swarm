
import {Template} from 'meteor/templating';
import {db} from "/client/imports/localdb";
import {Static} from "/imports/static";


Session.set("selectedItem",{_id : 0});
Session.set("selectedItems",{_sel : []});


$(document).keyup(function(e) {
  if (e.keyCode === 27) Session.set("selectedItems",{_sel : []});   // esc
});






Template.registerHelper("selectedItem",function(){
  var s = Session.get("selectedItem");
  if (!s || !s.type)return;
  return db[s.type].findOne({_id : s._id});
});

Template.registerHelper("selectedItems",function(){
  var s = Session.get("selectedItems");
  return s;
});

Template.registerHelper("hoverItem",function(){
  var s = Session.get("hoverItem");
  if (!s || !s.type)return;
  //var f = db.base.findOne({name : s.name},{fields : {cost : 1}});
  return s;
});

Template.registerHelper("isQueue",function(){
  var s = Session.get("selectedItem");
  if (!s || !s.type)return;
  var f = db[s.type].findOne({_id : s._id, "queue.0" : {$exists : true}},{fields : {queue :  1}});
  return f;
});


Template.registerHelper("enoughResources",function(){
  var f = sufficientResources(this);
  return f?"enough":"notenough";
});

Template.registerHelper("checkResource",function(resource){
  var f = db.resources.find({name : resource.type ,amount : {"$gte" : resource.amount}});
  return f.count()==0?null:f;
});

function sufficientResources(unit){
  var flag = true;
  var check = [];
  var cost = unit.cost
  if (!cost)return true;
  for (var i=0;i<cost.length;i++){
    check.push({name : cost[i].type ,amount : {"$gte" : cost[i].amount}});
  }
  if (check.length <= 0)return;

  var num = db.resources.find( { $or : check });
  return num.count()==cost.length;
}

Template.registerHelper("static",function(field){
  if (field){
    return Static(field).title;
  }
  else{
    if (!this.type)return;
    return Static(this);
  }
});

Template.registerHelper("first_queue",function(){
  if (this.queue){
    return this.queue[0];
  }
});

Template.registerHelper("rest_queue",function(){
  if (this.queue){
    return this.queue.slice(1,this.queue.length);
  }
});

Template.registerHelper("isSelected",function(){
  return Session.get("selectedItems")[this._id]?"selected":""
});

Template.registerHelper("hasSelected",function(){
  return Session.get("selectedItems")._sel.length >0;
});
//info@forthnet.gr
