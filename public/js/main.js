

d3.tsv("public/data/events.tsv", function(error, data) {
  data.forEach(function(d) {
    d.type = d.type;
    d.id = d.id;
    d.guardian = d.guardian;
    d.time = new Date(d.time);
    d.unixtime = new Date((+d.unixtime)*1000);
    d.weekday = d.weekday;
    d.weekday_num = +d.weekday_num;
    d.hour = +d.hour;
    d.day_night = d.day_night;
    d.seek = d.seek;
    d.location = d.location;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

});