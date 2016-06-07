rng = {

  number : function(min,max,rnd){
    if (!rnd){
      rnd = Math.random;
    }
    if (!min && min != 0 ){
      min = 0;
    }
    if (!max && max != 0 ){
      max =  Number.MAX_SAFE_INTEGER-100;
    }
    return Math.floor(rnd() * (max - min + 1)) + min;
  }

};


rng.settings = {
  life : 50,
}
