const margin = { top: 50, left: 50, right: 50, bottom: 50 };

//---MAP---\\
const mapCanvas = document.getElementById('mapCanvas');
var svg = d3.select(mapCanvas).append('svg')
    .attr("width", 1000)
    .attr("height", 1000);
var mapWidth = +svg.attr("width"),
    mapHeight = +svg.attr("height");
var projection = d3.geoMercator()
    .center([10.015, 48.355])
    .scale(200000)
    .translate([mapWidth / 2, mapHeight / 2])
d3.json("https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/ulm.geojson").then(function(data){
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "grey")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "blue")
})