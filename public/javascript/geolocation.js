
const latitude = document.getElementById('lat');
const longitude = document.getElementById('long');

window.navigator.geolocation.getCurrentPosition((success) => {
  const lat = success.coords.latitude;
  latitude.setAttribute('value', lat);

  const long = success.coords.longitude;
  longitude.setAttribute('value', long);
}, (error) => {
  console.log(error);
});
