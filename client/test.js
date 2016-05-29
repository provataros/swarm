import {localdb} from "./imports/localdb";
import {Persistence} from "./imports/persistence"
//import {Sync} from "./imports/sync"
import {Template} from "meteor/templating";


Template.registerHelper("player",function(arg){
  return localdb.findOne();
})
