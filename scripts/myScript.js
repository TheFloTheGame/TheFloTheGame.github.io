const margin = { top: 50, left: 50, right: 50, bottom: 50 };

const treeData = d3.merge([data_baeume, data_naturdenkmal]);

const treeDataDistrict = [
    treeData.filter(d => d.Bezirk === "280 Stadtteil Lehr"),
    treeData.filter(d => d.Bezirk === "200 Stadtteil Jungingen"),
    treeData.filter(d => d.Bezirk === "110 Stadtmitte"),
    treeData.filter(d => d.Bezirk === "120 Stadtteil Osten"),
    treeData.filter(d => d.Bezirk === "130 Stadtteil Böfingen"),
    treeData.filter(d => d.Bezirk === "140 Stadtteil Westen"),
    treeData.filter(d => d.Bezirk === "160 Stadtteil Söflingen"),
    treeData.filter(d => d.Bezirk === "240 Stadtteil Ermingen"),
    treeData.filter(d => d.Bezirk === "230 Stadtteil Eggingen"),
    treeData.filter(d => d.Bezirk === "270 Stadtteil Einsingen"),
    treeData.filter(d => d.Bezirk === "180 Stadtteil Wiblingen"),
    treeData.filter(d => d.Bezirk === "260 Stadtteil Gögglingen"),
    treeData.filter(d => d.Bezirk === "210 Stadtteil Unterweiler")
];

const TreeBotNames = [
    "Ulmus",
    "Sorbus",
    "Crataegus",
    "Pyrus",
    "Prunus",
    "Pinus",
    "Taxus",
    "Tilia",
    "Fraxinus",
    "Styphnolobium",
    "Robinia",
    "Salix",
    "Populus",
    "Quercus",
    "Fagus",
    "Alnus",
    "Betula",
    "Carpinus",
    "Corylus",
    "Pterocarya",
    "Acer",
    "Aesculus",
    "Platanus"
]

const TreeNames = [
    "Ulmen",
    "Mehlbeeren",
    "Weißdornen",
    "Birnen",
    "Prunus",
    "Kiefern",
    "Eiben",
    "Linden",
    "Eschen",
    "Japanische Schnurbäume",
    "Robinien",
    "Weiden",
    "Pappeln",
    "Eichen",
    "Buchen",
    "Erlen",
    "Birken",
    "Hainbuchen",
    "Haseln",
    "Flügelnüsse",
    "Ahorne",
    "Rosskastanien",
    "Platanen"
]

const TreeNamesS = [
    "Ulme",
    "Mehlbeere",
    "Weißdorne",
    "Birne",
    "Prunus",
    "Kiefer",
    "Eibe",
    "Linde",
    "Esche",
    "Japanischer Schnurbaum",
    "Robinie",
    "Weide",
    "Pappel",
    "Eiche",
    "Buche",
    "Erle",
    "Birke",
    "Hainbuche",
    "Hasel",
    "Flügelnuss",
    "Ahorn",
    "Rosskastanie",
    "Platane"
]

const districtArea = [
    5.59,    //Lehr
    14,   //Jungingen
    3,    //Stadtmitte (geschätzt da keine Info)
    2,    //Oststadt (geschätzt da keine Info)
    3,    //Böfingen (geschätzt da keine Info)
    3.2,    //Weststadt (geschätzt da keine Info)
    12,   //Söflingen (geschätzt da keine Info)
    8.37,    //Ermingen
    7.5,    //Eggingen (geschätzt, da keine Info)
    5.16,    //Einsingen
    7.5,    //Wiblingen (geschätzt, da keine Info)
    11.12,   //Gögglingen
    3,     //Unterweiler (geschätzt, da keine Info)
]

//---MAP---\\
const mapCanvas = document.getElementById('mapCanvas');
const heightScale = d3.scaleLinear()
    .domain([0, 30])
    .range([3, 20]);
const densityScale = d3.scaleLinear()
    .domain([0, 50])
    .range([3, 20]);
const ageScale = d3.scaleLinear()
    .domain([0, 200])
    .range([3, 20]);
const logScale = d3.scaleLinear()
    .domain([0, 100])
    .range([3, 20]);
const crownScale = d3.scaleLinear()
    .domain([0, 20])
    .range([3, 20]);
const healthScale = d3.scaleQuantize()
    .domain([0, 1, 2, 3, 4])
    .range(["#DE2B2B", "#D9992A", "#F2DF31", "#8DDC15", "#2E8A28"]);
