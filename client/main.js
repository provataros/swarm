import "./test.js";
import { Template } from 'meteor/templating';
import './main.html';



Template.registerHelper("debug",function(arg){
  if (arg)console.log(arg);
})
