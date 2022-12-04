"use strict";

const weatherUrl = "http://api.openweathermap.org/data/2.5/weather";
const oneCallUrl = "http://api.openweathermap.org/data/2.5/onecall";

let currentConditions = $("#current");

mapboxgl.accessToken = MAPBOX_API;

$.get(oneCallUrl, {
    APPID: WEATHERMAP_API,
    lat: 39.9385,
    lon: -75.2000,
    units: "imperial"
}).done(function (data) {
    console.log('The entire response:', data);
    currentConditions.html(data.current.temp + ' F',
        data.dt * (1000),
        data.dew_point + ' F',
        data.humidity + '%');
});


// testing reverseGeoCode


mapboxgl.accessToken = MAPBOX_API;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 15,
    center: [-75.2000, 39.9385]
});

reverseGeocode({lat: 39.9385, lon: -75.2000}, MAPBOX_API).then(function (results) {
    console.log(results)
});

// <!--  <div class="col">-->
// <!--    <div class="card" style="width: 30vw">-->
// <!--      <h5 class="card-title p-2">Date</h5>-->
// <!--      <img-->
// <!--              src="http://openweathermap.org/img/wn/10d@4x.png"-->
// <!--              class="card-img-top"-->
// <!--              alt="Weather description"-->
// <!--      />-->
// <!--      <div class="card-body">-->
// <!--        <h3 class="card-title">Weather Label</h3>-->
// <!--        <p class="card-text">High Temp Low Temp</p>-->
// <!--        <p class="card-text">HighFeels like</p>-->
// <!--        <p class="card-text">Pressure</p>-->
// <!--        <p class="card-text">Humidty</p>-->
// <!--        <p class="card-text">UV Index</p>-->
// <!--        <p class="card-text">Precipitation</p>-->
// <!--        <p class="card-text">Dew Point</p>-->
// <!--        <p class="card-text">Wind speed and direction</p>-->
// <!--        <p class="card-text">Sunrise</p>-->
// <!--        <p class="card-text">Sunset</p>-->
// <!--      </div>-->
// <!--    </div>-->
// <!--  </div>-->