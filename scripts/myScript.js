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
    .translate([mapWidth / 2, mapHeight / 2]);
var points = [
    {long: 9.938, lat: 48.44}, // Mähringen
    {long: 9.969, lat: 48.437}, // Lehr
    {long: 10.005, lat: 48.448}, // Jungingen
    {long: 9.957, lat: 48.414}, // Eselsberg
    {long: 9.989, lat: 48.407}, // Stadtmitte
    {long: 10.007, lat: 48.41}, // Oststadt
    {long: 10.015, lat: 48.427}, // Böfingen
    {long: 9.973, lat: 48.392}, // Weststadt
    {long: 9.933, lat: 48.393}, // Söflingen
    {long: 9.893, lat: 48.383}, // Ermingen
    {long: 9.872, lat: 48.365}, // Eggingen
    {long: 9.907, lat: 48.357}, // Einsingen
    {long: 9.934, lat: 48.372}, // Grimmelfingen
    {long: 9.945, lat: 48.36}, // Donautal
    {long: 9.974, lat: 48.354}, // Wiblingen
    {long: 9.945, lat: 48.34}, // Gögglingen
    {long: 9.968, lat: 48.329}, // Unterweiler
    {long: 9.936, lat: 48.322}, // Donaustetten
];
d3.json("https://raw.githubusercontent.com/TheFloTheGame/Ulm-Baum/master/data/ulm.geojson").then(function(data){
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "#B0B0B0")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "blue");
    svg.selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
            .attr("cx", function(d){ return projection([d.long, d.lat])[0]})
            .attr("cy", function(d){ return projection([d.long, d.lat])[1]})
            .attr("r", 5) //TODO: change size depending on data
            .style("fill", "green"); //TODO: change color depending on data
});