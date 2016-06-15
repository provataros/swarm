
import {db} from "./imports/localdb";
import {Persistence} from "./imports/persistence";
import {Template} from "meteor/templating";
import {Timers} from "/client/imports/timers";

import {_3D} from "/client/imports/3D";
import {Planet} from "/imports/planet";

var time = 1;
var id = "SXxn64cvuCZdAzAJy" + time;
Template.body.rendered = function () {
  var planet = _3D.create.planet(Planet.generate(id));
  _3D.show.planet(planet);
};

Template.body.events({
  "click"(){
      //3D.showPlanet({_id : Math.random()});
  }
})
