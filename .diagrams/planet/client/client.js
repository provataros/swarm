Meteor.subscribe("planets");
Meteor.subscribe("players");
Meteor.subscribe("systems");
Meteor.subscribe("defaults");

Session.setDefault("selectedEntity",null);
Session.setDefault("planetUsername",null);
prev_planetUsername = null;

function getText(){
  return document.getElementById("input").value;
}

Template.body.events({
  "click .createEntity" : function(e){
    x = getText();
    if (e.target.id == "createPlayer"){
      if ( x !=""){
        return Meteor.call(e.target.id,x);
      }
    }
    else if (e.target.id == "createPlanet"){
      return Meteor.call(e.target.id);
    }
    else if (e.target.id == "createSystem"){
      return Meteor.call(e.target.id);
    }

  },
  "click .playername" : function(e){
    Session.set("selectedEntity",{type : "player", object : this});
    //console.log(this);
  },
  "click .systemname" : function(e){
    Session.set("selectedEntity",{type : "system", object : this});
    showSystem(this);
    //console.log(this);
  },
  "click .planetname" : function(e){
    showPlanetPanel(this);
    showPlanet(this);
  },
  "click #header" : function(){
    Session.set("selectedEntity",null);
  },
  "click #playerHeader" : function(){
    Meteor.call("purgePlayers");
  },
  "click #planetHeader" : function(){
    Meteor.call("purgePlanets");
  },
  "click #systemHeader" : function(){
    Meteor.call("purgeSystems");
  },
  "mouseover .hexagon" : function(){
    console.log("click");
  },
  "click #showPanel" : function(e){
      $("#showPanel").hide();
      $("#panel").show();
  },
  "click #closePanel" : function(){
    $("#panel").hide();
    $("#showPanel").show();
  },


});


Template.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});


Template.body.helpers({
  planetEntries: function(){
    return db.collections.planets.find({});
  },
  playerEntries: function(){
    return db.collections.players.find({});
  },
  systemEntries: function(){
    return db.collections.systems.find({});
  },
  isPlanet : function(){
    x = Session.get("selectedEntity");
    if (x==null)return null;
    return x.type == "planet";
  },
  isPlayer : function(){
    x = Session.get("selectedEntity");
    if (x==null)return null;
    return x.type == "player";
  },
  planetEntity : function(){
    data = Session.get("selectedEntity").object;
    return data;
  },
  playerEntity : function(){
    data = Session.get("selectedEntity").object;
    return data;
  },
  systemEntity : function(){
    data = Session.get("selectedEntity").object;
    return data;
  },
});

Template.planet.helpers({
  units: function(){
    return this.units;
  },
  player_name : function(){
    x = Session.get("planetUsername");
    if (prev_planetUsername == x){
      return null;
    }
    prev_planetUsername = x;
    console.log(x);
    return x;
  }
});
