"use strict";

    mapboxgl.accessToken = MAPBOX_API;
    let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 15,
    center: [-75.2000, 39.9385]
});