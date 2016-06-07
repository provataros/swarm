
console.log("db.init");

Meteor.publish("planets",function(){
  return db.collections.planets.find({});
});
Meteor.publish("players",function(){
  return db.collections.players.find({});
});
Meteor.publish("systems",function(){
  return db.collections.systems.find({});
});
Meteor.publish("defaults",function(){
  return db.collections.defaults.find({});
});

Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    var u = Accounts.createUser({username: 'provataros', password : "a"});
    console.log(u);
    db.collections.players.insert({user : u});
  }
});
