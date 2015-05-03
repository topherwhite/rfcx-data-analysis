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
  var count = 0; for (l in lines) {  if (lines[l].indexOf(".wav") != -1) { count++; } }
  var rep = 0;
  console.log("About "+count+" audio files to analyze...");
  for (l in lines) { if (lines[l].indexOf(".wav") != -1) {
    rep++;
    var fileName = lines[l].substr(lines[l].lastIndexOf(".wav")-32,32)+".wav";
    var timestamp = lines[l].substr(lines[l].lastIndexOf(".wav")-19,19);
    var dateTime = (new Date(timestamp.substr(0,timestamp.indexOf("T"))+"T"+timestamp.substr(1+timestamp.indexOf("T")).replace(/-/g,":"))).toISOString();

    var checkInId = lines[l].substr(lines[l].lastIndexOf(".wav")-32,32);
    var audioId = lines[l].substr(lines[l].lastIndexOf(".wav")-32,32);

    var execStr = "cd /Users/topher/code/rfcx/worker-analysis && /usr/local/bin/python2.7"
      +" /Users/topher/code/rfcx/worker-analysis/analyze.py"
        +" --wav_path /Volumes/rfcx-audio/GuardianAudio/"+guid+"/"+fileName
    //        +" -data /Users/topher/code/rfcx/worker-analysis/config/input_defaults.properties"
           +" --guardian_id "+guid
           +" --checkin_id checkin-"+checkInId
           +" --audio_id audio-"+audioId
           +" --start_time '"+dateTime+"'"
           +" --ambient_temp "+40
           +" --lat_lng "+"3.6141375,14.2108033"
           +" --local"
          +" >> /Volumes/rfcx-audio/GuardianAudio/"+guid+"/"+fileName+".txt"
          ;
      
      console.log(fileName);

      execSync(execStr);

  } }
}

