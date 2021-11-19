<template>
  <div class="white-space-top"></div>
  <div class="container">
    <div class="text-box">
      <h3>Placeholder</h3>
      <p>
        Op een klein deel werken we voor bloedafname volgens geplande afspraken.
        Op deze pagina kunt u direct online een afspraak inplannen voor
        bloedafname op de locaties waar een afspraak nodig is. In dit overzicht
        ziet u in de kolom 'Bijzonderheden' welke locaties dit zijn. Wilt u een
        afspraak maken voor bloedafname voor NIPT? Bekijk dan eerst hier op
        welke locaties dat kan.
      </p>
      <h3>Placeholder</h3>
      <p>
        Op een klein deel werken we voor bloedafname volgens geplande afspraken.
        Op deze pagina kunt u direct online een afspraak inplannen voor
        bloedafname op de locaties waar een afspraak nodig is. In dit overzicht
        ziet u in de kolom 'Bijzonderheden' welke locaties dit zijn. Wilt u een
        afspraak maken voor bloedafname voor NIPT? Bekijk dan eerst hier op
        welke locaties dat kan.
      </p>
      <div class="row">
        <div class="col">
          <div class="tabs">
            <div class="tab">
              <input type="checkbox" id="chck1" />
              <label class="tab-label" for="chck1">Placeholder</label>
              <div class="tab-content">
                Op een klein deel werken we voor bloedafname volgens geplande
                afspraken. Op deze pagina kunt u direct online een afspraak
                inplannen voor bloedafname op de locaties waar een afspraak
                nodig is. In dit overzicht ziet u in de kolom 'Bijzonderheden'
                welke locaties dit zijn. Wilt u een afspraak maken voor
                bloedafname voor NIPT? Bekijk dan eerst hier op welke locaties
                dat kan.
              </div>
            </div>
            <div class="tab">
              <input type="checkbox" id="chck2" />
              <label class="tab-label" for="chck2">Placeholder</label>
              <div class="tab-content">
                Op een klein deel werken we voor bloedafname volgens geplande
                afspraken. Op deze pagina kunt u direct online een afspraak
                inplannen voor bloedafname op de locaties waar een afspraak
                nodig is. In dit overzicht ziet u in de kolom 'Bijzonderheden'
                welke locaties dit zijn. Wilt u een afspraak maken voor
                bloedafname voor NIPT? Bekijk dan eerst hier op welke locaties
                dat kan.
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3>Placeholder</h3>
      <p>
        Op een klein deel werken we voor bloedafname volgens geplande afspraken.
        Op deze pagina kunt u direct online een afspraak inplannen voor
        bloedafname op de locaties waar een afspraak nodig is. In dit overzicht
        ziet u in de kolom 'Bijzonderheden' welke locaties dit zijn. Wilt u een
        afspraak maken voor bloedafname voor NIPT? Bekijk dan eerst hier op
        welke locaties dat kan.
      </p>
      <h3>Placeholder</h3>
      <p>
        Op een klein deel werken we voor bloedafname volgens geplande afspraken.
        Op deze pagina kunt u direct online een afspraak inplannen voor
        bloedafname op de locaties waar een afspraak nodig is. In dit overzicht
        ziet u in de kolom 'Bijzonderheden' welke locaties dit zijn. Wilt u een
        afspraak maken voor bloedafname voor NIPT? Bekijk dan eerst hier op
        welke locaties dat kan.
      </p>
    </div>
  </div>
  <div class="white-space-bottom"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    onMounted(() => {
      emit("switchPage", "bloedprikken");
    });

    const show = ref(true);
    return { show };
  },
});
</script>

<style scoped>
:root {
  --text-color: var(--dark-blue);
  /* --background-mask: white; */
  --background-mask: var(--light-grey);
}

h1 {
  margin: 0;
  line-height: 2;
  text-align: center;
}
h2 {
  margin: 0 0 0.5em;
  font-weight: normal;
}
input {
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
  margin: 0 10px;
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