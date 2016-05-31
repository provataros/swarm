
import {localdb} from "./imports/localdb";
import {Persistence} from "./imports/persistence"
//import {Sync} from "./imports/sync"
import {Template} from "meteor/templating";


Template.registerHelper("player",function(arg){
  return localdb.findOne();
})

Template.registerHelper('toArray',function(obj){
    var result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});
