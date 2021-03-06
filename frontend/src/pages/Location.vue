<template>
  <div class="white-space-top"></div>

  <div class="img-field">
    <img src="../assets/images/star-shl-locatie.png" class="img-banner" />
    <h1 class="header-text">Locaties</h1>
  </div>

  <div class="content-location">
    <div class="text-content">
      <h1>Locaties bloedafname</h1>
      <p>
        Hieronder kunt u, door een adres, postcode of plaatsnaam in te vullen,
        de dichtsbijzijnde priklocaties vinden.
      </p>
    </div>
  </div>
 
  <div class="location-page">
    <input
      class="searchbar"
      type="search"
      v-model="search"
      placeholder="Vul uw locatie in"
    />
    <button class="search-button" @click="getCoordinates(search)">Zoek</button>

    <h3 v-if="notFound">Locatie niet gevonden</h3>

    <div class="all-locations">
      <div
        class="single-location"
        v-for="location in this.locations.slice(0, length)"
        :key="location"
      >
        <details>
          <summary>
            <h2>{{ location.locationname }}</h2>
            <h2
              v-if="
                location.distance != '' &&
                location.distance != 'NaN' &&
                !notFound
              "
            >
              Afstand: {{ location.distance }} KM
            </h2>
          </summary>
          <div class="content">
            <p>Adres: {{ location.street }}</p>
            <p>Postcode: {{ location.postcode }} {{ location.city }}</p>
            <p>Openingstijden:</p>
            <div class="opening-hours" v-for="(time, day) in location.openinghoursbyday" :key="day">
              <p>{{ day }} : {{ time.opens }} - {{ time.closes }}</p>
            </div>
            <p>Bijzonderheden: {{ location.particularities }}</p>
            <button class="navigate-button" @click="goToGoogle(location.url)">
              Klik om te navigeren
            </button>
          </div>
        </details>
      </div>
    </div>

    <div v-if="baseLocations.length > length">
      <button class="more-button" @click="addLength">Meer weergeven</button>
    </div>
  </div>

  <p style="margin: 10px">Hieronder staat een geografische weergave van alle priklocaties</p>

  <div class="map-responsive">
    <iframe
      src="https://www.google.com/maps/d/embed?mid=1b_K2S4IW2EyIJf_2WR1jcqo5THYs8fGe&hl=nl&z=8"
      width="600"
      height="400"
      style="border: 0"
      allowfullscreen
    ></iframe>
  </div>
  <div class="white-space-top"></div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";

const locations = [];
const baseLocations = [];
const length = 10;
var notFound = false;
export default defineComponent({
  data() {
    return { search: "", locations, length, baseLocations, notFound };
  },

  mounted() {
    fetch('/star-shl-location-Complete.json')
    .then(response => response.json())
    .then(data => this.locations = data)
    .then(data => this.baseLocations = data)
  },

  methods: {
    // Gets the coordinates (latitude, longitude) from input search-bar
    async getCoordinates(inputAddress) {
      this.notFound = false;
      if (inputAddress == "") {
        this.clearLocations();
        this.showAllLocations();
      } else {
        this.length = 10;
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputAddress}.json?country=nl&access_token=pk.eyJ1IjoiZGpvb3dlbCIsImEiOiJja3d5Mzd2dmMwaXhtMnBsYWlxdTJkM3VsIn0.Zbc57Rj85s5jwM-D53pf5A`
          );
          var latitude = response.data.features[0].center[1];
          var longitude = response.data.features[0].center[0];
        } catch (err) {
          this.notFound = true;
        }
        this.search = "";
        this.searchClosestLocations(latitude, longitude);
      }
    },

    // Calculates the distance between two coordinates on a globe, return in km
    haversine(lat1, lon1, lat2, lon2) {
      // distance between latitudes
      // and longitudes
      let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
      let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

      // convert to radian
      lat1 = (lat1 * Math.PI) / 180.0;
      lat2 = (lat2 * Math.PI) / 180.0;

      // apply formula
      let a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
      let rad = 6371;
      let c = 2 * Math.asin(Math.sqrt(a));
      return rad * c;
    },

    // Searches for the nearest locations and puts them in the sorted locations array
    searchClosestLocations(inputLatitude, inputLongitude) {
      const array = [];

      for (let i = 0; i < this.baseLocations.length; i++) {
        let distance = this.haversine(
          this.baseLocations[i].lat,
          this.baseLocations[i].lon,
          inputLatitude,
          inputLongitude
        );
        array.push([distance, i]);
      }
      array.sort((a, b) => a[0] - b[0]);

      this.locations = [];
      for (let j = 0; j < this.baseLocations.length; j++) {
        this.locations.push(this.baseLocations[array[j][1]]);
        this.locations[j].distance = array[j][0].toFixed(1);
      }
    },

    showAllLocations() {
      this.clearLocations();
      this.search = "";
      this.length = 10;
    },

    addLength() {
      this.length += 10;
    },

    goToGoogle(url) {
      window.open().location.href = url;
    },

    clearLocations() {
      fetch('/star-shl-location-Complete.json')
      .then(response => response.json())
      .then(data => this.locations = data)
    }
  },
});
</script>

<style scoped>
.content p {
  text-align: left;
}

h3 {
  margin-top: 0px;
  margin-bottom: 40px;
}
.content {
  margin-left: auto;
  margin-right: auto;
  width: 86%;
  border: none;
}
.single-location {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}
.search-button,
.more-button,
.navigate-button {
  background-color: #e7334c;
  border: none;
  color: white;
  height: 60px;
  width: 25%;

  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
  margin: 40px 0px;
  border-radius: 0;
  margin-top: 20px;
}
.search-button:active,
.more-button:active {
  background-color: red;
  box-shadow: 0 5px #666;
  transform: translateY(1px);
}

.more-button {
  width: 65%;
  margin-top: 20px;
}
.navigate-button {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-left: auto;
  background-color: #142d49;
  width: 100%;
}
.searchbar {
  height: 60px;
  width: 68%;
  border: none;
  color: white;
  background-color: #79b9d5;
  margin-left: auto;
  border-radius: 0;
  font-size: 24px;
  background-repeat: no-repeat;
  background-position: 10px 0px;
}
:focus {
  border: none;
}
::placeholder {
  font-size: 24px;
  color: white;
}
.content-location {
  margin-top: 10px;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
}
.text-content p {
  margin-left: 10px;
  margin-right: 10px;
}
.map-responsive {
  margin: 15px 15px 80px 15px;
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 400px;
}
.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}

summary::-webkit-details-marker {
  display: none;
}

summary {
  list-style: none;
  border: 2px solid #000;
  padding: 0.75em 1em;
  cursor: pointer;
  position: relative;
  padding-left: calc(1.75rem + 0.75rem + 0.75rem);
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  background-color: #e7334c;
  border: none;
}
h2 {
  color: white;
}
summary:before {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.75rem;
  content: "↓";
  width: 1.75rem;
  height: 1.75rem;
  background-color: #000;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #e7334c;
}
details[open] summary {
  background-color: #e7334c;
}
details[open] summary:before {
  content: "↑";
  background-color: #e7334c;
}
details {
  margin: 0px;
}

summary:hover {
  background-color: #eee;
  background-color: #e7334c;
}
p {
  text-align: center;
}
</style>