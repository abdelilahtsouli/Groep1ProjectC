<template>
  <header>
    <Header />
  </header>
  <footer>
    <Footer :activePage="activePage" @switchPage="setNewPage" />
  </footer>
  <router-view @switchPage="setNewPage"/>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/footer.vue";

const activePage = ref("");

onMounted(function () {
  getCookie("token"), isNotLoggedIn();
});

function isNotLoggedIn() {
  return getCookie("token").length == 0;
}

function getCookie(cname: string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setNewPage(pageName: string): void {
  activePage.value = pageName;
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  padding: 0px;
  margin: 0px;
  background-color: rgb(238, 238, 238);
}
</style>

