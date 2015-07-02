#!/usr/bin/env node

var args = process.argv.slice(2);

var arg = args[0];

var fs = require("fs");

var rows = fs.readFileSync("/Users/topher/code/rfcx/data-sfid/public/data/events-filtered.txt","utf8").split("\r");

for (i in rows) {
  var row = rows[i].split("\t");
  var dt = (new Date(row[2].substr(0,row[2].indexOf("T"))+"T"+row[2].substr(1+row[2].indexOf("T")).replace(/-/g,":")+".000Z")).valueOf();
  var offset = (parseInt(row[3])+((parseInt(row[4])-parseInt(row[3]))/2))*1000;
  dt = dt + offset;
//  dt = dt + (1 * 3600 * 1000);
  var newDt = new Date(dt);
  var str = newDt.toGMTString();
  var hour = str.substr(str.indexOf(":")-2,2);
  var weekday = str.substr(0,str.indexOf(","));
  var dayNight = "night";
  if ((hour >= 6) && (hour < 18)) { dayNight = "day"; }

  console.log(dt/1000);
}

// var dt = (new Date("2015-"+timeStr+".000Z")).valueOf();

// dt = dt + (1 * 3600 * 1000);

// var newDt = new Date(dt);
// var str = newDt.toGMTString();
// var hour = str.substr(str.indexOf(":")-2,2);

// var dayNight = "night";
// if ((hour >= 6) && (hour < 18)) { dayNight = "day"; }

// console.log(dayNight);
// //console.log(str.substr(0,str.indexOf(",")));

