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

const districtNames = [
    "Stadtteil Lehr",
    "Stadtteil Jungingen",
    "Stadtmitte",
    "Stadtteil Osten",
    "Stadtteil Böfingen",
    "Stadtteil Westen",
    "Stadtteil Söflingen",
    "Stadtteil Ermingen",
    "Stadtteil Eggingen",
    "Stadtteil Einsingen",
    "Stadtteil Wiblingen",
    "Stadtteil Gögglingen",
    "Stadtteil Unterweiler"
]

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
    "Sophora",
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

const tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip");

//---MAP---\\
const mapCanvas = document.getElementById('mapCanvas');
const heightScale = d3.scaleLinear()
    .domain([0, 30])
    .range([3, 20]);
const densityScale = d3.scalePow()
    .exponent(0.3)
    .domain([0, 1200])
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
    .domain([0, 4])
    .range(["#2E8A28", "#8DDC15", "#F2DF31", "#D9992A", "#DE2B2B"]);
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
        .style("stroke", "#1D5719")
        .style("opacity", ".4");
    svg.selectAll("g").lower();
});

//---DIAGRAMM---\\
const dataCanvas = document.getElementById("data");
var dataSvg = d3.select(dataCanvas).append("svg")
    .attr("width", 750)
    .attr("height", 450)
    .append("g")
    .attr("transform", "translate(0, 0)");

const heightScaleD = d3.scalePow()
    .exponent(0.7)
    .domain([0, 81])
    .range([440, 20]);
const densityScaleD = d3.scalePow()
    .exponent(0.3)
    .domain([0, 1200])
    .range([440, 20]);
const ageScaleD = d3.scalePow()
    .exponent(0.6)
    .domain([0, 600])
    .range([440, 20]);
const logScaleD = d3.scalePow()
    .exponent(0.4)
    .domain([0, 1500])
    .range([440, 20]);
const crownScaleD = d3.scalePow()
    .exponent(0.7)
    .domain([0, 40])
    .range([440, 20]);
const dataScale = d3.scaleBand()
    .domain(["min.", "durchschnitt", "max."])
    .range([0, 800])
    .padding(0.3);

var bars = [0, 0, 0];

//---FUNCTIONS---\\

//Ändere die Baumfamilie
var currentAttr = 0;
var currentTree = 0;
var currentFamily = 0;
var minIdx = 0;
var maxIdx = 0;
changeFamily(0);
changeTree(0);

