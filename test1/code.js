var wheat;
var rice;
var sugar;
var fish;

var chart;

var wheatValues = new Array(52);
var fishValues = new Array(52);
var sugarValues = new Array(52);
var riceValues = new Array(52);
var xValues = new Array(52);

var sliderValue=1999

var map = L.map('map').setView([51.505, -0.09], 2);

geojson = L.geoJson(countries, {
    style: style,
    style: otherStyle,
    onEachFeature: onEachFeature
}).addTo(map);

var chart = new Chart("myChart", {
    type: "line",
    title: {
        display: true,
        text: 'undefined'
      },
    data: {
        labels: xValues,
        datasets: [{
            data: wheatValues,
            borderColor: "red",
            fill: false
        },{
            data: sugarValues,
            borderColor: "green",
            fill: false
        },{
            data: riceValues,
            borderColor: "yellow",
            fill: false
        },{
            data: fishValues,
            borderColor: "blue",
            fill: false
        }]
    },
    options: {
      legend: {display: false}
    }
});

function highlightFeature(e) {
  var layer = e.target
   layer.setStyle({
        weight: 3,
        color: '#000000',
        dashArray: '',
        fillOpacity: 0.7
    });
    info.update(layer.feature.properties)
    layer.bringToFront();
    //chart.update()
}

function resetHighlight(e) {
    geojson.resetStyle(e.target)
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function getColor(d) {
   return "#eeeeee"
}
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 3,
        opacity: 1,
        color: '#eeeeee',
        dashArray: '',
        fillOpacity: 1
    };
}

function otherStyle(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 1,
        opacity: 1,
        color: '#999999',
        dashArray: '',
        fillOpacity: 1
    };
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    for(let i = 0; i<=691;i+=4){
        if(props){
            if(stuff[i]["Area Abbreviation"] == props.ISO_A3){
                chartName = stuff[i]["Area"]
                dictToArray(stuff[i],wheatValues)
                dictToArray(stuff[i+1],riceValues)
                dictToArray(stuff[i+2],sugarValues)
                dictToArray(stuff[i+3],fishValues)
                    chartData=stuff[i]
                if(stuff[i]['Y'+sliderValue]===''){
                    wheat = 'No Data'
                }else{
                    wheat = stuff[i]['Y'+sliderValue]
                }

                if(stuff[i+1]['Y'+sliderValue]===''){
                    rice = 'No Data'
                }else{
                    rice = stuff[i+1]['Y'+sliderValue]
                }

                if(stuff[i+2]['Y'+sliderValue]===''){
                    sugar = 'No Data'
                }else{
                    sugar = stuff[i+2]['Y'+sliderValue]
                }

                if(stuff[i+3]['Y'+sliderValue]===''){
                    fish = 'No Data'
                }else{
                    fish = stuff[i+3]['Y'+sliderValue]
                }
                break
            }
        }
    }
    this._div.innerHTML = (props ?
        '<b>' + props.ADMIN  + 
        '<br>' + 'Wheat: ' + wheat + 
        '<br>' + 'Rice: ' + rice + 
        '<br>' + 'Sugar: ' + sugar + 
        '<br>' + 'Seafood: ' + fish + '</b>'
        : '<b>Hover over a country</b>');
    chart.update()
}
var year = L.control({position: 'bottomright'});

year.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info legend')
    this._div.innerHTML = '<b>Drag the slider to change the year</b>'
    return this._div;
};

year.update = function(){
    if(sliderValue == '2013\r'){
        this._div.innerHTML = '<b>Year: 2013</b>'
    }else{
        this._div.innerHTML = '<b>Year:' + sliderValue +  '</b>'
    }
}


year.addTo(map);

info.addTo(map);
//slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    if(this.value==2013){
        sliderValue='2013\r'
    }else{
        sliderValue = this.value
    }
    year.update()
}

function dictToArray(dict,arrayToChange){
    for(let i = 1961;i<2013;i++){
        arrayToChange[i-1961] = (dict['Y'+ i])
        xValues[i-1961] = i
    }
    arrayToChange[2012] =  dict['Y2023\r']
}