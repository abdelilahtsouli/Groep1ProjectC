<template>
  <div id="app">
    <header>
    <Header/>
    </header>
    </div>
      
</template>

<script lang="ts">
import Header from './components/Header.vue'
export default {
  name: 'app',
  components: {
    Header
  }

};
</script>

<style>

body {
  font-family: 'monsterrat', sans-serif;
}

header {
  width: 100vw;
  background-color: #142d49;
  padding: 15px;
}
</style>
