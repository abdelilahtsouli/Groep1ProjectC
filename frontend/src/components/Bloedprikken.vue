<template>
  <div class="white-space-top"></div>
  <div class="container">
    <div id="demo">
      <button @click="show = !show">Toggle</button>

      <transition name="fade">
        <p v-show="show">hello</p>
      </transition>
    </div>
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
      <h3>Placeholder</h3>
      <p>
        Let op: heeft u een afspraak gemaakt, maar kunt u niet naar de afspraak
        komen? Annuleer dan de afspraak via de link in de bevestigingsmail of
        bel ons klantcontactcentrum. Doet u dit niet, dan kunnen er kosten in
        rekening worden gebracht
      </p>
    </div>
  </div>
  <div class="white-space-bottom"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: {},
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>