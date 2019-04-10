let history2 = [{"appName": 'Chrome', "usageTime": 15}, {"appName": 'Firefox', "usageTime": 10}, {"appName": 'Opera', "usageTime": 20}];

let pcent = [];
for (let i=0; i<3; i++)
    pcent.push(history2[i].usageTime);
console.log(pcent);

let width = 300,
	height = 300,
    radius = Math.min(width, height) / 2;

let color = d3.scaleOrdinal().range(["#2C93E8","#838690","#F56C4E"]);
    
let pie = d3.pie()
    .value(d => d.usageTime)(history2);

let arc = d3.arc()
	.outerRadius(radius - 10)
    .innerRadius(0);
    
let svg = d3.select("#pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 +")");

let g = svg.selectAll("arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc");  

g.append("path")
.attr("d", arc)
.style("fill", d => color(d.data.usageTime));

g.append("text")
	.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	.text(d => `${d.data.appName} \n d.data.pcent`)
	.style("fill", "#fff");