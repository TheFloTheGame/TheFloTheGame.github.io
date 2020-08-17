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
    var mitte = Object.assign({}, data);;
    mitte.features = mitte.features.filter(function(d){return d.properties.name=="Altstadt" || d.properties.name=="Neustadt"
    || d.properties.name=="Karlstraße" || d.properties.name=="Michelsberg" || d.properties.name=="Gaisenberg"
    || d.properties.name=="Wilhelmsburg"})
    svg.append("g")
        .attr("id", "Mitte")
        .selectAll("path")
        .data(mitte.features)
        .enter()
        .append("path")
            .attr("fill", "#B0B0B0")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#B0B0B0")
    var oststadt = Object.assign({}, data);
    oststadt.features = oststadt.features.filter(function(d){return d.properties.name=="Wielandstraße"
    || d.properties.name=="Friedrichsau" || d.properties.name=="Safranberg" || d.properties.name=="Eberhardtstraße"})
    svg.append("g")
    .attr("id", "Oststadt")
        .selectAll("path")
        .data(oststadt.features)
        .enter()
        .append("path")
            .attr("fill", "#909090")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#909090")
    var bofingen = Object.assign({}, data);
    bofingen.features = bofingen.features.filter(function(d){return d.properties.name=="Eichenplatz"
    || d.properties.name=="Braunland" || d.properties.name=="Böfingen-Gewebegebiet" || d.properties.name=="Böfingen Süd"
    || d.properties.name=="Böfingen Mitte" || d.properties.name=="Böfingen Ost" || d.properties.name=="Obertalfingen"
    || d.properties.name=="Böfingen Nord"})
    svg.append("g")
        .attr("id", "Böfingen")
        .selectAll("path")
        .data(bofingen.features)
        .enter()
        .append("path")
            .attr("fill", "#707070")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#707070")
    var weststadt = Object.assign({}, data);
    weststadt.features = weststadt.features.filter(function(d){return d.properties.name=="Nördliche Wagnerstraße"
    || d.properties.name=="Blaubeurer Straße-Gewerbegebiet" || d.properties.name=="Schillerstraße" || d.properties.name=="Südliche Wagnerstraße"
    || d.properties.name=="Donaubastion" || d.properties.name=="Galgenberg" || d.properties.name=="Unterer Kuhberg"
    || d.properties.name=="Sedanstraße" || d.properties.name=="Saarlandstraße" || d.properties.name=="Mittlerer Kuhberg"})
    svg.append("g")
        .attr("id", "Weststadt")
        .selectAll("path")
        .data(weststadt.features)
        .enter()
        .append("path")
            .attr("fill", "#707070")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#707070")
    var eselsberg = Object.assign({}, data);
    eselsberg.features = eselsberg.features.filter(function(d){return d.properties.name=="Eselsberg Mitte" 
    || d.properties.name=="Mähringer Weg" || d.properties.name=="Hetzenbäumle" || d.properties.name=="Lehrer Tal"
    || d.properties.name=="Universität" || d.properties.name=="Hasenkopf" || d.properties.name=="Am Weinberg"
    || d.properties.name=="Wanne" || d.properties.name=="Türmle" || d.properties.name=="Häringsacker"})
    svg.append("g")
        .attr("id", "Eselsberg")
        .selectAll("path")
        .data(eselsberg.features)
        .enter()
        .append("path")
            .attr("fill", "#909090")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#909090")
    var soflingen = Object.assign({}, data);
    soflingen.features = soflingen.features.filter(function(d){return d.properties.name=="Alt-Söflingen"
    || d.properties.name=="Sonnenstraße" || d.properties.name=="Auf der Laue" || d.properties.name=="Söflingen-Gewerbegebiet"
    || d.properties.name=="Roter Berg-Alt" || d.properties.name=="Harthausen" || d.properties.name=="Roter Berg-Neu"})
    svg.append("g")
        .attr("id", "Söflingen")
        .selectAll("path")
        .data(soflingen.features)
        .enter()
        .append("path")
            .attr("fill", "#B0B0B0")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#B0B0B0")
    var grimmelfingen = Object.assign({}, data);
    grimmelfingen.features = grimmelfingen.features.filter(function(d){return d.properties.name=="Grimmelfingen"})
    svg.append("g")
        .attr("id", "Grimmelfingen")
        .selectAll("path")
        .data(grimmelfingen.features)
        .enter()
        .append("path")
            .attr("fill", "#B0B0B0")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#B0B0B0")
})
//---MAP PUNKTE---\\
var ponts = [
    {long: 447.169, lat: 278.207},
    {long: 447.169, lat: 278.207},
]