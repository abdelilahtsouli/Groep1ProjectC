<template>
  <header>
    <Header />
  </header>
  <footer>
    <Footer :activePage="activePage" @switchPage="setNewPage" :loggedIn="userIsLoggedIn" @logOut="logOut" :isSuperUser="superUser"/>
  </footer>
  <router-view @switchPage="setNewPage" @userLoggedIn="isLoggedIn" :isLoggedIn="userIsLoggedIn" @isSuperUser="isaSuperUser"/>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/footer.vue";
import { VueCookieNext } from "vue-cookie-next";

const activePage = ref("");



function setNewPage(pageName: string): void {
  activePage.value = pageName;
}

const userIsLoggedIn = ref(false);
function isLoggedIn(loggedIn: boolean) {
  userIsLoggedIn.value = loggedIn;
}
function logOut() {
  userIsLoggedIn.value = false;
  console.log(userIsLoggedIn.value)
}
const superUser = ref(false);
function isaSuperUser(su: boolean) {
  superUser.value = su;
}


</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
