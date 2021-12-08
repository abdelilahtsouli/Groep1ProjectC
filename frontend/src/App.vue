<template>
  <header>
    <Header />
  </header>
  <footer>
    <Footer />
  </footer>
  <router-view/>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { VueCookieNext } from "vue-cookie-next";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import bus from "./bus";

onMounted(() => {
  bus.emit("sessionModify", {
      "loggedIn": VueCookieNext.getCookie("token") != null,
      "superUser": VueCookieNext.getCookie("superUser") != null
  });
});

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
