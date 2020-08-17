const margin = { top: 50, left: 50, right: 50, bottom: 50 };

//---MAP---\\
const mapCanvas = document.getElementById('mapCanvas');
var svg = d3.select(mapCanvas).append('svg')
    .attr("width", 1000)
    .attr("height", 1000);
var mapWidth = +svg.attr("width"),
    mapHeight = +svg.attr("height");
var projection = d3.geoMercator()
    .center([9.96, 48.38])
    .scale(200000)
    .translate([mapWidth / 2, mapHeight / 2])
d3.json("https://raw.githubusercontent.com/TheFloTheGame/Ulm-Baum/master/data/ulm.geojson").then(function(data){
    svg.append("g")
        .attr("id", "Mitte")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "#B0B0B0")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "blue")
})
//---MAP PUNKTE---\\
var ponts = [
    {long: 447.169, lat: 278.207},
    {long: 447.169, lat: 278.207},
]