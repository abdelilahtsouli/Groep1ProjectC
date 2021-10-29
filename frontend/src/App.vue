<template>
  <div id="app">
    <img style="width: 50%;" alt="Vue logo" src="./assets/logo.png" />
    <router-view />
  </div>
</template> 

<script lang="ts">

import { Options, Vue } from "vue-class-component";
import Login from "./components/Login.vue";
import twoFASetup from "./components/2FAsetup.vue"


@Options({ 
  components: {
    Login,
    twoFASetup
  },
})
export default class App extends Vue {}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
