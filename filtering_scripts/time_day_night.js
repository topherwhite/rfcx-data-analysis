#!/usr/bin/env node

var args = process.argv.slice(2);

var timeStr = args[0];

var dt = (new Date("2015-"+timeStr+".000Z")).valueOf();

dt = dt + (1 * 3600 * 1000);

var newDt = new Date(dt);
var str = newDt.toGMTString();
var hour = str.substr(str.indexOf(":")-2,2);

var dayNight = "night";
if ((hour >= 6) && (hour < 18)) { dayNight = "day"; }

console.log(dayNight);
//console.log(str.substr(0,str.indexOf(",")));