//Zeichne das Balkendiagramm
function drawDiagramm()
{
    //Berechne die Werte für die Balken
    bars = [0, 0, 0];
    var diagrammData = treeData.filter(d => new RegExp(TreeBotNames[currentTree]).exec(d.Baumart_botanisch) != null);
    var statusData = 0;
    for (let i = 0; i < diagrammData.length; i++) {
        statusData += Number(diagrammData[i].Vitalitaetsstatus_aktuell.substring(0, 1));
        switch(currentAttr)
        {
            case 0:
                if(!isNaN(diagrammData[i].Baumhoehe_aktuell))
                {
                    if(Number(diagrammData[i].Baumhoehe_aktuell) < bars[0])
                    {
                        bars[0] = Number(diagrammData[i].Baumhoehe_aktuell);
                        minIdx = i;
                    }
                    if(Number(diagrammData[i].Baumhoehe_aktuell) > bars[2])
                    {
                        bars[2] = Number(diagrammData[i].Baumhoehe_aktuell);
                        maxIdx = i;
                    }
                    bars[1] += Number(diagrammData[i].Baumhoehe_aktuell);
                }
                break;
            case 1:
                //TODO
                break;
            case 2:
                if(!isNaN(diagrammData[i].Pflanzjahr_geschaetzt))
                {
                    if(diagrammData[i].Pflanzjahr_geschaetzt > 0)
                    {
                        if(Number(2020 - diagrammData[i].Pflanzjahr_geschaetzt) < bars[0])
                        {
                            bars[0] = Number(2020 - diagrammData[i].Pflanzjahr_geschaetzt);
                            minIdx = i;
                        }
                        if(Number(2020 - diagrammData[i].Pflanzjahr_geschaetzt) > bars[2])
                        {
                            bars[2] = Number(2020 - diagrammData[i].Pflanzjahr_geschaetzt);
                            maxIdx = i;
                        }
                        bars[1] += Number(2020 - diagrammData[i].Pflanzjahr_geschaetzt);
                    }
                }
                break;
            case 3:
                if(!isNaN(diagrammData[i].Stammdurchm_aktuell))
                {
                    if(Number(diagrammData[i].Stammdurchm_aktuell) < bars[0])
                    {
                        bars[0] = Number(diagrammData[i].Stammdurchm_aktuell);
                        minIdx = i;
                    }
                    if(Number(diagrammData[i].Stammdurchm_aktuell) > bars[2])
                    {
                        bars[2] = Number(diagrammData[i].Stammdurchm_aktuell);
                        maxIdx = i;
                    }
                    bars[1] += Number(diagrammData[i].Stammdurchm_aktuell);
                }
                break;
            case 4:
                if(!isNaN(diagrammData[i].Kronendurchm_aktuell))
                {
                    if(Number(diagrammData[i].Kronendurchm_aktuell) < bars[0])
                    {
                        bars[0] = Number(diagrammData[i].Kronendurchm_aktuell);
                        minIdx = i;
                    }
                    if(Number(diagrammData[i].Kronendurchm_aktuell) > bars[2])
                    {
                        bars[2] = Number(diagrammData[i].Kronendurchm_aktuell);
                        maxIdx = i;
                    }
                    bars[1] += Number(diagrammData[i].Kronendurchm_aktuell);
                }
                break;
        }
    }
    bars[1] /= diagrammData.length;
    bars[1] = Math.round((bars[1] + Number.EPSILON) * 100) / 100;
    statusData /= diagrammData.length;
    
    //Extra code falls die Dichte berechnet werden muss
    if(currentAttr === 1)
    {
        var area = 0;
        bars[0] = [100, 0];
        bars[2] = [-100, 0];
        for (let i = 0; i < treeDataDistrict.length; i++) {
            var diagrammDistrictData = treeDataDistrict[i].filter(d => new RegExp(TreeBotNames[currentTree]).exec(d.Baumart_botanisch) != null);
            if(diagrammDistrictData.length > 0)
            {
                if(bars[0][0] > (diagrammDistrictData.length / districtArea[i]))
                {
                    var statusMin = 0;
                    for (let j = 0; j < diagrammDistrictData.length; j++) {
                        statusMin += Number(diagrammDistrictData[j].Vitalitaetsstatus_aktuell.substring(0, 1));
                    }
                    statusMin /= diagrammDistrictData.length;
                    bars[0] = [diagrammDistrictData.length / districtArea[i], statusMin, diagrammDistrictData[0].Bezirk.substring(4)];
                    bars[0][0] = Math.round((bars[0][0] + Number.EPSILON) * 100) / 100;
                }
                if(bars[2][0] < (diagrammDistrictData.length / districtArea[i]))
                {
                    var statusMax = 0;
                    for (let j = 0; j < diagrammDistrictData.length; j++) {
                        statusMax += Number(diagrammDistrictData[j].Vitalitaetsstatus_aktuell.substring(0, 1));
                    }
                    statusMax /= diagrammDistrictData.length;
                    bars[2] = [diagrammDistrictData.length / districtArea[i], statusMax, diagrammDistrictData[0].Bezirk.substring(4)];
                    bars[2][0] = Math.round((bars[2][0] + Number.EPSILON) * 100) / 100;
                }
                bars[1] += diagrammDistrictData.length;
                area += districtArea[i];
            }
        }
        bars[1] /= area;
        bars[1] = Math.round((bars[1] + Number.EPSILON) * 100) / 100;
        bars[1] = [bars[1], statusData, "Ulm"];
    }
    else
    {
        bars = [
            [bars[0], Number(diagrammData[minIdx].Vitalitaetsstatus_aktuell.substring(0, 1)), diagrammData[minIdx].Bezirk.substring(4)],
            [bars[1], statusData, "Ulm"],
            [bars[2], Number(diagrammData[maxIdx].Vitalitaetsstatus_aktuell.substring(0, 1)), diagrammData[minIdx].Bezirk.substring(4)]
        ];
    }

    //Zeichne die Balken und den Text darüber
    dataSvg.selectAll("rect")
        .data(bars)
        .enter()
        .append("rect")
    dataSvg.selectAll("rect")
        .data(bars)
        .attr("x", function(d, i) {
            switch(i)
            {
                case 0:
                    return dataScale("min.");
                case 1:
                    return dataScale("durchschnitt");
                case 2:
                    return dataScale("max.");
                default:
                    return;
            };
        })
        .attr("fill", d => healthScale(d[1]))
        .attr("width", dataScale.bandwidth());

    dataSvg.selectAll("text")
        .data(bars)
        .enter()
        .append("text")
    dataSvg.selectAll("text")
        .data(bars)
        .attr("x", function(d, i) {
            switch(i)
            {
                case 0:
                    return dataScale("min.") + dataScale.bandwidth() / 2;
                case 1:
                    return dataScale("durchschnitt") + dataScale.bandwidth() / 2;
                case 2:
                    return dataScale("max.") + dataScale.bandwidth() / 2;
                default:
                    return;
            };
        })
        .attr("text-anchor", "middle")
        .attr("fill", "#707070");
    
    //Passe die Balken an die Daten an
    switch(currentAttr)
    {
        case 0:
            dataSvg.selectAll("rect")
                .data(bars)
                .attr("y", d => heightScaleD(d[0]))
                .attr("height", d => 500 - heightScaleD(d[0]))
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(d[2]);
                    tooltip.style("display", "block")
                        .style("opacity", 1)
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 30) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            dataSvg.selectAll("text")
                .data(bars)
                .attr("y", d => heightScaleD(d[0]) - 5)
                .text(d => d[0] + "m");
            break;
        case 1:
            dataSvg.selectAll("rect")
                .data(bars)
                .attr("y", d => densityScaleD(d[0]))
                .attr("height", d => 500 - densityScaleD(d[0]))
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(d[2]);
                    tooltip.style("display", "block")
                        .style("opacity", 1)
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 30) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            dataSvg.selectAll("text")
                .data(bars)
                .attr("y", d => densityScaleD(d[0]) - 5)
                .text(d => d[0] + "Bäume/\u33A2");
            break;
        case 2:
            dataSvg.selectAll("rect")
                .data(bars)
                .attr("y", d => ageScaleD(d[0]))
                .attr("height", d => 500 - ageScaleD(d[0]))
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(d[2]);
                    tooltip.style("display", "block")
                        .style("opacity", 1)
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 30) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            dataSvg.selectAll("text")
                .data(bars)
                .attr("y", d => ageScaleD(d[0]) - 5)
                .text(d => d[0] + " Jahre");
            break;
        case 3:
            dataSvg.selectAll("rect")
                .data(bars)
                .attr("y", d => logScaleD(d[0]))
                .attr("height", d => 500 - logScaleD(d[0]))
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(d[2]);
                    tooltip.style("display", "block")
                        .style("opacity", 1)
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 30) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            dataSvg.selectAll("text")
                .data(bars)
                .attr("y", d => logScaleD(d[0]) - 5)
                .text(d => d[0] + "m");
            break;
        case 4:
            dataSvg.selectAll("rect")
                .data(bars)
                .attr("y", d => crownScaleD(d[0]))
                .attr("height", d => 500 - crownScaleD(d[0]))
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(d[2]);
                    tooltip.style("display", "block")
                        .style("opacity", 1)
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 30) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            dataSvg.selectAll("text")
                .data(bars)
                .attr("y", d => crownScaleD(d[0]) - 5)
                .text(d => d[0] + "m");
            break;
    }
}

