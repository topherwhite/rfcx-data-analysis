#!/usr/bin/env node
var execSync = require('child_process').execSync;
var fs = require("fs");
var args = process.argv.slice(2);

var guid = args[0];

if (typeof guid === "undefined") {
  console.log("provide a guid");
} else {
  var fileList = ""+execSync("ls -lh");
  var lines = fileList.split("\n");
  var count = 0; for (l in lines) {  if (lines[l].indexOf(".m4a") != -1) { count++; } }
  var rep = 0;
  console.log("About "+count+" audio files to rename...");
  for (l in lines) { if (lines[l].indexOf(".m4a") != -1) {
    rep++;
    var timestamp = parseInt(lines[l].substr(lines[l].lastIndexOf(".m4a")-13,13));
    var dateTime = (new Date(timestamp)).toISOString().substr(0,19).replace(/:/g,"-");
    execSync("mv ./"+timestamp+".m4a ./"+guid+"-"+dateTime+".m4a");
  } }
}