var tick_callbacks = {};


function tick(){
  for (var cb in tick_callbacks){
    tick_callbacks[cb]();
  }
}






export const Timer = tick_callbacks;
