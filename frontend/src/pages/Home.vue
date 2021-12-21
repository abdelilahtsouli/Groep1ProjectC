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
              <a>Urineonderzoek</a></router-link
            >
          </button>
          <button class="block top-right-border">
            <router-link to="/location"
              ><div v-html="mapMarkerSvg"></div>
              <a>Locaties</a></router-link
            >
          </button>
          <button class="block bottom-left-border">
            <router-link to="/Kinderen"
              ><div v-html="Kidssvg"></div>
              <a>Kids</a></router-link
            >
          </button>
          <button class="block">
            <router-link to="/Veelgesteldevragen"
              ><div v-html="FAQsvg"></div>
              <a>FAQ</a></router-link
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
const Kidssvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17.5 2a4.5 4.5 0 0 1 2.951 7.897c.355.967.549 2.013.549 3.103A9 9 0 1 1 3.55 9.897a4.5 4.5 0 1 1 6.791-5.744 9.05 9.05 0 0 1 3.32 0A4.494 4.494 0 0 1 17.5 2zM10 13H8a4 4 0 0 0 7.995.2L16 13h-2a2 2 0 0 1-3.995.15L10 13z"/></svg>`;
const FAQsvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.501 3.501 0 0 0-3.433 2.813l1.962.393A1.5 1.5 0 1 1 12 11.5a1 1 0 0 0-1 1V14h2v-.645z"/></svg>`;
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
