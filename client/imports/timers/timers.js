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
    db.queue.remove({start : this.start});
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
  console.log(callbacks[obj.start]);
  delete callbacks[obj.start];
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
  var q =  {
    start : now,
    end : now + obj.time,
    obj : obj
  };

  db.queue.insert(q);
  action(q);
}

function action(q){
  register(q.start,q.start,q.end,
  function(f){
    $("#t"+q.start).val(f);
  },
  function(){
    Game.action(q.obj);
    db.queue.remove({start : q.start});
  });
}

Meteor.startup(function(){
  var test = {};
  db.queue.find({}).forEach(function(doc){
    if (!test[doc.type])test[doc.type]=[];
    test[doc.type].push(doc);
    console.log(doc);
  })

  var timers = db.queue.find({}).fetch();
  if (!timers)return;
  for (var i=0;i<timers.length;i++){
    action(timers[i]);
  }
});


export const Timers = {
  register : register,
  run : run
};
