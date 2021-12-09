<template>
  <div class="white-space-top"></div>
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
