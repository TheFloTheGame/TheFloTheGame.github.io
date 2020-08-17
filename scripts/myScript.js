const margin = { top: 50, left: 50, right: 50, bottom: 50 };

//---MAP---\\
const mapCanvas = document.getElementById('mapCanvas');
var svg = d3.select(mapCanvas).append('svg')
    .attr("width", 500)
    .attr("height", 500);
var mapWidth = +svg.attr("width"),
    mapHeight = +svg.attr("height");
var projection = d3.geoMercator()
    .center([0, 0])
    .scale(100)
    .translate([mapWidth / 2, mapHeight / 2])
d3.json("http://stadtplaene.ulm.de/geoserver/geoportalUlm/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geoportalUlm:Stadtteile_generalisiert&srsName=EPSG:3875&outputFormat=json", function(data){
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "grey")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "blue")
})