
<template>
  <div>
    <nav class="header">
      <!-- <img class="img" src="../assets/images/star-shl-logo-kleur.png" /> -->
      <img
        class="img"
        src="../assets/images/star-shl-logo-kleur-diapositief.png"
      />
    </nav>
  </div>
</template>

<script lang = "ts">
import axios from 'axios'
import HeaderDropdown from './HeaderDropdown.vue'
import { ref } from 'vue'
export default {
    components: {  },
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
                    title: 'Locaties',
                    link: 'location'
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

<style scoped>

.header {
  z-index: 100;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;
  background-color: var(--dark-blue);
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  /* box-shadow: 0 6px 6px -2px rgba(0, 0, 0, 0.5); */
  box-shadow: 0 6px 15px -2px rgba(112, 128, 144, 0.5);
  /* background-color: var(--white); */
}

/* @media only screen and (min-width: 750px) and (max-width: 1000px) {
  .header .img {
    width: 40% !important;
    height: 40% !important;
    display: flex;
    padding: 0px;
  }
} */
.header .img {
  height: 35px;
  padding: 0px;
  display: flex;
  /* background-color: var(--white); */
  background-color: var(--dark-blue);
  /* Not sure about the image styling if it is allowed */
  border-radius: 8px; 
}
</style>
