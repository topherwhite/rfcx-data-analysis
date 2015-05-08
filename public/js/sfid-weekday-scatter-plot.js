var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var dataStats = {
  count: { }
};
var weekdayRef = { name: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ], number: [1,2,3,4,5,6,7] };
for (i in weekdayRef.name) { dataStats.count[weekdayRef.name[i]] = 0; }

console.log(dataStats);

var pointCount = {}; for (i in weekdayRef.name) { pointCount[weekdayRef.name[i]] = {}; for (var j = 0; j < 24; j++) {
  pointCount[weekdayRef.name[i]][""+j] = { truck:0, motorcycle:0, chainsaw:0, car:0 };
} }

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("public/data/events.tsv", function(error, data) {
  var count = {
    weekday: [0, 0, 0, 0, 0, 0, 0],
    type: {}
  };
  data.forEach(function(d) {
    d.id = d.id;
    d.guardian = d.guardian;
    d.time = new Date(d.time);
    d.unixtime = (new Date((+d.unixtime)*1000)).valueOf();
    d.weekday = d.weekday;
    d.weekday_num = +d.weekday_num;
    count.weekday[d.weekday_num-1]++;
    d.hour = +d.hour;
    d.day_night = d.day_night;
    d.seek = d.seek;
    d.location = d.location;
    d.type = d.type;

    pointCount[d.weekday][""+d.hour][d.type]++;
    
    if (d.type == "car") { d.weekday_num = d.weekday_num - 0.15; }
    else if (d.type == "chainsaw") { d.weekday_num = d.weekday_num - 0.05; }
    else if (d.type == "motorcycle") { d.weekday_num = d.weekday_num + 0.05; }
    else if (d.type == "truck") { d.weekday_num = d.weekday_num + 0.15; }

  });

  console.log(pointCount);

  x.domain(d3.extent(data, function(d) { return d.weekday_num; })).nice();
  y.domain(d3.extent(data, function(d) { return d.hour; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Day of Week");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Hour of Day")

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) { var out = Math.sqrt(20*pointCount[d.weekday][""+d.hour][d.type]/3.141593); if (out > 12) out = 12; return out; })
      .attr("cx", function(d) { return x(d.weekday_num); })
      .attr("cy", function(d) { return y(d.hour); })
      .style("fill", function(d) { return color(d.type); })
      ;


  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});