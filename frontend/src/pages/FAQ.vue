<template>
  <div>
    <div class="white-space-top"></div>
    <div class="header-faq">
      <img src="../assets/images/FAQ.jpg" />
      <h1>Veelgesteldevragen</h1>
    </div>
    <page-content :id="5"></page-content>
    <div class="white-space-bottom"></div>
  </div>
</template>

<script lang="ts">
import PageContent from "../components/PageContent.vue";
export default {
  components: {
    PageContent,
  },
};
</script>

<style scoped>
.header-faq {
  position: relative;
  width: 100%;
  height: 50vw;
  z-index: 0;
}

.header-faq img {
  width: 100%;
  height: 50vw;
  object-fit: cover;
  object-position: -20% 0;
  border-radius: 8px;
  z-index: 0;
}
.header-faq h1 {
  position: absolute;
  color: white;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>
