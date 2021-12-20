<template>
  <div>
    <div class="white-space-top"></div>
    <div>
      <div class="home">
        <!-- Header image -->
        <div class="header">
          <img src="../assets/images/stock-img-smiling-chemists.jpg" />
        </div>
        <!-- Shorcut buttons -->
        <div class="block-container">
          <button class="block top-left-border">
            <router-link to="/Bloedprikken"
              ><div v-html="bloodDropletSvg"></div>
              <a>Bloedprikken</a></router-link
            >
          </button>
          <button class="block">
            <router-link to="/Urineonderzoek"
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
          <button class="block bottom-left-border">
            <router-link to="#"
              ><div v-html="clockSvg"></div>
              <a>Openingstijden</a></router-link
            >
          </button>
          <button class="block">
            <router-link to="/location"
              ><div v-html="locationArrowSvg"></div>
              <a>Routeplanner</a></router-link
            >
          </button>
          <button class="block bottom-right-border">
            <router-link to="/contact"
              ><div v-html="paperPlaneSvg"></div>
              <a>Contact</a></router-link
            >
          </button>
          <router-view></router-view>
          
        </div>
        <!-- Actual page content -->
        <page-content :id="1"></page-content>
        <div class="white-space-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageContent from "../components/PageContent.vue";

const bloodDropletSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tint" class="svg-inline--fa fa-tint fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448c-61.75 0-112-50.25-112-112 0-8.84 7.16-16 16-16s16 7.16 16 16c0 44.11 35.89 80 80 80 8.84 0 16 7.16 16 16s-7.16 16-16 16z"></path></svg>`;
const vialSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="vial" class="svg-inline--fa fa-vial fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path fill="currentColor" d="M477.7 186.1L309.5 18.3c-3.1-3.1-8.2-3.1-11.3 0l-34 33.9c-3.1 3.1-3.1 8.2 0 11.3l11.2 11.1L33 316.5c-38.8 38.7-45.1 102-9.4 143.5 20.6 24 49.5 36 78.4 35.9 26.4 0 52.8-10 72.9-30.1l246.3-245.7 11.2 11.1c3.1 3.1 8.2 3.1 11.3 0l34-33.9c3.1-3 3.1-8.1 0-11.2zM318 256H161l148-147.7 78.5 78.3L318 256z"></path></svg>`;
const mapMarkerSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>`;
const clockSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" class="svg-inline--fa fa-clock fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path></svg>`;
const locationArrowSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-arrow" class="svg-inline--fa fa-location-arrow fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path></svg>`;
const paperPlaneSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" class="svg-inline--fa fa-paper-plane fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>`;
</script>


<style>
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
  border-radius: 8px;
  /* box-shadow: 0 6px 6px -2px rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 6px 6px -2px rgba(112, 128, 144, 0.5); */
}

.block {
  /* width: 33vw; */
  width: calc(100% / 3);
  height: 20vw;
  font-weight: 500;
  /* font-size: 23px; */
  font-size: 12px;
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

.home .header {
  display: flex;
}

.home .header img {
  width: 100vw;
  height: 50vw;
  object-fit: cover;
  object-position: -20% 0;
  border-radius: 8px;
  /* height: 100vw; */
}

.separator {
  width: 100vw;
  height: 3vw;
  /* background-color: #d4d4d1; */
  opacity: 50%;
}
</style>
