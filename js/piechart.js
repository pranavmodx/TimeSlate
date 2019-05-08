let keys = [...history];

let gRenderBtn = document.getElementById("Gstart-btn"),
  gStopBtn = document.getElementById("Gstop-btn"),
  gResetBtn = document.getElementById("Greset-btn");

gRenderBtn.disabled = true;

gStopBtn.addEventListener("click", () => {
  gStopBtn.disabled = true;
  gRenderBtn.disabled = false;
  clearInterval(gInter);
});

gRenderBtn.addEventListener("click", () => {
  gRenderBtn.disabled = true;
  gStopBtn.disabled = false;
});

gResetBtn.addEventListener("click", () => {
  gRenderBtn.disabled = false;
  gStopBtn.disabled = true;
  keys = [];
  ob = {};
  data = [];
  let element = document.getElementById("pie");
  element.parentNode.removeChild(element);
  let newElement = document.createElement("div");
  newElement.setAttribute("id", "pie");
});

document.getElementById("start-btn").addEventListener("click", () => {
  gInter = setInterval(() => {
    keys = [...history];
    update(makeData(data));
    // console.log(keys);
    // console.log(history);
  }, 2000);
});

// Causing trouble -> graph fails to load when below code is uncommented

// document.getElementById("Grender-btn").addEventListener("click", () => {
//   gInter = setInterval(() => {
//     keys = [...history];
//     update(makeData(data));
//     // console.log(keys);
//     // console.log(history);
//   }, 2000);
// });

var data = Array();

var width = 250,
  height = 250,
  radius = Math.min(width, height) / 2;

var svg = d3
  .select("#pie")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("g").attr("class", "slices");

var pie = d3
  .pie()
  .sort(null)
  .value(function(d) {
    return d.value;
  });

var arc = d3
  .arc()
  .outerRadius(radius * 1.0)
  .innerRadius(radius * 0.0);

var outerArc = d3
  .arc()
  .innerRadius(radius * 0.5)
  .outerRadius(radius * 1);

var key = function(d) {
  return d.data.label;
};

//var color = d3.scaleOrdinal(d3.schemeCategory10)
var color = d3.scaleOrdinal(d3.schemePastel1);
//.domain(["Assigned", "Complete", "Overdue", "Terminated", "Awaiting Review", "Attached"])
// .domain(keys);
//.range(["#1abc9c", "#27ae60", "#e74c3c", "#f1c40f", "#34495e", "#3498db", "#8e44ad"]);

// update(makeData());
let renderBtn = document.getElementById("render-btn");
renderBtn.addEventListener("click", () => {
  var inter = setInterval(function() {
    //var keys = history;
    update(makeData(data));
  }, 2000);
});

function mergeWithFirstEqualZero(first, second) {
  var secondSet = d3.set();

  second.forEach(function(d) {
    secondSet.add(d.label);
  });

  var onlyFirst = first
    .filter(function(d) {
      return !secondSet.has(d.label);
    })
    .map(function(d) {
      return { label: d.label, value: 0 };
    });

  var sortedMerge = d3.merge([second, onlyFirst]).sort(function(a, b) {
    return d3.ascending(a.label, b.label);
  });

  return sortedMerge;
}

function makeData(data) {
  // var data = Array();
  //var keys = [...history];

  let hTag = document.getElementById(`${keys[keys.length - 1]}`);
  let [hours, minutes, seconds] = hTag.innerHTML.split(":");
  hours = Number(hours);
  minutes = Number(minutes);
  seconds = Number(seconds);
  // console.log(seconds);
  let usageTime = hours * 60 + minutes * 60 + seconds;
  // console.log(usageTime);
  var ob = {};
  // console.log(keys);
  ob["label"] = keys[keys.length - 1];
  ob["value"] = usageTime;

  function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return i;
      }
    }
    return null;
  }

  var idx = findObjectByKey(data, "label", keys[keys.length - 1]);
  // console.log("Index : ", idx);
  if (idx !== null) {
    data[idx] = ob;
  } else {
    data.push(ob);
  }

  // Update 'data' array as follows :
  // 1. If 'ob' already present in 'data', then replace
  // 2. If not, push

  var sortedData = data.sort(function(a, b) {
    return d3.ascending(a.label, b.label);
  });

  return sortedData;
}

function randomCount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update(data) {
  var duration = 500;

  var oldData = svg
    .select(".slices")
    .selectAll("path")
    .data()
    .map(function(d) {
      return d.data;
    });

  if (oldData.length == 0) oldData = data;

  var was = mergeWithFirstEqualZero(data, oldData);
  var is = mergeWithFirstEqualZero(oldData, data);

  var slice = svg
    .select(".slices")
    .selectAll("path")
    .data(pie(was), key);

  slice
    .enter()
    .insert("path")
    .attr("class", "slice")
    .style("fill", function(d) {
      return color(d.data.label);
    })
    .each(function(d) {
      this._current = d;
    });

  slice = svg
    .select(".slices")
    .selectAll("path")
    .data(pie(is), key);

  slice
    .transition()
    .duration(duration)
    .attrTween("d", function(d) {
      var interpolate = d3.interpolate(this._current, d);
      var _this = this;
      return function(t) {
        _this._current = interpolate(t);
        return arc(_this._current);
      };
    });

  slice = svg
    .select(".slices")
    .selectAll("path")
    .data(pie(data), key);

  slice
    .exit()
    .transition()
    .delay(duration)
    .duration(0)
    .remove();
}
