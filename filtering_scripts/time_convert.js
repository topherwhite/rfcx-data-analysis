#!/usr/bin/env node

var args = process.argv.slice(2);

var timeStr = args[0];

var dt = new Date(timeStr);

var stamp = Math.round(dt.valueOf()/1000);

console.log(stamp);

