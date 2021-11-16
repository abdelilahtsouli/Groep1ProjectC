
<template>
    <header>
    <Header/>
    </header>
  <div id="nav">
    <router-link to="/home">Home</router-link> |
    <router-link to="/bloedprikken">Bloedprikken</router-link> |
    <router-link v-if="isNotLoggedIn()" to="/login">Login</router-link>
    <img src='./assets/logo.png'>
  </div>
  <router-view @newCookieValue="setCookie" />
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

#nav {
  width: 100%;
  background-color: #79b9d5;
  margin-bottom: 10px;

}

#nav a {
  font-weight: bold;
  color: #142d49;
}

#nav a.router-link-exact-active {
  color: #e7334c;
}
img{
  width: 80%;
  padding-top: 10px;
  margin: 5px;
  padding-bottom: 0px;
}
</style>

