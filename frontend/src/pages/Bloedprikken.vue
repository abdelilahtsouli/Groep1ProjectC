<template>
  <div class="white-space-top"></div>
      <div class="img-field">
        <img src="../assets/images/star-bloedprikken.jpg" class="img-banner">
        <h1 class="header-text">Bloedprikken</h1>
    </div>
  <page-content :id="2"></page-content>
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
<style>
.header-text{
  color: white;
}
</style>