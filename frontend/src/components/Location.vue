<template>
<div class="show-locations">
  <div class="searchbar">
    <input type="text" v-model="search" placeholder="Zoek locaties">
      <div v-for="location in filterLocations" :key="location" class="single-location">
        <h1>{{ location.locationname }}</h1>
        <p>{{ location.street }}</p>
        <p>{{ location.postcode }} {{ location.city }}</p>
      </div>
  </div>
</div>
  
  <div class="content-location">
    <div class="text-content">
      <h1>Locaties bloedafname</h1>
      <h4>Coronamaatregelen op onze locaties</h4>
      <p>Star-shl blijft de anderhalve meter afstand handhaven. Op onze locaties komen mensen met een kwetsbare gezondheid. Het afstand houden beschermt deze patiënten tegen risico op overdracht van Covid-19. Daarnaast willen we voorkomen dat medewerkers besmet raken en niet kunnen werken.</p>
      <br>
      <h4>Mondkapjes verplicht</h4>
      <p>Mondkapjes zijn sinds 6 november 2021 verplicht in publieke ruimtes. We vragen patiënten daarom dringend een zelf meegebracht mondkapje te dragen op de locaties van Star-shl. Star-shl volgt hierin het beleid van de Rijksoverheid. Onze medewerkers maken gebruik van een mondneusmasker en handschoenen.</p>
      <br>
      <p>Op deze pagina vindt u alle locaties voor bloedafname.</p>
    </div>
  </div>
  <div class="map-responsive">
    <iframe src="https://www.google.com/maps/d/embed?mid=1b_K2S4IW2EyIJf_2WR1jcqo5THYs8fGe&hl=nl&z=8" width="600" height="400" style="border:0" allowfullscreen></iframe>
  </div>
</template>

<script>
const locations = [
  {
    city: "Giessenburg",
    locationname: "Gezondheidscentrum Giessenburg",
    street: "Kastanjeplein 5",
    postcode: "3381 LT",
    openinghours: "08.00 - 10.00",
    particularities: "Vrije inloop: geen afspraak nodig",
    lat: "51.8536808604307",
    lon: "4.8878154476493"
  },
  {
    city: "Gorinchem",
    locationname: "Gezondheidscentrum Zorgpunt West",
    street: "Mollenburgseweg 15",
    postcode: "4205 HB",
    openinghours: "08.00 - 10.00 uur",
    particularities: "Alleen op afspraak",
    lat: "51.8415444870278",
    lon: "4.9647241099002"
  },
  {
    city: "Gorinchem",
    locationname: "Prikpost Star-SHL",
    street: "Robberstraat 5",
    postcode: "4201 AK",
    openinghours: "08.00 - 11.00 uur",
    particularities: "Vrije inloop: geen afspraak nodig",
    lat: "51.8279357787020",
    lon: "4.9772161084258"
  },
];
export default {
  data() {
    return { search: "", locations };
  },
  computed: {
    filterLocations() {
      const { locations, search } = this;
      return locations.filter(({ locationname }) => locationname.toLowerCase().includes(search.toLowerCase()) || locationname.toLowerCase().includes(search.toLowerCase()));
    },
  },
};
</script>

<style>

.content-location{
  margin-top: 100px;
  text-align: center;
  width: 100%;
}
.text-content p{
  margin-left: 10px;
  margin-right: 10px;
}
.map-responsive{
  margin: 15px 15px 80px 15px;
  overflow:hidden;
  padding-bottom:56.25%;
  position:relative;
  height:400px;
}
.map-responsive iframe{
  left:0;
  top:0;
  height:100%;
  width:100%;
  position:absolute;
}
.searchbar {
  margin-top: 100px;
  text-align: center;
  width: 100%;
}

</style>