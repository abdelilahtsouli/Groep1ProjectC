
<template>
    <header>
    <Header/>
    </header>

  <router-view/>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Header from './components/Header.vue'



onMounted( function()  {
  getCookie('token'),
  console.log('test')
  isNotLoggedIn()
}); 

function isNotLoggedIn(){
  return getCookie('token').length == 0
}

function getCookie(cname : string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

body{
  padding: 0px;
  margin: 0px;
}






</style>

