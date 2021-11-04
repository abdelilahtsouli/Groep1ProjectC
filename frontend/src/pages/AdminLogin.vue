<template>
  <div id="app">
    <img style="  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;" alt="Vue logo" src="../assets/logo.png" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Login from "../components/Login.vue";
import twoFASetup from "../components/2FAsetup.vue";

@Options({
  components: {
    Login,
    twoFASetup,
  },
})
export default class App extends Vue {}
</script>
