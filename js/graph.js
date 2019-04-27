let history2 = [
  { appName: "Chrome", usageTime: 15 },
  { appName: "Firefox", usageTime: 10 },
  { appName: "Opera", usageTime: 20 }
];

// let pcent = [];
// for (let i=0; i<3; i++)
//     pcent.push(history2[i].usageTime);
// console.log(pcent);

let width = 300,
  height = 300,
  radius = Math.min(width, height) / 2;

let color = d3
  .scaleOrdinal()
  .range(["#2C93E8", "#838690", "#F56C4E", "#808080", "#808000", "#00FFFF"]);

let pie = d3.pie().value(d => d.usageTime)(history2);

let arc = d3
  .arc()
  .outerRadius(radius - 10)
  .innerRadius(0);

let labelArc = d3
  .arc()
  .outerRadius(radius - 60)
  .innerRadius(radius - 60);

let svg = d3
  .select("#pie")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

let g = svg
  .selectAll("arc")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "arc");

g.append("path")
  .attr("d", arc)
  .style("fill", d => color(d.data.usageTime));

g.append("text")
  .attr("transform", function(d) {
    return "translate(" + labelArc.centroid(d) + ")";
  })
  .text(d => `${d.data.appName}`)
  .style("fill", "#fff");

let hisAppend = [
  { appName: "Maxthon", usageTime: 20 },
  { appName: "Edge", usageTime: 5 },
  { appName: "Safari", usageTime: 10 }
];
let ii = 0;

// let reportID = setInterval(() => {
//   // history2.forEach(item => {
//   //   item.usageTime += 10;
//   // });
//   if (hisAppend[ii] !== undefined) {
//     // console.log(ii);
//     history2.push(hisAppend[ii++]);
//     console.log(history2);
//   }
//   change();
// }, 2000);

for (let i = 0; i < 3; i++) {
  history2.push(hisAppend[i]);
  console.log(history2);
  change();
}

let renderBtn = document.getElementById("render-btn");
renderBtn.addEventListener("click", () => clearInterval(reportID));

function change() {
  // console.log(history2);
  var pie = d3.pie().value(function(d) {
    return d.usageTime;
  })(history2);
  path = d3
    .select("#pie")
    .selectAll("path")
    .data(pie); // Compute the new angles
  path.attr("d", arc); // redrawing the path
  d3.selectAll("text")
    .data(pie)
    .attr("transform", function(d) {
      return "translate(" + labelArc.centroid(d) + ")";
    }); // recomputing the centroid and translating the text accordingly.
  // ii += 1;
  // console.log(ii);
}
