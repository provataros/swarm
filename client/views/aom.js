
import {Template} from 'meteor/templating';
import {db} from "/client/imports/localdb"

Template.registerHelper("selectedItem",function(){
  var s = Session.get("selectedItem");
  if (!s || !s.type)return;
  return db[s.type].findOne({_id : s._id});
});

Session.set("selectedItem",{_id : 0});

Template.registerHelper("enoughResources",function(){
  var f = sufficientResources(this);
  return f?"enough":"notenough";
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
