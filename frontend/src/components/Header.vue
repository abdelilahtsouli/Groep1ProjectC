
<template>
    <nav>
        <a href="/"><img class= "starshl" src="../assets/logo.png"></a>
    </nav>
</template>

<script lang = "ts">

import { onMounted, ref } from 'vue';
import { watchEffect } from 'vue';
import router from './router';

export default {
    

    name: 'Header',
    data () {
        return {
            services: [
            {
                title: 'Info',
                link: '#'
            },
            {
                title: 'Locaties'
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

    width: 50%;
    height: 50%;
    display: flex;
    padding: 0px;
}

</style>