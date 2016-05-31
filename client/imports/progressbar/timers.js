var callbacks = {};
var interval = 10;
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


export const Progressbar = {
  register : register,
  run : run
};