var filteredBy = []
filteredBy.length = treeDataDistrict.length;
var valueAvrg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var points = [];
var svg = d3.select(mapCanvas).append('svg')
    .attr("width", 1000)
    .attr("height", 1000);
var mapWidth = +svg.attr("width"),
    mapHeight = +svg.attr("height");
var projection = d3.geoMercator()
    .center([9.96, 48.38])
    .scale(200000)
    .translate([mapWidth / 2, mapHeight / 2]);
d3.json("https://raw.githubusercontent.com/TheFloTheGame/Ulm-Baum/master/data/ulm.geojson").then(function(data){
    //Drawing the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "#B0B0B0")
            .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "blue")
        .style("opacity", ".3");
});

//---FUNCTIONS---\\

//Ändere die Baumfamilie
var currentAttr = 0;
var currentTree = 0;
changeFamily(0);
changeTree(0);


function changeFamily(n)
{
    var families = document.getElementsByClassName("menu");
    var treesInactive = document.getElementsByClassName("menuTree");
    var trees = document.getElementsByClassName("menuTree num" + n);
    for (let i = 0; i < families.length; i++) {
        families[i].className = families[i].className.replace(" active", "");
    }
    for (let i = 0; i < treesInactive.length; i++) {
        treesInactive[i].style.display = "none";
    }
    for (let i = 0; i < trees.length; i++) {
        trees[i].style.display = "inline";
    }
    families[n].className += " active";
}

//Ändere den Baum
function changeTree(n)
{
    currentTree = n;
    var trees = document.getElementsByClassName("menuTree");
    for (let i = 0; i < trees.length; i++) {
        trees[i].className = trees[i].className.replace(" active", "");
    }
    trees[n].className += " active";
    //TODO: Change data based on tree
    //Change infotext
    var count = document.getElementById("count");
    var treeP = document.getElementsByClassName("treeP");
    var countProtected = document.getElementById("countProtected");
    var types = document.getElementById("types");
    var treeT = document.getElementById("treeT");
    for (let i = 0; i < treeP.length; i++) {
        treeP[i].innerHTML = TreeNames[n];
    }
    count.innerHTML = treeData.filter(d => new RegExp(TreeBotNames[n]).exec(d.Baumart_botanisch) != null).length;
    countProtected.innerHTML = data_naturdenkmal.filter(d => new RegExp(TreeBotNames[n]).exec(d.Baumart_botanisch) != null).length;
    var typesT = d3.map(treeData.filter(d => new RegExp(TreeBotNames[n]).exec(d.Baumart_botanisch) != null), d => d.Baumart).keys();
    var typesStr = "";
    typesT.forEach((element, i) => {
        if(i < typesT.length - 2)
        {
            typesStr += element + ", "
        }
        else if(i < typesT.length - 1)
        {
            typesStr += element + " und "
        }
        else
        {
            typesStr += element;
        }
    });
    types.innerHTML = typesStr;
    treeT.innerHTML = TreeNamesS[n];

    //Change tree value
    for (let i = 0; i < status.length; i++) {
        status[i] = 0;
    }
    for (let i = 0; i < filteredBy.length; i++) {
        filteredBy[i] = treeDataDistrict[i].filter(d => new RegExp(TreeBotNames[n]).exec(d.Baumart_botanisch) != null);
        filteredBy[i].forEach(value => {
            if(value.Vitalitaetsstatus_aktuell.substring(0, 1) != "")
            {
                status[i] += Number(value.Vitalitaetsstatus_aktuell.substring(0, 1));
            }
        });
    }
    for (let i = 0; i < status.length; i++) {
        status[i] /= filteredBy[i].length;
    }
    filterBy(currentAttr);

    //Change map
    drawMap(n, currentAttr);
}

