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



//{"resources":{"meat":{"name":"meat","amount":0},"metal":{"name":"metal","amount":375}},"structures":[{"name":"hatchery","units":[{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"drone","cost":[{"type":"meat","amount":50},{"type":"metal","amount":20}],"stats":{"hp":120,"speed":16}}],"upgrades":{"available":[{"name":"barracks","action":"test"}]}}],"units":[{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"drone","cost":[{"type":"meat","amount":50},{"type":"metal","amount":20}],"stats":{"hp":120,"speed":16}},{"name":"drone","cost":[{"type":"meat","amount":50},{"type":"metal","amount":20}],"stats":{"hp":120,"speed":16}},{"name":"drone","cost":[{"type":"meat","amount":50},{"type":"metal","amount":20}],"stats":{"hp":120,"speed":16}},{"name":"drone","cost":[{"type":"meat","amount":50},{"type":"metal","amount":20}],"stats":{"hp":120,"speed":16}},{"name":"drone","cost":[{"type":"meat","amount":50},{"type":"metal","amount":20}],"stats":{"hp":120,"speed":16}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}},{"name":"spawn","cost":[{"type":"meat","amount":10},{"type":"metal","amount":5}],"stats":{"hp":10,"speed":5}}]}
