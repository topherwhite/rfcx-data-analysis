#!/usr/bin/env node
var execSync = require('child_process').execSync;
var fs = require("fs");
var args = process.argv.slice(2);

var fileList = ""+execSync("ls -lh");
var lines = fileList.split("\n");
var count = 0; for (l in lines) {  if (lines[l].indexOf(".m4a") != -1) { count++; } }
var rep = 0;
console.log("About "+count+" audio files to transcode...");
for (l in lines) { if (lines[l].indexOf(".m4a") != -1) {
  rep++;
  var name = lines[l].substr(lines[l].lastIndexOf(".m4a")-32,32);
  execSync("ffmpeg -i "+name+".m4a "+name+".wav;");
  execSync("rm "+name+".m4a;");
} }

