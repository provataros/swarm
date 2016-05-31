import {Persistence} from "/client/imports/persistence"
import {localdb} from "/client/imports/localdb";
import {Game} from "/imports/game";

var callbacks = {};
var interval = 17;
var running = false;
var ticker;



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

Game._action = Game.action;
Game.action = medium;


function medium(obj){
  var now = Date.now();
  if (!obj.time){
    Game._action(obj);
    return;
  }
  if (!Game.enough(obj)){
    return;
  }
  var q =  {
    start : now,
    end : now + obj.time,
    obj : obj
  };
  localdb.update({},{$push : {
    queue : q
  }});
  action(q);
}

function action(q){
  register(q.start,q.start,q.end,
  function(f){
    $("#t"+q.start).val(f);
  },
  function(){
    Game._action(q.obj);
    localdb.update({},{$pull : {
      queue : {
        start : q.start
      }
    }});
  });
}

Meteor.startup(function(){
  var timers = localdb.findOne().queue;
  if (!timers)return;
  for (var i=0;i<timers.length;i++){
    action(timers[i]);
  }
});


export const Progressbar = {
  register : register,
  run : run
};
