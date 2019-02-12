
const lat = document.getElementById('lat');
const long = document.getElementById('long');

mapboxgl.accessToken = 'pk.eyJ1IjoicmFuaWVyaWdhbGFzc28iLCJhIjoiY2pzMGlpdmtrMDM5MjRha3Z5eGd4M3NqOCJ9.K2Xxn6LzavamXgL7JPCDcw';

/* Map: This represents the map on the page. */
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 12,
  center: [long.getAttribute('value'), lat.getAttribute('value')],
});

map.on('load', () => {
  /* Image: An image is loaded and added to the map. */
  map.loadImage('https://i.imgur.com/MK4NUzI.png', (error, image) => {
    if (error) throw error;
    map.addImage('custom-marker', image);
    /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
    map.addLayer({
      id: 'markers',
      type: 'symbol',
      /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [long.getAttribute('value'), lat.getAttribute('value')],
              },
            },
          ],
        },
      },
      layout: {
        'icon-image': 'custom-marker',
      },
    });
  });
});
