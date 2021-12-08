<template>
  <div class="white-space-top"></div>
  <page-content :id="3" :isLoggedIn="isLoggedIn"></page-content>
  <div class="uneditableContent">
    <div class="map-responsive">
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1b_K2S4IW2EyIJf_2WR1jcqo5THYs8fGe&hl=nl&z=8"
        width="600"
        height="400"
        style="border: 0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
  <div class="white-space-bottom"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import PageContent from "../components/PageContent.vue";

export default defineComponent({
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["switchPage", "userLoggedIn"],
  components: {
    PageContent,
  },
  setup(props, { emit }) {
    onMounted(() => {
      emit("switchPage", "locaties");
      if (document.cookie != "") {
        emit("userLoggedIn", true);
      }
    });
    return {};
  },
});
</script>

<style>
.content-location {
  /* margin-top: 100px; */
  text-align: center;
  width: 100%;
}
.text-content p {
  margin-left: 10px;
  margin-right: 10px;
}
.map-responsive {
  /* margin: 15px 15px 80px 15px; */
  margin: 15px 15px 45px 15px;
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 400px;
}
.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
