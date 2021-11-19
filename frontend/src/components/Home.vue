<template>
  <div class="white-space-top"></div>
  <div>
    <div class="home">
      <div v-if="cookieTest()">
        <button class="edit-button" @click="toggleEditor()">Edit</button>
      </div>

      <div class="header">
        <img src="../assets/images/stock-img-smiling-chemists.jpg" />
      </div>
      <div class="block-container">
        <button class="block top-left-border">
          <router-link to="/Bloedprikken"
            ><div v-html="bloodDropletSvg"></div>
            <a>Bloedprikken</a></router-link
          >
        </button>
        <button class="block">
          <router-link to="#"
            ><div v-html="vialSvg"></div>
            <a>Urine Onderzoek</a></router-link
          >
        </button>
        <button class="block top-right-border">
          <router-link to="#"
            ><div v-html="mapMarkerSvg"></div>
            <a>Locaties</a></router-link
          >
        </button>
        <button class="block bottom-left-border ">
          <router-link to="#"
            ><div v-html="clockSvg"></div>
            <a>Openingstijden</a></router-link
          >
        </button>
        <button class="block">
          <router-link to="#"
            ><div v-html="locationArrowSvg"></div>
            <a>Routeplanner</a></router-link
          >
        </button>
        <button class="block bottom-right-border ">
          <router-link to="#"
            ><div v-html="paperPlaneSvg"></div>
            <a>Contact</a></router-link
          >
        </button>
        <router-view></router-view>
      </div>

      <div v-if="!editting">
        <!-- <div class="separator"></div> -->
        <div class="container">
          <div id="newsletter" class="text-box">
            <h3>Coronamaatregelen - zorg goed voor uzelf en voor elkaar</h3>
            <div v-html="virusSvg"></div>
            <p>
              Star-shl blijft de anderhalve meter afstand handhaven. Op onze
              locaties komen mensen met een kwetsbare gezondheid. Het afstand
              houden beschermt deze patiënten tegen risico op overdracht van
              Covid-19. Daarnaast willen we voorkomen dat medewerkers besmet
              raken en niet kunnen werken.
            </p>
            <div v-html="maskSvg"></div>
            <p>
              Mondkapjes zijn vanaf 6 november 2021 verplicht in publieke
              ruimtes. We vragen patiënten daarom dringend een zelf meegebracht
              mondkapje te dragen op de locaties van Star-shl. Star-shl volgt
              hierin het beleid van de Rijksoverheid. Onze medewerkers maken
              gebruik van een mondneusmasker en handschoenen.
            </p>
            <div v-html="chestListSvg"></div>
            <p>
              Realiseert u zich a.u.b. dat vaccinatie tegen het coronavirus geen
              100% garantie geeft tegen verspreiding van het virus onder ons.
              Dit betekent dat we u kunnen vragen (als ook als u al gevaccineerd
              bent) of u klachten heeft die passen bij corona. We kunnen ook
              vragen of er sprake is van thuisquarantaine of een risicocontact
              met corona. Dit doen wij om onze dienstverlening voor iedereen zo
              veilig mogelijk te maken.
            </p>
          </div>
        </div>
      </div>
      <page-editor
        v-else
        :content="content"
        @changeContent="setNewContent"
      ></page-editor>
      <div class="white-space-bottom"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, onMounted, ref } from "vue";
import PageEditor from "../components/PageEditor.vue";

const emit = defineEmits(["switchPage"]);

function setNewContent(newContent: string): void {
  content.value = newContent;
}
function toggleEditor() {
  editting.value = !editting.value;
}
function cookieTest() {
  return document.cookie != "";
}

onMounted(() => emit("switchPage", "home"));

const editting = ref(false);
const content = ref("");

const bloodDropletSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tint" class="svg-inline--fa fa-tint fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448c-61.75 0-112-50.25-112-112 0-8.84 7.16-16 16-16s16 7.16 16 16c0 44.11 35.89 80 80 80 8.84 0 16 7.16 16 16s-7.16 16-16 16z"></path></svg>`;
const vialSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="vial" class="svg-inline--fa fa-vial fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path fill="currentColor" d="M477.7 186.1L309.5 18.3c-3.1-3.1-8.2-3.1-11.3 0l-34 33.9c-3.1 3.1-3.1 8.2 0 11.3l11.2 11.1L33 316.5c-38.8 38.7-45.1 102-9.4 143.5 20.6 24 49.5 36 78.4 35.9 26.4 0 52.8-10 72.9-30.1l246.3-245.7 11.2 11.1c3.1 3.1 8.2 3.1 11.3 0l34-33.9c3.1-3 3.1-8.1 0-11.2zM318 256H161l148-147.7 78.5 78.3L318 256z"></path></svg>`;
const mapMarkerSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>`;
const clockSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" class="svg-inline--fa fa-clock fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path></svg>`;
const locationArrowSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-arrow" class="svg-inline--fa fa-location-arrow fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path></svg>`;
const paperPlaneSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" class="svg-inline--fa fa-paper-plane fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>`;
const virusSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="virus" class="svg-inline--fa fa-virus fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M483.55,227.55H462c-50.68,0-76.07-61.27-40.23-97.11L437,115.19A28.44,28.44,0,0,0,396.8,75L381.56,90.22c-35.84,35.83-97.11,10.45-97.11-40.23V28.44a28.45,28.45,0,0,0-56.9,0V50c0,50.68-61.27,76.06-97.11,40.23L115.2,75A28.44,28.44,0,0,0,75,115.19l15.25,15.25c35.84,35.84,10.45,97.11-40.23,97.11H28.45a28.45,28.45,0,1,0,0,56.89H50c50.68,0,76.07,61.28,40.23,97.12L75,396.8A28.45,28.45,0,0,0,115.2,437l15.24-15.25c35.84-35.84,97.11-10.45,97.11,40.23v21.54a28.45,28.45,0,0,0,56.9,0V462c0-50.68,61.27-76.07,97.11-40.23L396.8,437A28.45,28.45,0,0,0,437,396.8l-15.25-15.24c-35.84-35.84-10.45-97.12,40.23-97.12h21.54a28.45,28.45,0,1,0,0-56.89ZM224,272a48,48,0,1,1,48-48A48,48,0,0,1,224,272Zm80,56a24,24,0,1,1,24-24A24,24,0,0,1,304,328Z"></path></svg>`;
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12.485 3.121l7.758 1.94c.445.11.757.51.757.97V7h1c1.1 0 2 .9 2 2v3c0 1.657-1.343 3-3 3h-.421c-.535 1.35-1.552 2.486-2.896 3.158l-4.789 2.395c-.563.281-1.225.281-1.788 0l-4.79-2.395C4.974 17.486 3.957 16.35 3.422 15H3c-1.657 0-3-1.343-3-3V9c0-1.105.895-2 2-2h1v-.97c0-.458.312-.858.757-.97l7.758-1.939c.318-.08.652-.08.97 0zM12 5.061l-7 1.75v5.98c0 1.516.856 2.9 2.211 3.579L12 18.764l4.789-2.394C18.144 15.692 19 14.307 19 12.792v-5.98l-7-1.75zM3 9H2v3c0 .552.448 1 1 1V9zm19 0h-1v4c.552 0 1-.448 1-1V9z"/></svg>`;
const chestListSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clipboard-list" class="svg-inline--fa fa-clipboard-list fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path></svg>`;
</script>

<style>
.white-space-top {
  background-color: var(--light-grey);
  width: 100%;
  height: 55px;
}

.white-space-bottom {
  background-color: var(--light-grey);
  width: 100%;
  height: 55px;
}

.edit-button {
  width: 10%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-red);
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  box-sizing: border-box;
}

.bottom-left-border {
  border-bottom-left-radius: 8px;
}

.bottom-right-border {
  border-bottom-right-radius: 8px;
}

.top-left-border {
  border-top-left-radius: 8px;
}

.top-right-border {
  border-top-right-radius: 8px;
}

.block-container {
  background-color: var(--light-grey);
  height: 100%;
  width: 100%;
  /* box-shadow: 0 6px 6px -2px rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 6px 6px -2px rgba(112, 128, 144, 0.5); */
}

.block {
  /* width: 33vw; */
  width: calc(100% / 3);
  height: 20vw;
  font-weight: 500;
  /* font-size: 23px; */
  font-size: 14px;
  cursor: pointer;
  color: var(--dark-blue);
  background-color: var(--white);
  border: 1px solid var(--light-grey);
  /* border-radius: 8px; */
  /* box-shadow: 0 6px 6px -2px rgba(0, 0, 0, 0.5); */
  box-shadow: 0 6px 15px -2px rgba(112, 128, 144, 0.5);
}

.block a {
  color: var(--dark-blue);
  text-decoration: none;
}

.block:hover a {
  color: var(--white);
  transition: 0.7s ease;
}

.block svg {
  height: 24px;
  width: 24px;
  fill: var(--dark-blue);
  /* transition: 0.7s ease; */
}

.block:hover svg {
  fill: var(--white);
}

.block:active,
.block:hover {
  border: 2.5px solid var(--white);
  color: var(--white);
  background-color: var(--dark-blue);
  transition: 0.7s ease;
}

.container {
  padding-top: 5px;
  border-top: 1px solid var(--light-grey);
  border-bottom: 1px solid var(--light-grey);
}

.text-box {
  margin: 0 10px;
  text-align: center;
}

.text-box p {
  font-size: 15px;
  margin-top: 0;
}

.text-box h3 {
  margin-top: 10px;
}

.text-box svg {
  height: 24px;
  width: 24px;
  color: var(--light-red);
  fill: var(--light-red);
  margin: 5px 0 0 0;
}

.home .header {
  display: flex;
}

.home .header img {
  width: 100vw;
  height: 50vw;
  object-fit: cover;
  object-position: -20% 0;
  /* height: 100vw; */
}

.separator {
  width: 100vw;
  height: 3vw;
  /* background-color: #d4d4d1; */
  opacity: 50%;
}
</style>
