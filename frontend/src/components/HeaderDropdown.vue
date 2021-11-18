<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <a href="#">
      {{ title }}
    </a>
    <svg viewBox="0 0 1030 638" width="10">
      <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#FFF"></path>
    </svg>

  </div>
</template>
<script lang = "ts">
import { onMounted, ref, watchEffect } from 'vue';

import router from '../router';
const cookie = ref('');
export default {
  setup(){
    watchEffect(() => cookie.value = document.cookie )

    function logOut(){
      router.push({
        name: "logout", params: {page: router.currentRoute.value.path} })
    }
    return{cookie,logOut}
  },
  name: 'HeaderDropdown',
  props: ['title', 'items'],

  data () {
    return {
      isOpen: false

    }
  },
}
</script>

<style >
nav .menu-item svg {
  width: 10px;
  margin-left: 10px;
}
/* 
@media only screen and (max-width: 500px){
  nav .menu-item .sub-menu {
  position: absolute;
  background-color: #142d49;
  top: calc(100% + 18px);
  left: -25%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
  }
} */

nav .menu-item .sub-menu {
  position: absolute;
  background-color: #142d49;
  top: calc(100% + 18px);
  left: -25%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}


</style>