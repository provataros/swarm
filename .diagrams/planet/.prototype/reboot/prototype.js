var controls_full = false;

$(window).on("load",function(){
  $('#queen').click(function(){
    if (controls_full){
      $('#controls').animate({
          top : $(window).height() - 125,
      }, 250);
      controls_full = false;
    }
    else{
      $('#controls').animate({
          top : 0,
      }, 250);
      controls_full = true;
    }
  });

  var pools = "";
  for (var i=0;i<game_status.meat_pools.length;i++){
    pools += "<button id='meat_pool_placeholder_"+i+"' class='placeholder'></button>";
  }
  $("#meat_pool_placeholder").html(pools);

  var c = $("#meat_pool_placeholder").children();
  for (var i=0;i<c.length;i++){
    c.eq(i).on("click",function(e){
      game_status.selected_pool = parseInt(e.target.id.charAt(e.target.id.length-1));
    })
  }

});
