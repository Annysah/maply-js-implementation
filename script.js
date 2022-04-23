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

let map, mapEvent;

class App {
  //Instead of a normal variable it is now a property itself
  #map
  #mapEvent
  constructor() {
    //Calling the new object
    this._getPosition()

    form.addEventListener('submit', function (e) {
      
    });
    
    //To toggle form inputs between elevation and cadence whenever running or cycling is clicked
    inputType.addEventListener('change', function () {
      inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    });
    
  }

  _getPosition() {
    if (navigator.geolocation)
      //To get the coordinates for a user location
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
        function () {
          alert('Could not get your current location');
        }
      );
  }

  _loadMap(position) {
    // To load up the map
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      //To get the map from the leaflet library

      this.#map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.#map);

      this.#map.on('click', function (mapEventLocal) {
        this.#mapEvent = mapEventLocal;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
  }

  _showForm() {}

  _toggleElevationFields() {}

  _newWorkout(e) {
    e.preventDefault();
    
      inputDistance.value =
        inputDuration.value =
        inputCadence.value =
        inputElevation.value =
          '';
//To Display the map maker    
      const { lat, lng } = mapEvent.latlng;
      L.marker({ lat, lng })
        .addTo(this.#map)
        .bindPopup(
          //Maker popup property
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
          })
        )
        .setPopupContent('Workout')
        .openPopup();
  }
}

const app = new App()

