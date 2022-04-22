'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent

if (navigator.geolocation)
  //To get the coordinates for a user location
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      //To get the map from the leaflet library

      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (mapEventLocal) {
        mapEvent = mapEventLocal
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },

    function () {
      alert('Could not get your current location');
    }
  );

form.addEventListener('submit', function (e) {
  e.preventDefault()

  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''

  const { lat, lng } = mapEvent.latlng
  L.marker({ lat, lng })
    .addTo(map)
    .bindPopup(
      //Maker popup property
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup'
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});
