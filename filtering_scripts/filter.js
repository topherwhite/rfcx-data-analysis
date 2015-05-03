#!/usr/bin/env node
var execSync = require('child_process').execSync;
var fs = require("fs");
var args = process.argv.slice(2);
var pwd = (""+execSync("pwd")).trim();
var guid = args[0];

if (typeof guid === "undefined") {
  console.log("provide a guid");
} else {
  var fileList = ""+execSync("ls -lh");
  var lines = fileList.split("\n");
  var count = 0; for (l in lines) {  if (lines[l].indexOf(".wav.txt") != -1) { count++; } }
  var rep = 0;
  console.log("About "+count+" detection dump files to analyze...");
  for (l in lines) { if (lines[l].indexOf(".wav.txt") != -1) {
    rep++;
    var wavFileName = lines[l].substr(lines[l].lastIndexOf(".wav")-32,32)+".wav";
    var txtFileName = wavFileName+".txt";
    var timestamp = lines[l].substr(lines[l].lastIndexOf(".wav")-19,19);
    var dateTime = (new Date(timestamp.substr(0,timestamp.indexOf("T"))+"T"+timestamp.substr(1+timestamp.indexOf("T")).replace(/-/g,":"))).toISOString();

    var checkInId = lines[l].substr(lines[l].lastIndexOf(".wav")-32,32);
    var audioId = lines[l].substr(lines[l].lastIndexOf(".wav")-32,32);

    var analysis = ""+execSync("cat "+pwd+"/"+txtFileName);
    if (analysis.indexOf("Found 0 areas of interest") != -1) {

      execSync("rm "+pwd+"/"+wavFileName+"; rm "+pwd+"/"+txtFileName+";");

    } else {

      var eventsSub1 = analysis.substr(analysis.indexOf("Completed classification"));
      var eventsSub2 = eventsSub1.substr(eventsSub1.indexOf("Found ")+6);
      var eventsSub3 = eventsSub2.substr(0,eventsSub2.indexOf("\n"));
      var events = eventsSub3.split(",");
      var gsmEventCount = 0; var truckEventCount = 0; var motorcycleEventCount = 0; var chainsawEventCount = 0; var carEventCount = 0; var unknownEventCount = 0;
      for (eventInd in events) {
        if (events[eventInd] == "GSM Noise") { gsmEventCount++; }
        else if (events[eventInd] == "truck") { truckEventCount++; }
        else if (events[eventInd] == "motorcycle") { motorcycleEventCount++; }
        else if (events[eventInd] == "chainsaw") { chainsawEventCount++; }
        else if (events[eventInd] == "car") { carEventCount++; }
        else if (events[eventInd] == "unknown") { unknownEventCount++; }
        else { console.log(events[eventInd]); }
      }
      if ((gsmEventCount+unknownEventCount) == events.length) {
        execSync("rm "+pwd+"/"+wavFileName+"; rm "+pwd+"/"+txtFileName+";");
      } else {
        console.log(audioId+" | trucks: "+truckEventCount+" | motorcycles: "+motorcycleEventCount+" | chainsaws: "+chainsawEventCount+" | cars: "+carEventCount+" | unknown: "+unknownEventCount);
      }
    }

  } }
}

