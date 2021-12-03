<template>
  <div class="white-space-top"></div>
  <!-- <div class="container"> <div class="text-box"> <h3>Over bloed prikken</h3> <p> Moet jij bloed laten prikken? Dat gebeurt in de meeste gevallen voor medisch onderzoek. Het afnemen van bloed daarentegen kan ook wanneer je bloed komt doneren bij Sanquin. Jouw bloed wordt dan gebruikt om patiënten te helpen. </p> <h3>Bloedafname</h3> <p> Een bloedafname wordt uitgevoerd op aanvraag van een hiertoe bevoegde professional, bijvoorbeeld de huisarts of medisch specialist. Bij een bloedafname wordt een hoeveelheid bloed afgenomen. In de meeste gevallen worden er een aantal buisjes gevuld met bloed om te onderzoeken. </p> <div class="row"> <div class="col"> <div class="tabs"> <div class="tab"> <input type="checkbox" id="chck1" /> <label class="tab-label" for="chck1" >Op welke plek bloedafnemen?</label > <div class="tab-content"> Bloed kan op verschillende plekken worden afgenomen, namelijk: <ul> <li> Afname via elleboogholte, bijvoorkeur de niet-dominante arm. </li> <li> Afname via de bovenkant van de hand. Deze wijze van afname wordt alleen gebruikt wanneer de bloedafname in de elleboogholte onmogelijk is. </li> <li> Indien de bovengenoemde manieren niet lukken, dan wordt in enkele gevallen bloed afgenomen via een vingerprik. </li> <li> Indien er op meerdere tijdstippen bloed moet worden afgenomen kan in enkele gevallen een infuusnaald geplaatst worden. </li> <li> Bij jonge babies wordt bloed afgenomen uit het hieltje. Zodra baby’s ouder zijn wordt vaak gekozen voor een vingerprik. </li> </ul> </div> </div> <div class="tab"> <input type="checkbox" id="chck2" /> <label class="tab-label" for="chck2" >Flauwvallen na bloed prikken</label > <div class="tab-content"> Een flauwval reactie ontstaat doordat een deel van het zenuwstelsel, waar je geen invloed op hebt, onvoldoende reageert op bepaalde bloeddrukschommelingen. Dit kan veroorzaakt worden door naaldvrees. Meestal weten mensen in welke omstandigheden ze gevoelig zijn voor flauwvallen en passen zich daarop aan. Bijvoorbeeld tijdens het bloedprikken gaan liggen in plaats van staan of zitten. </div> </div> </div> </div> </div> <h3>Waarom bloedprikken?</h3> <p> Bijna iedereen moet wel eens bloed laten prikken. Via een bloedonderzoek krijg je een goed beeld van hoe je ervoor staat. Een bloedonderzoek zegt meer over iemands gezondheidstoestand dan welke andere vorm van diagnose. </p> <h3>Waar bloedafname?</h3> <p> Je kunt behalve bij het ziekenhuis ook terecht bij veel priklocaties in de regio. Zo kun je dicht bij huis bloed af laten nemen. Is een bloedafname aan huis nodig? Dit zogeheten ‘thuisprikken’ is alleen op aanvraag van een arts mogelijk. Vaak kiest een arts hier alleen voor als het voor een patiënt onmogelijk is om naar een priklocatie te gaan. </p> </div> </div> -->
  <page-content :id="2" :isLoggedIn="isLoggedIn"></page-content>
  <div class="white-space-bottom"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PageContent from "./PageContent.vue";

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
/* # The Rotating Marker # */
details summary::-webkit-details-marker {
  display: none;
}
summary::before {
  font-family: "Hiragino Mincho ProN", "Open Sans", sans-serif;
  content: "▶";
  position: absolute;
  top: 1.75rem;
  left: 0.8rem;
  transform: rotate(0);
  transform-origin: center;
  transition: 0.2s transform ease;
}
details[open] > summary:before {
  transform: rotate(90deg);
  transition: 0.45s transform ease;
}

/* # The Sliding Summary # */
details {
  overflow: hidden;
}
details summary {
  position: relative;
  z-index: 1;
}
@keyframes details-show {
  from {
    /* margin-bottom: -80%; */
    opacity: 0;
    transform: translateY(-100%);
  }
}
details > *:not(summary) {
  animation: details-show 500ms ease-in-out;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease-in-out;
  color: transparent;
  overflow: hidden;
}
details[open] > *:not(summary) {
  color: inherit;
}

/* # Just Some Pretty Styles # */
[contenteditable] {
  outline: 0px solid transparent;
}

details {
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 5px;
  background: white;
  box-shadow: 0 6px 15px -2px rgba(112, 128, 144, 0.5);
  text-align: center;
  width: 100%;
  z-index: 1;
}
summary {
  border: 4px solid transparent;
  outline: none;
  padding: 1rem;
  display: block;
  background: #142d49;
  color: white;
  padding-left: 2.2rem;
  position: relative;
  cursor: pointer;
}
details[open] summary,
summary:hover {
  color: white;
  background: #142d49;
}
summary:hover strong,
details[open] summary strong,
summary:hover::before,
details[open] summary::before {
  color: white;
}
.content {
  padding: 10px;
  border: 2px solid #142d49;
  border-top: none;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}

.remove-button {
  top: 0%;
  right: 0%;
  height: 30px;
  width: 30px;
  /* fill: var(--dark-blue); */
  color: var(--light-red);
  right: 0;
  z-index: 5;
  position: absolute;
  background-color: red;
  color: white;
  border-radius: 8px;
}
</style>
