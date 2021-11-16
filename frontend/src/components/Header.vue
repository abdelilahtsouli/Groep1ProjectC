<template>
    <nav>
        <a href="/"><img class= "starshl" src="../assets/logo.png"></a>
        <router-link to="/home" class="menu-item"><a>Home</a></router-link>
        <router-link to="/bloedprikken" class="menu-item"><a>Bloedprikken</a></router-link>
        <HeaderDropdown title="Contact" :items="services" />

    </nav>
</template>

<script lang = "ts">
import HeaderDropdown from './HeaderDropdown.vue'
import router from './router';
export default {
  components: { HeaderDropdown },
    name: 'Header',
    data () {
        return {
            services: [
            {
                title: 'Log in als Administrator',
                link: 'login'
            },
            {
                title: 'Vacatures',
                link: '#'
            },
            {
                title: 'PLACEHOLDER',
                link: '#'
            }
        ]
        }
    }
}
</script>

<style>
body{
  padding: 0px;
  margin: 0px;
}
nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background-color: #142d49;
    }
@media only screen and (min-width: 750px ) and ( max-width: 1000px){
    .starshl {

    width: 40% !important;
    height: 40% !important;
    display: flex;
    padding: 0px;
    }
}
.starshl {

    width: 100%;
    height: 100%;
    display: flex;
    padding: 0px;
}
nav .menu-item {
    color: rgb(255, 255, 255);
    padding: 5px 5px;
    position: relative;
    text-align: center;
    border-bottom: 3px solid transparent;
    display: flex;
    transition: 0.4s;
    font-size: 1em;

}

nav .menu-item.active,
nav .menu-item:hover {
    background-color:  #142d49;
    border-bottom-color: #FF5858;
}

nav .menu-item a {
    color: inherit;
    text-decoration: none;
}
</style>