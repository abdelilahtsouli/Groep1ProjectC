<template>
  <div class="white-space-top"></div>
  <!-- <div class="container"> <div class="text-box"> <h3>Over bloed prikken</h3> <p> Moet jij bloed laten prikken? Dat gebeurt in de meeste gevallen voor medisch onderzoek. Het afnemen van bloed daarentegen kan ook wanneer je bloed komt doneren bij Sanquin. Jouw bloed wordt dan gebruikt om patiënten te helpen. </p> <h3>Bloedafname</h3> <p> Een bloedafname wordt uitgevoerd op aanvraag van een hiertoe bevoegde professional, bijvoorbeeld de huisarts of medisch specialist. Bij een bloedafname wordt een hoeveelheid bloed afgenomen. In de meeste gevallen worden er een aantal buisjes gevuld met bloed om te onderzoeken. </p> <div class="row"> <div class="col"> <div class="tabs"> <div class="tab"> <input type="checkbox" id="chck1" /> <label class="tab-label" for="chck1" >Op welke plek bloedafnemen?</label > <div class="tab-content"> Bloed kan op verschillende plekken worden afgenomen, namelijk: <ul> <li> Afname via elleboogholte, bijvoorkeur de niet-dominante arm. </li> <li> Afname via de bovenkant van de hand. Deze wijze van afname wordt alleen gebruikt wanneer de bloedafname in de elleboogholte onmogelijk is. </li> <li> Indien de bovengenoemde manieren niet lukken, dan wordt in enkele gevallen bloed afgenomen via een vingerprik. </li> <li> Indien er op meerdere tijdstippen bloed moet worden afgenomen kan in enkele gevallen een infuusnaald geplaatst worden. </li> <li> Bij jonge babies wordt bloed afgenomen uit het hieltje. Zodra baby’s ouder zijn wordt vaak gekozen voor een vingerprik. </li> </ul> </div> </div> <div class="tab"> <input type="checkbox" id="chck2" /> <label class="tab-label" for="chck2" >Flauwvallen na bloed prikken</label > <div class="tab-content"> Een flauwval reactie ontstaat doordat een deel van het zenuwstelsel, waar je geen invloed op hebt, onvoldoende reageert op bepaalde bloeddrukschommelingen. Dit kan veroorzaakt worden door naaldvrees. Meestal weten mensen in welke omstandigheden ze gevoelig zijn voor flauwvallen en passen zich daarop aan. Bijvoorbeeld tijdens het bloedprikken gaan liggen in plaats van staan of zitten. </div> </div> </div> </div> </div> <h3>Waarom bloedprikken?</h3> <p> Bijna iedereen moet wel eens bloed laten prikken. Via een bloedonderzoek krijg je een goed beeld van hoe je ervoor staat. Een bloedonderzoek zegt meer over iemands gezondheidstoestand dan welke andere vorm van diagnose. </p> <h3>Waar bloedafname?</h3> <p> Je kunt behalve bij het ziekenhuis ook terecht bij veel priklocaties in de regio. Zo kun je dicht bij huis bloed af laten nemen. Is een bloedafname aan huis nodig? Dit zogeheten ‘thuisprikken’ is alleen op aanvraag van een arts mogelijk. Vaak kiest een arts hier alleen voor als het voor een patiënt onmogelijk is om naar een priklocatie te gaan. </p> </div> </div> -->
  <page-content :id="2" :isLoggedIn="isLoggedIn"></page-content>
  <div class="white-space-bottom"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PageContent from "../components/PageContent.vue";

export default defineComponent({
  components: {
    PageContent,
  },
  props: {
    isLoggedIn: Boolean,
  },
  emits: ["switchPage", "userLoggedIn"],
  setup(props, { emit }) {
    onMounted(() => {
      emit("switchPage", "bloedprikken");
      if (document.cookie != "") {
        emit("userLoggedIn", true);
      }
    });
    console.log(props.isLoggedIn);
    const show = ref(true);
    return { show };
  },

});
</script>

<style>
/* :root {
  --text-color: var(--dark-blue);
  --background-mask: var(--light-grey);
} */

.tab input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.row {
  display: flex;
}
.row .col {
  flex: 1;
}
.row .col:last-child {
  /* margin-left: 1em; */
  /* margin: 0 10px; */
  margin: 0 10px 5px 10px;
}

/* Accordion styles */
.tabs {
  border-radius: 8px;
  overflow: hidden;
  /* box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 6px 6px -2px rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 6px 6px -2px rgba(112, 128, 144, 0.5); */
  box-shadow: 0 6px 15px -2px rgba(112, 128, 144, 0.5);
}
.tab {
  background: var(--background-mask);
  width: 100%;
  color: var(--text-color);
  overflow: hidden;
}
.tab-label {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: var(--background-mask);
  font-weight: bold;
  cursor: pointer;
  /* border-bottom: 1px solid grey; */
  /* Icon */
}

/* .tab-label:hover {
  background: #1a252f;
} */

.tab-label::after {
  content: "\276F";
  width: 1em;
  height: 1em;
  text-align: center;
  /* transition: all 0.35s; */
  transition: all 1s ease;
}

.tab-content {
  max-height: 0;
  padding: 0 1em;
  color: var(--background-mask);
  background: var(--background-mask);
  /* transition: all 0.35s; */
  /* transition: all 0.5s ease; */
  transition: all 1s ease;
}

.tab-content li {
  margin: 5px 0;
  /* text-align: left; */
}

.tab-close {
  display: flex;
  justify-content: flex-end;
  padding: 1em;
  font-size: 0.75em;
  background: var(--background-mask);
  cursor: pointer;
  /*  */
  transition: all 1s ease;
}
/* .tab-close:hover {
  background: #1a252f;
} */

/* input:checked + .tab-label {
  background: #1a252f;
} */
input:checked + .tab-label::after {
  transform: rotate(90deg);
}
input:checked ~ .tab-content {
  max-height: 100vh;
  padding: 1em;
}
</style>