//Ändere das Attribut um welches gefiltert werden soll
function filterBy(n)
{
    var filterButtons = document.getElementsByClassName("filterButton");
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].className = filterButtons[i].className.replace(" active", "");
    }
    filterButtons[n].className += " active";

    currentAttr = n;
    for (let i = 0; i < valueAvrg.length; i++) {
        valueAvrg[i] = 0;
    }
    for (let i = 0; i < filteredBy.length; i++) {
        filteredBy[i].forEach(value => {
            switch (n) {
                case 0:
                    if(!isNaN(value.Baumhoehe_aktuell))
                    {
                        valueAvrg[i] += value.Baumhoehe_aktuell;
                    }
                    break;
                case 1:
                    valueAvrg[i]++;
                    break;
                case 2:
                    if(!isNaN(value.Pflanzjahr_geschaetzt))
                    {
                        if(value.Pflanzjahr_geschaetzt > 0)
                        {
                            valueAvrg[i] += (2020 - value.Pflanzjahr_geschaetzt);
                        }
                    }
                    break;
                case 3:
                    if(!isNaN(value.Stammdurchm_aktuell))
                    {
                        valueAvrg[i] += value.Stammdurchm_aktuell;
                    }
                    break;
                case 4:
                    if(!isNaN(value.Kronendurchm_aktuell))
                    {
                        valueAvrg[i] += value.Kronendurchm_aktuell;
                    }
                    break;
                default:
                    break;
            }
        });
    }
    for (let i = 0; i < valueAvrg.length; i++) {
        if(filteredBy[i] != 0)
        {
            if(n === 1)
            {
                valueAvrg[i] /= districtArea[i];
            }
            else
            {
                valueAvrg[i] /= filteredBy[i].length;
            }
            valueAvrg[i] = Math.round((valueAvrg[i] + Number.EPSILON) * 100) / 100;
        }
        else
        {
            valueAvrg[i] = -1;
        }
    }
    drawMap(currentTree, n);
}

//Zeichne die Kreise auf der Map neu
function drawMap(n, f)
{
    points = [
        //[ 9.938, 48.44], // Mähringen (Keine Baumdaten vorhanden)
        [ 9.969, 48.437, valueAvrg[0], status[0]], // Lehr
        [ 10.005, 48.448, valueAvrg[1], status[1]], // Jungingen
        //[ 9.957, 48.414], // Eselsberg (Keine Baumdaten vorhanden)
        [ 9.989, 48.407, valueAvrg[2], status[2]], // Stadtmitte
        [ 10.007, 48.41, valueAvrg[3], status[3]], // Oststadt
        [ 10.015, 48.427, valueAvrg[4], status[4]], // Böfingen
        [ 9.973, 48.392, valueAvrg[5], status[5]], // Weststadt
        [ 9.933, 48.393, valueAvrg[6], status[6]], // Söflingen
        [ 9.893, 48.383, valueAvrg[7], status[7]], // Ermingen
        [ 9.872, 48.365, valueAvrg[8], status[8]], // Eggingen
        [ 9.907, 48.357, valueAvrg[9], status[9]], // Einsingen
        //[ 9.934, 48.372], // Grimmelfingen (Keine Baumdaten vorhanden)
        //[ 9.945, 48.36], // Donautal (Keine Baumdaten vorhanden)
        [ 9.974, 48.354, valueAvrg[10], status[10]], // Wiblingen
        [ 9.945, 48.34, valueAvrg[11], status[11]], // Gögglingen
        [ 9.968, 48.329, valueAvrg[12], status[12]], // Unterweiler
        //[ 9.936, 48.322], // Donaustetten (Keine Baumdaten vorhanden)
    ];
    
    svg.selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
    svg.selectAll("circle")
        .data(points)
        .attr("cx", d => projection([d[0], d[1]])[0])
        .attr("cy", d => projection([d[0], d[1]])[1])
        .style("fill", d => healthScale(d[3]));
    switch(f)
    {
        case 0:
            svg.selectAll("circle")
                .data(points)
                .attr("r", function(d){ if(d[2] != -1){ return heightScale(d[2]) } return 0 });
            break;
        case 1:
            svg.selectAll("circle")
                .data(points)
                .attr("r", function(d){ if(d[2] != -1){ return densityScale(d[2]) } return 0 });
            break;
        case 2:
            svg.selectAll("circle")
                .data(points)
                .attr("r", function(d){ if(d[2] != -1){ return ageScale(d[2]) } return 0 });
            break;
        case 3:
            svg.selectAll("circle")
                .data(points)
                .attr("r", function(d){ if(d[2] != -1){ return logScale(d[2]) } return 0 });
            break;
        case 4:
            svg.selectAll("circle")
                .data(points)
                .attr("r", function(d){ if(d[2] != -1){ return crownScale(d[2]) } return 0 });
            break;
    }
}

function toggleStaticInfo()
{
    var staticInfo = document.getElementById("staticInfo");
    var infoButton = document.getElementById("infoButton");
    if(infoButton.className === "active")
    {
        staticInfo.style.display = "none";
        infoButton.className = infoButton.className.replace("active", "");
    }
    else
    {
        staticInfo.style.display = "block";
        infoButton.className += "active";
    }
}