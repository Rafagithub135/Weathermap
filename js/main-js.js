const app = {
    init: () => {
        document
            .getElementById('btnGet')
            .addEventListener('click', app.fetchWeather);
        document
            .getElementById('btnCurrent')
            .addEventListener('click', app.getLocation);
    },
    fetchWeather: (ev) => {
        //use the values from latitude and longitude to fetch the weather
        let lat = document.getElementById('latitude').value;
        let lon = document.getElementById('longitude').value;
        let key = fiveDayURL;
        let lang = 'en';
        let units = 'imperial';
        let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly,alerts}&appid=${key}&units${units}&lang${lang}';
        // https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
        //fetch the weather
        fetch(url)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then((data) => {
                app.showWeather(data);
            })
            .catch(console.err);
    },
    getLocation: (ev) => {
        let opts = {
            enableHighAccuracy: true,
            timeout: 1000 * 10, //10 seconds
            maximumAge: 1000 * 60 * 5, //5 minutes
        };
        navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
    },
    ftw: (position) => {
        //got position
        document.getElementById('latitude').value =
            position.coords.latitude.toFixed(4);
        document.getElementById('longitude').value =
            position.coords.longitude.toFixed(4);
    },
    wtf: (err) => {
        //geolocation failed
        console.error(err);
    },
    showWeather: (resp) => {
        console.log(resp);
        let row = document.querySelector('.weather.row');
        //clear out the old weather and add the new
        // row.innerHTML = '';
        let html = '<div class="col">\n' +
            '                <div class="card">\n' +
            '                    <h5 class="card-title p-2">Date</h5>\n' +
            '                    <img\n' +
            '                            src="http://openweathermap.org/img/wn/10d@4x.png"\n' +
            '                            alt="Weather description"\n' +
            '                    />\n' +
            '                    <div class="card-body">\n' +
            '                        <h3 class="card-title">Weather Label</h3>\n' +
            '                        <p class="card-text">High Temp Low Temp</p>\n' +
            '                        <p class="card-text">High Feels Like</p>\n' +
            '                        <p class="card-text">Pressure</p>\n' +
            '                        <p class="card-text">Humidity</p>\n' +
            '                        <p class="card-text">UV Index</p>\n' +
            '                        <p class="card-text">Precipitation</p>\n' +
            '                        <p class="card-text">Dew Point</p>\n' +
            '                        <p class="card-text">Wind speed and direction</p>\n' +
            '                        <p class="card-text">Sunrise</p>\n' +
            '                        <p class="card-text">Sunset</p>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>';
        row.innerHTML = resp.daily
            .map((day, idx) => {
                if (idx <= 2) {
                    let dt = new Date(day.dt * 1000); //timestamp * 1000
                    let sr = new Date(day.sunrise * 1000).toTimeString();
                    let ss = new Date(day.sunset * 1000).toTimeString();
                    return `<div class="col">
              <div class="card">
              <h5 class="card-title p-2">${dt.toDateString()}</h5>
                <img
                  src="http://openweathermap.org/img/wn/${
                        day.weather[0].icon
                    }@4x.png"
                  class="card-img-top"
                  alt="${day.weather[0].description}"
                />
                <div class="card-body">
                  <h3 class="card-title">${day.weather[0].main}</h3>
                  <p class="card-text">High ${day.temp.max}&deg;C Low ${
                        day.temp.min
                    }&deg;C</p>
                  <p class="card-text">High Feels like ${
                        day.feels_like.day
                    }&deg;C</p>
                  <p class="card-text">Pressure ${day.pressure}mb</p>
                  <p class="card-text">Humidity ${day.humidity}%</p>
                  <p class="card-text">UV Index ${day.uvi}</p>
                  <p class="card-text">Precipitation ${day.pop * 100}%</p>
                  <p class="card-text">Dewpoint ${day.dew_point}</p>
                  <p class="card-text">Wind ${day.wind_speed}m/s, ${
                        day.wind_deg
                    }&deg;</p>
                  <p class="card-text">Sunrise ${sr}</p>
                  <p class="card-text">Sunset ${ss}</p>
                </div>
              </div>
            </div>
          </div>`;
                }
            })
            .join(' ');
    },
};

app.init();









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

$.get(fiveDayURL, {
    APPID: WEATHERMAP_API,
    q: "Philadelphia, US",
    units: "imperial"
}).done(function (data) {
    // for (let i = 0; i < data.list.length; i++) {
    //     if (i < 5){
    //     console.log(dailyForecast.temp.max);
    //     console.log(dailyForecast.temp.min);
    //     let date = new Date(data.list[i].dt * 1000);
    //     let day = date.getDay();
    //     let hour = date.getHours();
    //     if (hour === 12) {
    //         let temp = data.list[i].main.temp;
    //         let icon = data.list[i].weather[0].icon;
    //         let desc = data.list[i].weather[0].description;
    //         let wet = data.list[i].main.humidity;
    //         let vis = data.list[i].visibility;
    //         let cloud = data.list[i].clouds.all;
    //         let rise = data.list[i].sys.sunrise;
    //         let set = data.list[i].sys.sunset;



});
$.get(weatherURL, {
    APPID: WEATHERMAP_API,
    q: "Philadelphia, US",
    units: "imperial"
}).done(function (data) {
});
$.get(fiveDayURL, {
    APPID: WEATHERMAP_API,
    q: "Philadelphia, US",
    units: "imperial"
}).done(function (data) {
    console.log('5 day forecast', data);
});
mapboxgl.accessToken = MAPBOX_API;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 15,
    center: [-75.2008, 39.9390]
});
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

