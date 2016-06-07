var Timer = {

  resolution : 100,
  timers : {},

  create : function(name,time,mode,callback){
    var t = {
      current : 0,
      target : time/(1000/this.resolution),
      name : name,
      tick : function(){
        t.current++;

        if (t.current==t.target){
          t.current = 0;
          t.fire();
          if (!mode){
            clearInterval(t.f);
          }
        }
      }
    };
    if (callback)   t.fire = callback;
    else            t.fire = function(){console.log(t.name)};
    t.f = setInterval(function(){
      t.tick();
    },1000/this.resolution);

    this.timers[name] = t;
    return t;
  },

  getCurrent : function(name){
    if (this.timers[name])return this.timers[name].current;
    return 0;
  }}
