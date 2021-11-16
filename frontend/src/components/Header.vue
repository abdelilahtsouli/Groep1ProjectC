<template>
    <nav>
        <a href="/"><img class= "starshl" src="../assets/logo.png"></a>
        <div class="menu-item"><a href="#">Home</a></div>
        <div class="menu-item"><a href="#">Bloedprikken</a></div>
        <HeaderDropdown title="Contact" :items="services" />
        <div class="menu-item"><a href="#">Afspraak maken</a></div>
    </nav>
</template>

<script lang = "ts">
import HeaderDropdown from './HeaderDropdown.vue'
export default {
  components: { HeaderDropdown },
    name: 'Header',
    data () {
        return {
            services: [
            {
                title: 'Contact met ons opnemen',
                link: '#'
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
}

.starshl {
    max-width: 180px;
    max-height: 40px;
    width: 100%;
    height: 100%;
}
nav .menu-item {
    color: rgb(244, 244, 255);
    padding: 10px 20px;
    position: relative;
    text-align: center;
    border-bottom: 3px solid transparent;
    display: flex;
    transition: 0.4s
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