<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld/>
    <Hello/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
import Hello from "./components/Hello.vue"

@Options({ 
  components: {
    HelloWorld,
    Hello
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
