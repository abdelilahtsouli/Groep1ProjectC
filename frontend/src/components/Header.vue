<template>
    <nav>
        <a href="/"><img class= "starshl" src="../assets/logo.png"></a>

        <router-link :key="item" v-for="item in pages" :to="'/page/' + item.Id" class="menu-item">
            <span>{{item.Name}}</span>
        </router-link>
        <HeaderDropdown title="Contact" :items="services" />

        <!--
        <router-link to="/page/1" class="menu-item"><a>Home</a></router-link>
        <router-link to="/page/2" class="menu-item"><a>Bloedprikken</a></router-link>
        <HeaderDropdown title="Contact" :items="services" />
        -->
    </nav>
</template>

<script lang = "ts">
import { ref } from 'vue';
import HeaderDropdown from './HeaderDropdown.vue'
import axios from "axios";

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
                    title: 'Info',
                    link: '#'
                },
                {
                    title: 'Locaties'
                }
            ]
        }
    },
    setup() {
        const pages = ref([]);

        axios.get("./api/pages")
        .then((response: any) => {
            pages.value = response.data;
        });

        return {
            pages
        };
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