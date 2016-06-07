var game_status = {
}

var settings =  {
  durations : {
    queen : 60,
    drone : 10,
    spawn : 2,
    worker : 5,
    test : 360,
  }
}

function getStatus(){
  if (localStorage.status){
    game_status = JSON.parse(localStorage.status);
  }
  console.log(game_status);
}

function saveStatus(){
  localStorage.status = JSON.stringify(game_status)
}

var Timer = {
  interval : "",
  id : ""
}

var timers = {};
/*

if (!this.running[id]){
  this.running[id] = setInterval(function(){

    var x= self.getProgress(o);
    if (x>=10){
      localStorage[id] = JSON.stringify(o);
      self.startTimer(id);
      return;
    }
    $("#"+id+"_bar").val(x);
  },10);
}

*/

Timer.create = function(id,repeat = 1){

  if (!id)return;
  if (!settings.durations[id])return;
  this.id = id;
  this.duration = settings.durations[id];
  var t = Date.now();
  var o = {
    start : t,
    duration : this.duration*1000,
    repeat : repeat
  }

  this.interval = setInterval(function(){
    var x= self.getProgress(o);
    if (x>=10){
      localStorage[id] = JSON.stringify(o);
      self.startTimer(id);
      return;
    }
    $("#"+id+"_bar").val(x);
  },100);

  game_status[id] = o;
  saveStatus();
}

Timer.addRepeat = function(id){
  if (!game_status[id]){
    this.create(id);
  }
  console.log(game_status[id]);
}

Timer.startTimer = function(){

}

getStatus();
