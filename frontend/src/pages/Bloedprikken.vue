<template>
  <div class="white-space-top"></div>
  <!-- <div class="text-box">
    <h3>Coronamaatregelen - zorg goed voor uzelf en voor elkaar</h3>
    <p>Star-shl blijft de anderhalve meter afstand handhaven. Op onze locaties komen mensen met een kwetsbare gezondheid. Het afstand houden beschermt deze patiënten tegen risico op overdracht van Covid-19. Daarnaast willen we voorkomen dat medewerkers besmet raken en niet kunnen werken.</p>
    <p>Mondkapjes zijn vanaf 6 november 2021 verplicht in publieke ruimtes. We vragen patiënten daarom dringend een zelf meegebracht mondkapje te dragen op de locaties van Star-shl. Star-shl volgt hierin het beleid van de Rijksoverheid. Onze medewerkers maken gebruik van een mondneusmasker en handschoenen.</p>
    <slide-show></slide-show>
    <p>Realiseert u zich a.u.b. dat vaccinatie tegen het coronavirus geen 100% garantie geeft tegen verspreiding van het virus onder ons. Dit betekent dat we u kunnen vragen (als ook als u al gevaccineerd bent) of u klachten heeft die passen bij corona. We kunnen ook vragen of er sprake is van thuisquarantaine of een risicocontact met corona. Dit doen wij om onze dienstverlening voor iedereen zo veilig mogelijk te maken.</p>
  </div> -->
  <!-- <test></test> -->
  <page-content :id="2"></page-content>
  <!-- <slide-show></slide-show>
  <page-content :id="2"></page-content> -->
  <div class="white-space-bottom"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "../components/PageContent.vue";

export default defineComponent({
  components: {
    PageContent,
  },
});
</script>
