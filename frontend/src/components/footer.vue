<template>
  <div>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <nav class="footer">
      <router-link
        to="/Home"
        class="nav__link"
        :class="{ 'active-item': activePage === 'home' }"
      >
        <i class="material-icons nav__icon">home</i>
        <a @click="w3_close(); sidebar_close()" class="nav__text">Home</a>
      </router-link>
      <router-link
        to="/Bloedprikken"
        class="nav__link nav__link--active"
        :class="{ 'active-item': activePage === 'bloedprikken' }"
      >
        <i class="material-icons nav__icon">vaccines</i>
        <a @click="w3_close(); sidebar_close()" class="nav__text">Info</a>
      </router-link>
      <div
        class="w3-button w3-teal w3-xlarge"
        @click="w3_toggle()"
        :class="{ 'active-item': menuOpen }"
      >
        <div class="MenuButton">
          <i class="material-icons nav__icon">menu</i>
          <span class="nav__text">Menu</span>
        </div>
      </div>
      <router-link
        v-if="!loggedIn"
        to="/login"
        class="nav__link"
        :class="{ 'active-item': activePage === 'admin' }"
      >
        <i class="material-icons nav__icon">lock</i>
        <a  @click="w3_close(); sidebar_close()" class="nav__text">Admin</a>
      </router-link>
      <router-link
        v-if="loggedIn"
        to="/"
        class="nav__link"
        :class="{ 'active-item': activePage === 'admin' }"
      >
        <i class="material-icons nav__icon">lock</i>
        <a  @click="w3_close(); sidebar_close()" class="nav__text">Admin</a>
      </router-link>
      <div
        class="nav__link"
        @click="sidebar_toggle()"
        :class="{ 'active-item': activePage === 'settings' }"
      >
        <i class="material-icons nav__icon">settings</i>
        <a  class="nav__text">Settings</a>
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
        <router-link
          class="menu-buttons"
          @click="w3_close()"
          to="/Urineonderzoek"
          ><a><h4 class="menu-text">Urine onderzoek</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="w3_close()" to="/location"
          ><a><h4 class="menu-text">Locaties</h4></a></router-link
        >
        <router-link
          class="menu-buttons"
          @click="w3_close()"
          to="/Openingstijden"
          ><a><h4 class="menu-text">Openingstijden</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="w3_close()" to="/Veelgesteldevragen"
          ><a><h4 class="menu-text">Veelgestelde vragen</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="w3_close()" to="/Contact"
          ><a><h4 class="menu-text">Contact</h4></a></router-link
        >
        <router-link
          v-if="loggedIn && isSuperUser"
          @click="w3_close()"
          class="menu-buttons"
          to="/createNewUser"
          ><a><h4 class="menu-text">Nieuw account aanmaken</h4></a></router-link
        >
        <router-link
          v-if="loggedIn"
          @click="
            w3_close();
            logOut();
          "
          class="menu-buttons"
          :to="`/${activePage}`"
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
import { VueCookieNext } from "vue-cookie-next";
import { defineComponent, ref, defineProps } from "vue";
import router from "../router";
export default defineComponent({
  name: "Footer",
  props: {
    activePage: String,
    loggedIn: Boolean,
    isSuperUser: Boolean
  },

  setup(props, { emit }) {
    const menuOpen = ref(false);
    const sidebarOpen = ref(false);


    function w3_toggle() {
      if (menuOpen.value) w3_close();
      else w3_open(); sidebar_close();
    }
    function sidebar_toggle(){
      if (sidebarOpen.value) sidebar_close();
      else sidebar_open(); w3_close();
    }

    function w3_open() {
      menuOpen.value = true;
      document.getElementById("myUnderbar")!.style.display = "block";
    }

    function w3_close() {
      menuOpen.value = false;
      document.getElementById("myUnderbar")!.style.display = "none";
    }
    function logOut() {
      VueCookieNext.removeCookie("token");
      VueCookieNext.removeCookie("superUser");
      emit("logOut");
    }
    function sidebar_open() {
      sidebarOpen.value = true;
      document.getElementById("mySidebar")!.style.display = "block";
    }
    function sidebar_close() {
      sidebarOpen.value = false;
      document.getElementById("mySidebar")!.style.display = "none";
    }

    function emitActivePage(pageName: string): void {
      emit("switchPage", pageName);
    }
    return {
      menuOpen,
      w3_open,
      w3_close,
      w3_toggle,
      emitActivePage,
      logOut,
      sidebar_open,
      sidebar_close,
      sidebar_toggle
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

.footer .active-item {
  color: var(--light-red);
}

.MenuButton .active-item {
  color: var(--light-red) !important;
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
  color: var(--grey);
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
  color: var(--light-red);
  background-color: var(--white);
}
.menu-text {
  display: flex;
  position: relative;
  justify-content: center;
  color: var(--white);
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
  color: white;
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
  /* color: var(--dark-blue); */
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.1s ease-in-out;
}

.navMenu.active,
.navMenu:hover {
  color: (--darkRed);
  background-color: var(--white);
}
.nav__icon {
  font-size: 18px;
}

.menu-item {
  background-color: var(--dark-blue);
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
  color: white;
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

