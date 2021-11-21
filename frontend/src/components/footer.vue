<template>
  <div>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <nav class="footer">
      <router-link to="/Home" class="nav__link">
        <i class="material-icons nav__icon">home</i>
        <a @click="w3_close(); sidebar_close()" class="nav__text">Home</a>
      </router-link>
      <router-link to="/Bloedprikken" class="nav__link nav__link--active">
        <i class="material-icons nav__icon">vaccines</i>
        <a @click="w3_close(); sidebar_close()" class="nav__text">Info</a>
      </router-link>
      <div class="w3-button w3-teal w3-xlarge" @click="w3_open(); sidebar_close()">
        <div class="MenuButton">
          <i class="material-icons nav__icon">menu</i>
          <span class="nav__text">Menu</span>
        </div>
      </div>
      <router-link v-if="loggedIn" to="/" class="nav__link">
        <i class="material-icons nav__icon">lock</i>
        <a @click="w3_close(); sidebar_close()" class="nav__text">Admin</a>
      </router-link>
      <router-link v-if="!loggedIn" to="/login" class="nav__link">
        <i class="material-icons nav__icon">lock</i>
        <a @click="w3_close(); sidebar_close()" class="nav__text">Admin</a>
      </router-link>
      <div to="" class="nav__link" @click="sidebar_open(); w3_close()">
        <i class="material-icons nav__icon">settings</i>
        <a @click="w3_close(); sidebar_close()" class="nav__text">Settings</a>
      </div>
    </nav>
    <transition name="fade">
      <div class="UnderBar" style="display: none" id="myUnderbar">
        <i
          @click="w3_close()"
          class="material-icons nav__icon w3-bar-item w3-large exitButton"
          >close</i
        >
        <router-link class="menu-buttons" @click="w3_close()" to="/Bloedprikken"
          ><a><h4 class="menu-text">Bloedprikken</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="w3_close()" to="/Urineonderzoek"
          ><a><h4 class="menu-text">Urine onderzoek</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="w3_close()" to="/Locaties"
          ><a><h4 class="menu-text">Locaties</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="w3_close()" to="/Openingstijden"
          ><a><h4 class="menu-text">Openingstijden</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="w3_close()" to="/Veelgesteldevragen"
          ><a><h4 class="menu-text">Veelgestelde vragen</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="w3_close()" to="/Contact"
          ><a><h4 class="menu-text">Contact</h4></a></router-link
        >
        <router-link v-if="loggedIn" @click="w3_close()" class="menu-buttons" to="/createNewUser"
          ><a><h4 class="menu-text">Nieuw account aanmaken</h4></a></router-link
        >
        <router-link v-if="loggedIn" @click="w3_close();logOut();" class="menu-buttons" :to="`/${activePage}`"
          ><a><h4 class="menu-text">Uitloggen</h4></a></router-link
        >
      </div>
    </transition>
    <transition name="fade-sidebar">
      <div class="SideBar" style="display: none" id="mySidebar">
        <i
          @click="sidebar_close()"
          class="material-icons nav__icon w3-bar-item w3-large exitButton-sidebar"
          >close</i
        >
        <div class="menu-buttons-sidebar icon" v-if="loggedIn" v-html="profileSVG"></div>
        <div class="menu-buttons-sidebar" v-if="loggedIn"><a><h6 class="menu-text-sidebar">Welkom user</h6></a></div>
        <router-link class="menu-buttons-sidebar" @click="sidebar_close()" to="/Bloedprikken"
          ><a><h4 class="menu-text-sidebar">Bloedprikken</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="sidebar_close()" to="/Urineonderzoek"
          ><a><h4 class="menu-text-sidebar">Urine onderzoek</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="sidebar_close()" to="/Locaties"
          ><a><h4 class="menu-text-sidebar">Locaties</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="sidebar_close()" to="/Openingstijden"
          ><a><h4 class="menu-text-sidebar">Openingstijden</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="sidebar_close()" to="/Routeplanner"
          ><a><h4 class="menu-text-sidebar">Routeplanner</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="sidebar_close()" to="/Contact"
          ><a><h4 class="menu-text-sidebar">Contact</h4></a></router-link
        >
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { isNodeEmpty } from "@tiptap/core";
import { VueCookieNext } from 'vue-cookie-next'
import { defineComponent, ref,defineProps } from "vue";
import router from '../router'
export default defineComponent({
  name: "Footer",
  props: {
    activePage: String,
    loggedIn: Boolean
  },

  setup(props, { emit }) {
    
    function w3_open() {
      document.getElementById("myUnderbar").style.display = "block";
    }
    function sidebar_open() {
      document.getElementById("mySidebar").style.display = "block";
    }
    function sidebar_close() {
      document.getElementById("mySidebar").style.display = "none";
    }
    function w3_close() {
      document.getElementById("myUnderbar").style.display = "none";
    }
    function logOut(){
      VueCookieNext.removeCookie("token")
      emit("logOut")


    }
    const profileSVG = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path></svg>`;
    const isOpen = ref(false);
    function emitActivePage(pageName: string): void {
      emit("switchPage", pageName);
    }
    return {
      w3_open,
      w3_close,
      emitActivePage,
      isOpen,
      logOut,
      sidebar_open,
      sidebar_close,
      profileSVG
    };
  },
});
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  /* box-shadow: 0 0 3px rgba(0, 0, 0, 0.2); */
  background-color: var(--white);
  overflow-x: auto;
  opacity: 100;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* box-shadow: 0 -6px 6px -2px rgba(0, 0, 0, 0.5); */
  box-shadow: 0 -6px 15px -2px rgba(112, 128, 144, 0.5);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

:root {
  --darkRed: #ad0303;
  --White: #ffffff;
  --Grey: #8796a8;
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}
/* .nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 55px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    background-color: var(--White);
    overflow-x: auto;
    overflow: hidden;
} */

.nav__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 50px;
  width: 20vw;
  overflow: hidden;
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 13px;
  color: var(--Grey);
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.1s ease-in-out;
}
.nav--link.active,
.nav__link:hover {
  color: var(--light-red);
  background-color: var(--white);
}

.navMenu {
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 40px;
  width: 20vw;
  overflow: hidden;
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 13px;
  color: var(--grey);
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.1s ease-in-out;
  color: var(--darkRed);
  background-color: var(--White);
}
.menu-text {
  display: flex;
  position: relative;
  justify-content: center;
  color: white;
}
.menu-buttons {
  position: relative;
  top: 3%;
  width: 100%;
  height: 15%;
  display: inline-block;
  outline: none;
  z-index: 1;
  /* text-align: center;
    position: relative;
    top: 10%;
    display: inline-block;
    width: 100%;
    outline: none;
    background-color: transparent;
    border: 2px solid var(--dark-blue);
    height: 15%;
    z-index: -1; */
}

.exitButton {
  position: fixed;
  right: 0;
  font-size: 50px !important;
  z-index: 2;
}
.MenuButton {
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 40px;
  width: 20vw;
  overflow: hidden;
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 13px;
  color: #00408f;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.1s ease-in-out;
}

.navMenu.active,
.navMenu:hover {
  color: (--darkRed);
  background-color: var(--White);
}
.nav__icon {
  font-size: 18px;
}

.menu-item {
  background-color: #142d49;
  margin: auto;
  width: 50%;
}
.UnderBar {
  animation: fadeIn 0.5s;
  -webkit-animation: fadeIn 0.5s;
  -moz-animation: fadeIn 0.5s;
  -o-animation: fadeIn 0.5s;
  -ms-animation: fadeIn 0.5s;
  background-color: var(--dark-blue);
  position: fixed;
  bottom: 55px;
  width: 100%;
  height: 50%;
  z-index: 3;
  overflow-x: auto;
  opacity: 90%;
  border-radius: 15px 15px 0px 0px;
}
.menu-text-sidebar {
  display: flex;
  position: relative;
  justify-content: center;
  color: white;
}
.menu-buttons-sidebar {
  position: relative;
  top: 15%;
  width: 100%;
  height: 10%;
  display: inline-block;
  outline: none;
  z-index: 1;
  /* text-align: center;
    position: relative;
    top: 10%;
    display: inline-block;
    width: 100%;
    outline: none;
    background-color: transparent;
    border: 2px solid var(--dark-blue);
    height: 15%;
    z-index: -1;*/
}


.exitButton-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  font-size: 50px !important;

} 


.SideBar{
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
  -moz-animation: fadeIn 1s;
  -o-animation: fadeIn 1s;
  -ms-animation: fadeIn 1s;
  background-color: var(--dark-blue);
  position: fixed;
  bottom: 55px;
  width: 60%;
  right: 0;
  height: 100%;
  z-index: 3;
  overflow-x: auto;
  opacity: 90%;
  border-radius: 15px 15px 0px 0px;
}
.icon{
  position: relative;
  left: 40%;
  height: 50px;
  width: 50px;
  color: white;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}

@-moz-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}

@-o-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}

@-ms-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
}



</style>

