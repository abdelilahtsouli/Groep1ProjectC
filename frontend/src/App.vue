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

<style>{
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
  font-family: 'monsterrat', sans-serif;
}

header {
  width: 100vw;
  background-color: rgb(0, 0, 0);
  padding: 15px;
}
</style>
