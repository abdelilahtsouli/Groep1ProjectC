<template>
  <div>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <nav class="footer">
      <!-- Home -->
      <router-link
        to="/Home"
        class="nav__link"
        :class="{ 'active-item': activePage === 'home' }"
      >
        <i class="material-icons nav__icon">home</i>
        <a @click="close_menu(); close_sidebar(); setActivePage('home')" class="nav__text">Home</a>
      </router-link>

      <!-- Bloedprikken -->
      <router-link
        to="/Bloedprikken"
        class="nav__link nav__link--active"
        :class="{ 'active-item': activePage === 'bloedprikken' }"
      >
        <i class="material-icons nav__icon">vaccines</i>
        <a @click="close_menu(); close_sidebar(); setActivePage('bloedprikken')" class="nav__text">Info</a>
      </router-link>

      <!-- Menu -->
      <div
        class="w3-button w3-teal w3-xlarge"
        @click="toggle_menu()"
        :class="{ 'active-item': menuOpen }"
      >
        <div class="MenuButton">
          <i class="material-icons nav__icon">menu</i>
          <span class="nav__text">Menu</span>
        </div>
      </div>

      <!-- Admin -->
      <router-link
        v-if="!loggedIn"
        to="/login"
        class="nav__link"
        :class="{ 'active-item': activePage === 'admin' }"
      >
        <i class="material-icons nav__icon">lock</i>
        <a  @click="close_menu(); close_sidebar(); setActivePage('admin')" class="nav__text">Admin</a>
      </router-link>
      <router-link
        v-if="loggedIn"
        to="/"
        class="nav__link"
        :class="{ 'active-item': activePage === 'admin' }"
      >
        <i class="material-icons nav__icon">lock</i>
        <a  @click="close_menu(); close_sidebar(); setActivePage('admin')" class="nav__text">Admin</a>
      </router-link>

      <!-- Settings -->
      <div
        class="nav__link"
        @click="toggle_sidebar()"
        :class="{ 'active-item': activePage === 'settings' }"
      >
        <i class="material-icons nav__icon">settings</i>
        <a class="nav__text">Settings</a>
      </div>
    
    </nav>
    <transition name="fade">
      <div class="UnderBar" style="display: none" id="underbar">
        <i
          @click="close_menu()"
          class="material-icons nav__icon w3-bar-item w3-large exitButton"
          >close</i
        >
        <router-link class="menu-buttons" @click="close_menu()" to="/Bloedprikken"
          ><a><h4 class="menu-text">Bloedprikken</h4></a></router-link
        >
        <router-link
          class="menu-buttons"
          @click="close_menu()"
          to="/Urineonderzoek"
          ><a><h4 class="menu-text">Urine onderzoek</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="close_menu()" to="/Location"
          ><a><h4 class="menu-text">Locaties</h4></a></router-link
        >
        <router-link
          class="menu-buttons"
          @click="close_menu()"
          to="/Openingstijden"
          ><a><h4 class="menu-text">Openingstijden</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="close_menu()" to="/Veelgesteldevragen"
          ><a><h4 class="menu-text">Veelgestelde vragen</h4></a></router-link
        >
        <router-link class="menu-buttons" @click="close_menu()" to="/Contact"
          ><a><h4 class="menu-text">Contact</h4></a></router-link
        >
        <router-link
          v-if="loggedIn && isSuperUser"
          @click="close_menu()"
          class="menu-buttons"
          to="/createNewUser"
          ><a><h4 class="menu-text">Nieuw account aanmaken</h4></a></router-link
        >
        <router-link
          v-if="loggedIn"
          @click="
            close_menu();
            logout();
          "
          class="menu-buttons"
          :to="`/home`"
          ><a><h4 class="menu-text">Uitloggen</h4></a></router-link
        >

      </div>
    </transition>
    <transition name="fade-sidebar">
      <div class="SideBar" style="display: none" id="sidebar">
        <i
          @click="close_sidebar()"
          class="material-icons nav__icon w3-bar-item w3-large exitButton-sidebar"
          >close</i
        >
        <!-- 
          profileSVG does not exist.
          <div class="menu-buttons-sidebar icon" v-if="loggedIn" v-html="profileSVG"></div>
        -->
        <div class="menu-buttons-sidebar" v-if="loggedIn"><a><h6 class="menu-text-sidebar">Welkom user</h6></a></div>
        <router-link class="menu-buttons-sidebar" @click="close_sidebar()" to="/Bloedprikken"
          ><a><h4 class="menu-text-sidebar">Bloedprikken</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="close_sidebar()" to="/Urineonderzoek"
          ><a><h4 class="menu-text-sidebar">Urine onderzoek</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="close_sidebar()" to="/Location"
          ><a><h4 class="menu-text-sidebar">Locaties</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="close_sidebar()" to="/Openingstijden"
          ><a><h4 class="menu-text-sidebar">Openingstijden</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="close_sidebar()" to="/Routeplanner"
          ><a><h4 class="menu-text-sidebar">Routeplanner</h4></a></router-link
        >
        <router-link class="menu-buttons-sidebar" @click="close_sidebar()" to="/Contact"
          ><a><h4 class="menu-text-sidebar">Contact</h4></a></router-link
        >
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { VueCookieNext } from "vue-cookie-next";
import bus from "../bus";

export default defineComponent({
  setup() {
    const menuOpen = ref(false);
    const sidebarOpen = ref(false);
    const activePage = ref("home");

    const loggedIn = ref(false);
    const isSuperUser = ref(false);

    function setActivePage(page: string) {
      activePage.value = page;
    }

    // Toggle, open or close the menu.
    function toggle_menu() {
      if (menuOpen.value) close_menu();
      else open_menu(); close_sidebar();
    }

    function open_menu() {
      menuOpen.value = true;
      document.getElementById("underbar")!.style.display = "block";
    }

    function close_menu() {
      menuOpen.value = false;
      document.getElementById("underbar")!.style.display = "none";
    }

    // Toggle, open or close the sidebar.
    function toggle_sidebar(){
      if (sidebarOpen.value) close_sidebar();
      else open_sidebar(); close_menu();
    }
    
    function open_sidebar() {
      sidebarOpen.value = true;
      document.getElementById("sidebar")!.style.display = "block";
    }

    function close_sidebar() {
      sidebarOpen.value = false;
      document.getElementById("sidebar")!.style.display = "none";
    }

    function logout() {
      bus.emit("sessionModify", {
        "loggedIn": false,
        "superUser": false
      });

      VueCookieNext.removeCookie("token");
      VueCookieNext.removeCookie("superUser");
    }

    bus.on("sessionModify", (data: any) => {
      loggedIn.value = data.loggedIn;
      isSuperUser.value = data.superUser;
    });

    return {
      menuOpen,
      sidebarOpen,
      activePage,
      loggedIn,
      isSuperUser,
      setActivePage,
      open_menu,
      close_menu,
      toggle_menu,
      logout,
      open_sidebar,
      close_sidebar,
      toggle_sidebar
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

