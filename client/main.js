import { Template } from 'meteor/templating';


import './main.html';
import "./test.js"



Template.registerHelper("debug",function(arg){
  if (arg)console.log(arg);
})
