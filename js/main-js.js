const weatherURL = "http://api.openweathermap.org/data/2.5/weather";
const fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast";
const oneCallURL = "https://api.openweathermap.org/data/2.5/onecall";


let currTemp = $("#currTemp");
let currWind = $("#currentWind");
let currWet = $("#currentHumidity");
let currPres = $("#currentPressure");
let currVis = $("#currentVisibility");
let currCloud = $("#currentClouds");
let hoyRise = $("#sunrise");
let hoySet = $("#sunset");


$.get(oneCallURL, {
    APPID: WEATHERMAP_API,
    lat:    39.9390,
    lon:   -75.2008,
    units: "imperial"
}).done(function(data) {
    console.log('The entire response:', data);
    console.log('Diving in - here is current information: ', data.current);
    console.log('A step further - information for tomorrow: ', data.daily[1]);
    currTemp.html(data.current.temp + "°F");
    currWind.html(data.current.wind_speed + " mph");
    currWet.html(data.current.humidity + "%");
    currPres.html(data.current.pressure + " hPa");
    currVis.html((data.current.visibility)/1000 + " m");
    currCloud.html(data.current.clouds + "%");
    hoyRise.html(data.current.sunrise);
    hoySet.html(data.current.sunset);
    });

