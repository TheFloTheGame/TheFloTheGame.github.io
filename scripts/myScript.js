const margin = { top: 50, left: 50, right: 50, bottom: 50 };

//---MAP---\\
const mapCanvas = document.getElementById('mapCanvas');
var svg = d3.select(mapCanvas).append('svg')
    .attr("width", 1000)
    .attr("height", 1000);
var mapWidth = +svg.attr("width"),
    mapHeight = +svg.attr("height");
var projection = d3.geoMercator()
    .center([0, 0])
    .scale(100)
    .translate([mapWidth / 2, mapHeight / 2])
d3.json("https://raw.githubusercontent.com/TheFloTheGame/Ulm-Baum/master/data/ulm.geojson?token=AMWD4TVVWY3X7EZCBJAFBU27HHN5K", function(data){
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "grey")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "blue")
})