//Ändere die Baumkategorie
function changeFamily(n)
{
    var sitemap = document.getElementById("sitemap");
    if(sitemap.className === "active")
    {
        return;
    }
    currentFamily = n;
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
    //Passt das Design in der Navigation an
    currentTree = n;
    var trees = document.getElementsByClassName("menuTree");
    for (let i = 0; i < trees.length; i++) {
        trees[i].className = trees[i].className.replace(" active", "");
    }
    trees[n].className += " active";

    //Ändere den infotext
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

    //Ändere das Attribut
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

    //Zeichne die Karte
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
    drawDiagramm();
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
                .attr("r", function(d){ if(d[2] != -1){ return heightScale(d[2]) } return 0 })
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(districtNames[i] + "<br>" + "Höhe: " + Math.round((d[2] + Number.EPSILON) * 100) / 100 + "m");
                    tooltip.style("display", "block")
                        .style("opacity", 1);
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 60) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            break;
        case 1:
            svg.selectAll("circle")
                .data(points)
                .attr("r", function(d){ if(d[2] != -1){ return densityScale(d[2]) } return 0 })
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(districtNames[i] + "<br>" + "Dichte: " + Math.round((d[2] + Number.EPSILON) * 100) / 100 + " Bäume/\u33A2");
                    tooltip.style("display", "block")
                        .style("opacity", 1);
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 60) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            break;
        case 2:
            svg.selectAll("circle")
                .data(points)
                .attr("r", function(d){ if(d[2] != -1){ return ageScale(d[2]) } return 0 })
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(districtNames[i] + "<br>" + "Alter: " + Math.round((d[2] + Number.EPSILON) * 100) / 100 + " Jahre");
                    tooltip.style("display", "block")
                        .style("opacity", 1);
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 60) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            break;
        case 3:
            svg.selectAll("circle")
                .data(points)
                .attr("r", function(d){ if(d[2] != -1){ return logScale(d[2]) } return 0 })
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(districtNames[i] + "<br>" + "Stammdurchmesser: " + Math.round((d[2] + Number.EPSILON) * 100) / 100 + "m");
                    tooltip.style("display", "block")
                        .style("opacity", 1);
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 60) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            break;
        case 4:
            svg.selectAll("circle")
                .data(points)
                .attr("r", function(d){ if(d[2] != -1){ return crownScale(d[2]) } return 0 })
                .on("mouseover", function(d, i)
                {
                    if(!d)
                    {
                        return;
                    }
                    tooltip.html(districtNames[i] + "<br>" + "Kronendurchmesser: " + Math.round((d[2] + Number.EPSILON) * 100) / 100 + "m");
                    tooltip.style("display", "block")
                        .style("opacity", 1);
                })
                .on("mousemove", function()
                {
                    tooltip.style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 60) + "px");
                })
                .on("mouseout", function()
                {
                    tooltip.style("display", "none");
                });
            break;
    }
}

