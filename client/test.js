
import {localdb} from "./imports/localdb";
import {Persistence} from "./imports/persistence";
import {Template} from "meteor/templating";
import {Timers} from "/client/imports/timers";

Template.registerHelper("player",function(arg){
  //return UI.findOne();
})

Template.registerHelper('toArray',function(obj){
    var result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});
