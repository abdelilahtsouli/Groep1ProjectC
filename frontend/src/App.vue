<template>
  <header>
    <Header />
  </header>
  <footer>
    <Footer :activePage="activePage" @switchPage="setNewPage" :loggedIn="isUserLoggedIn" @logout="logout" :isSuperUser="isSuperUser"/>
  </footer>
  <router-view @switchPage="setNewPage" @userLoggedIn="setIsLoggedIn" :isLoggedIn="isUserLoggedIn" @isSuperUser="setIsSuperUser"/>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/footer.vue";
import { VueCookieNext } from "vue-cookie-next";

const activePage = ref("");
const isUserLoggedIn = ref(false);
const isSuperUser = ref(false);

function setNewPage(pageName: string): void {
  activePage.value = pageName;
}

function setIsLoggedIn(loggedIn: boolean) {
  isUserLoggedIn.value = loggedIn;
}

function setIsSuperUser(su: boolean) {
  isSuperUser.value = su;
}

function logout() {
  isUserLoggedIn.value = false;

  VueCookieNext.removeCookie("token");
  VueCookieNext.removeCookie("superUser");
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