//Zeigt die Statische Info an oder blendet sie aus
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

//---CODE AUS GDG1 ABGABE---\\
var slideIndex = 0;

function plusSlides(n)
{
	showSlides(slideIndex += n);
}

function currentSlide(n)
{
	showSlides(slideIndex = n);
}

function showSlides(n)
{
	var i;
	var slides = document.getElementsByClassName("slide");
	var dots = document.getElementsByClassName("dot");
	if (n >= slides.length)
	{
		slideIndex = 0;
	}
	if (n < 0)
	{
		slideIndex = slides.length - 1;
	}
	for (i = 0; i < slides.length; i++)
	{
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++)
	{
		dots[i].className = dots[i].className.replace(" activeS", "");
	}
	slides[slideIndex].style.display = "block";
	dots[slideIndex].className += " activeS";
}

var bewIndex = 0;

function plusBew(n)
{
	showBew(bewIndex += n);
}

function currentBew(n)
{
	showBew(bewIndex = n);
}

function showBew(n)
{
	var i;
	var slides = document.getElementsByClassName("slideB");
	var dots = document.getElementsByClassName("dotB");
	if (n >= slides.length)
	{
		bewIndex = 0;
	}
	if (n < 0)
	{
		bewIndex = slides.length - 1;
	}
	for (i = 0; i < slides.length; i++)
	{
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++)
	{
		dots[i].className = dots[i].className.replace(" activeS", "");
	}
	slides[bewIndex].style.display = "block";
	dots[bewIndex].className += " activeS";
}

//Zeigt die Sitemap an oder blendet sie aus
function toggleSitemap()
{
    var sitemap = document.getElementById("sitemap");
    var menuTree = document.getElementsByClassName("menuTree");
    var menuTreeList = document.getElementsByClassName("menuTreeList");
    var arrow = document.getElementById("arrow");
    if(sitemap.className === "active")
    {
        sitemap.className = sitemap.className.replace("active", "");
        for (let i = 0; i < menuTree.length; i++) {
            menuTree[i].className = menuTree[i].className.replace(" open", "");
        }
        for (let i = 0; i < menuTreeList.length; i++) {
            menuTreeList[i].style.display = "block";
        }
        changeFamily(currentFamily);
        arrow.style.display = "block";
    }
    else
    {
        sitemap.className += "active";
        for (let i = 0; i < menuTree.length; i++) {
            menuTree[i].className += " open";
            menuTree[i].style.display = "block";
        }
        for (let i = 0; i < menuTreeList.length; i++) {
            menuTreeList[i].style.display = "inline-grid";
        }
        arrow.style.display = "none";
    }
}