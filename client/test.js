
import {db} from "./imports/localdb";
import {Persistence} from "./imports/persistence";
import {Template} from "meteor/templating";
import {Timers} from "/client/imports/timers";

import {Geometry} from "/client/imports/render/geometry";

Template.body.rendered = function () {
  Geometry.showPlanet({_id : Math.random()});
};

Template.body.events({
  "click"(){
      Geometry.showPlanet({_id : Math.random()});
  }
})
