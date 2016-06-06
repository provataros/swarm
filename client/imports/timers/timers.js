console.log("timers");
import {Persistence} from "/client/imports/persistence"
import {localdb} from "/client/imports/localdb";
import {Game} from "/client/imports/game";
import {Template} from "meteor/templating";


var callbacks = {};
var interval = 17;
var running = false;
var ticker;
var queue = true;

Template.showQueue.events({
  "click progress"(){
    cancel(this);
    db[this.parent.type].update({_id : this.parent._id},{$pull : {queue : {id : this.id}}});
    next(this);
  }
})


function tick(){
  for (var cb in callbacks){
    var c = callbacks[cb];
    c.current = Date.now();
    if (c.current >= c.end){
      if (c.callback){
        c.callback();
      }
      delete callbacks[cb];
      run();
    }
    else{
      var f = c.end-c.current;
      c.action(100-((f*100)/(c.end-c.start)));
    }
  }
}



function cancel(obj){
  delete callbacks[obj.id];
  Game.cancel(obj.obj);
}

function register(id,start,end,func,callback){
  if (!callbacks[id]){
    callbacks[id] = {
      action : func,
      start : start,
      end : end,
      callback : callback,
      current : Date.now(),
      run : true,
    }
  }
  run();
}

function run(){
  if (Object.getOwnPropertyNames(callbacks).length <= 0){
    running = false;
    clearInterval(ticker);
    return false;
  }
  if (!running) ticker = setInterval(tick,interval);
  running = true;
}

Game._do = Game.do;
Game.do = medium;


function medium(obj){
  var now = Date.now();
  if (!obj.time){
    Game._do(obj);
    return;
  }
  if (!Game.reserve(obj)){
    return;
  }

  var s = Session.get("selectedItem");
  var q =  {
    start : null,
    end : null,
    obj : obj,
    id : now,
    parent : s
  };
  db[s.type].update({_id : s._id},{$push : {queue : q}});
  check(q);
}



function check(q){
  var timers = db[q.parent.type].find({ $and : [ {_id : q.parent._id},{"queue.0" : {$exists : true}}]}).fetch();
  if (!timers || timers.length == 0){
    return;
  }
  if (timers[0].queue[0].id == q.id){
    action(timers[0].queue[0],timers[0]);
  }
}

function action(q,s,p){
  var start = q.start?q.start:Date.now();
  var end = q.end?q.end:start + q.obj.time;
  q.start = start;
  q.end = end;
  db[s.type].update({_id : s._id}, {$set : {"queue.0.start" : q.start,"queue.0.end" : q.end}});
  register(q.id,q.start,q.end,
  function(f){
    $("#t"+q.id).val(f);
  },
  function(){
    Game.action(q.obj);
    db[s.type].update({_id : s._id},{$pull : {queue : {id : q.id}}});
    next(q);
  });
}

function next(q){
  var timers = db[q.parent.type].find({ $and : [ {_id : q.parent._id},{"queue.0" : {$exists : true}}]}).fetch();
  if (!timers || timers.length == 0){
    return;
  }
  action(timers[0].queue[0],timers[0]);
}


function startall(){
  var timers = $.merge(
    db.unit.find({"queue.0" : {$exists : true}}).fetch(),
    db.structure.find({"queue.0" : {$exists : true}}).fetch(),
  );
  if (!timers){
    return;
  }
  for (var i=0;i<timers.length;i++){
    var end = 0;
    var start = 0;
    for (var j=0;j<timers[i].queue.length;j++){
      var q = timers[i].queue[j];
      var s = q.parent;
      start = q.start?q.start:end;
      end = q.end?q.end:end+q.obj.time;
      var diff = Date.now()-end;
      if (diff >0){
        Game.action(q.obj);
        db[s.type].update({_id : s._id},{$pull : {queue : {id : q.id}}});
      }
      else{
        timers[i].queue[j].start = start;
        timers[i].queue[j].end = end;
        action(timers[i].queue[j],timers[i]);
        break;
      }
    }
  }
}

Meteor.startup(function(){
  startall();
});


export const Timers = {
  register : register,
  run : run
};
