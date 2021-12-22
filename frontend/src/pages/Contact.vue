<template>
  <div class="white-space-top"></div>
  <div class="header-contact">
    <div class="contact">
      <img src="../assets/images/stock-img-smiling-chemists.jpg" />
      <h1>Contact</h1>
    </div>
  </div>
  <page-content :id="4"></page-content>
  <div class="white-space-bottom"></div>
</template>

<script lang="ts">
import PageContent from "../components/PageContent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    PageContent,
  },
});
</script>

<style scoped>
.header-contact {
  text-align: center;
}
.contact {
  position: relative;
  width: 100%;
  height: 50vw;
  z-index: 0;
}
.contact img {
  width: 100%;
  height: 50vw;
  object-fit: cover;
  object-position: -20% 0;
  border-radius: 8px;
  z-index: 1;
}
.contact h1 {
  color: white;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.content-contact a {
  color: #e7334c !important;
  text-decoration: none;
}
</style>
