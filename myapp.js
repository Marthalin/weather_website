console.log(1212123)

/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/
var skycons = new Skycons();
  // on Android, a nasty hack is needed: {"resizeClear": true}

  // you can add a canvas by it's ID...
  skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
  skycons.add("day1", Skycons.CLEAR_DAY);
  skycons.add("day2", Skycons.CLOUDY);
  skycons.add("day3", Skycons.RAIN);

  // start animation!
  skycons.play();
  
  // want to change the icon? no problem:
  skycons.set("today", Skycons.PARTLY_CLOUDY_NIGHT);

var barTitle = $("#barTitle");
var weatherCondition = $("#weatherCondition");
var weatherCon;

var day0date = $("#day0date");
var day1date = $("#day1date");
var day2date = $("#day2date");
var day3date = $("#day3date");

var day1foretemp = document.getElementById("day1foretemp");
var day2foretemp = document.getElementById("day2foretemp");
var day3foretemp = document.getElementById("day3foretemp");

var currentTemp;
var cities = ["台北市","新北市","台中市","台南市","高雄市","基隆市","桃園市","新竹市","苗栗市","彰化縣","南投縣","雲林縣","嘉義市", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣", "台東縣", "澎湖縣", "金門縣", "連江縣"];
var cityobject = [];
$("ul").empty();


$.each(cities,function(index,element){
  $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D\""+cities[index]+"\")and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",function(data){
      var begin = data.query.results.channel.item;
      currentTemp = begin.condition.temp;
      
      cityobject[index] = {"data": data,"object" : cities[index]};
      if( cityobject[index].object === "台北市"){
          loadPage("台北市",begin);
          icon(begin);
        }
    var list = $("<li class='listPart' role='presentation'><a role='menuitem' tabindex='-1' href='#'>" + cities[index] +" " + currentTemp+"℃" +"</a></li>");
    list.appendTo("#dropdown").attr('data-index',index);;
  });
});      
/*
Get value from Bootstrap dropdown menu
*/
$('#dropdown').on('click'," li ", function() {
    var cityIndex=$(this).data("index");
    console.log(cityIndex);
          var begin = cityobject[cityIndex].data.query.results.channel.item;  
          console.log(cityobject[cityIndex].data);  
          loadPage(cityobject[cityIndex],begin);
          changeCity(cityobject[cityIndex],begin);
          icon(begin);
    
});
function changeCity(city,begin){
      var cityTemp = begin.condition.temp;
      var barCity = city.object + cityTemp + "℃";
      barTitle.text(barCity);
}
function loadPage(city,begin){
      var cityTemp = begin.condition.temp;
      $(".temperature").text(cityTemp);

      weatherCon = begin.condition.text;
      weatherCondition.text(" : " + weatherCon);

      var day0 = begin.forecast[0].date;
      var day1 = begin.forecast[1].date;
      var day2 = begin.forecast[2].date;
      var day3 = begin.forecast[3].date;

      day0date.text(day0);
      day1date.text(day1);
      day2date.text(day2);
      day3date.text(day3);
      
      var oneDayAfterTempHigh   =  begin.forecast[1].high;
      var oneDayAfterTempLow    =  begin.forecast[1].low;
      var twoDayAfterTempHigh   =  begin.forecast[2].high;
      var twoDayAfterTempLow    =  begin.forecast[2].low;
      var threeDayAfterTempHigh =  begin.forecast[3].high;
      var threeDayAfterTempLow  =  begin.forecast[3].low;

      day1foretemp.innerHTML = oneDayAfterTempLow   + "-" + oneDayAfterTempHigh   + '℃';
      day2foretemp.innerHTML = twoDayAfterTempLow   + "-" + twoDayAfterTempHigh   + '℃';
      day3foretemp.innerHTML = threeDayAfterTempLow + "-" + threeDayAfterTempHigh + '℃';    
}

function icon (begin){
      var dayicon = ["today","day1icon","day2icon","day3icon"];
      for(var i = 0; i<dayicon.length ;i++){
        var daycode = parseInt(begin.forecast[i].code);
        if(daycode === 1 || daycode === 3 || daycode === 4 || daycode === 9 || daycode === 10 || daycode === 11 || daycode === 12 || daycode === 35 || daycode === 37 ||daycode === 38 ||daycode === 39 || daycode === 40 || daycode === 45 ||daycode === 47 || daycode === 48 ){
           skycons.set(dayicon[i], Skycons.RAIN);
        }else if ( daycode === 26 || daycode === 27 || daycode === 28){
           skycons.set(dayicon[i], Skycons.CLOUDY);
        }else if ( daycode === 32 ||daycode === 34 || daycode === 36){
           skycons.set(dayicon[i], Skycons.CLEAR_DAY);
        }else if ( daycode === 31 ||daycode === 33){
           skycons.set(dayicon[i], Skycons.CLEAR_NIGHT);
        }else if ( daycode === 30 || daycode === 44 ){
           skycons.set(dayicon[i], Skycons.PARTLY_CLOUDY_DAY);
        }else if ( daycode === 29){
           skycons.set(dayicon[i], Skycons.PARTLY_CLOUDY_NIGHT);
        }else if ( daycode === 5 || daycode === 6 || daycode === 7 || daycode === 8 || daycode === 17 || daycode === 18){
           skycons.set(dayicon[i], Skycons.SLEET); 
        }else if ( daycode === 13 || daycode === 14 || daycode === 15 || daycode === 16 || daycode === 41 || daycode === 42 || daycode === 43 ||daycode === 46){
           skycons.set(dayicon[i], Skycons.SNOW);
        }else if ( daycode === 0 ||daycode === 2 || daycode === 23 || daycode === 24 ||daycode === 25 ){
           skycons.set(dayicon[i], Skycons.WIND);
        }else if ( daycode === 19|| daycode === 20 || daycode === 21 || daycode === 22){
           skycons.set(dayicon[i], Skycons.FOG);
          console.log("no");
        }
      }
}

