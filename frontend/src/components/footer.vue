<template>
    <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <nav class="nav">
            <router-link to="/Home" class="nav__link">
                <i class="material-icons nav__icon">home</i>
                <a class="nav__text">Home</a>
            </router-link>
            <router-link to="/Bloedprikken" class="nav__link nav__link--active">
                <i class="material-icons nav__icon">vaccines</i>
                <a class="nav__text">Info</a>
            </router-link>
            <!-- DROPUP -->
            <a class="navMenu">
                <i class="material-icons nav__icon">menu</i>
                <a class="nav__text">Menu</a>
            </a>
            <router-link to="/login" class="nav__link">
                <i class="material-icons nav__icon">lock</i>
                <a class="nav__text">Admin</a> 
            </router-link>
            <router-link to="/createNewUser" class="nav__link" @click="sideBar">
                <i class="material-icons nav__icon">settings</i>
                <a class="nav__text">Settings</a>
            </router-link>
        </nav>
    </div>
    
</template>

<script>
import router from "../router"
export default {
    name: 'Footer',

}
</script>

<style>
body {
    margin: 0 0 55px 0;
}

:root {
    --darkRed: #ad0303;
    --White: #ffffff;
    --Grey: #8796a8;
}



.nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 55px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    background-color: var(--White);
    overflow-x: auto;
    opacity: 100;
    z-index: 1;

}

.nav__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    min-width: 50px;
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
    color: var(--darkRed);
    background-color: var(--White);
}

.navMenu {
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    min-width: 40px;
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

</style>

