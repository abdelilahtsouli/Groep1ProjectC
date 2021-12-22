<template>
  <div class="white-space-top"></div>
    <div class="img-field">
        <img src="../assets/images/fotolaborant.jpg" class="img-banner">
        <h1 class="header-text">Urineonderzoek</h1>
    </div>
  <page-content :id="6"></page-content> 
  <div class="white-space-bottom"></div>
</template>
<script lang="ts">
import PageContent from "../components/PageContent.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    PageContent,
  },
});
</script>

<style>
.img-field{
    position: relative;
    text-align: center;
    margin-bottom: 0px;
}
.img-banner{
    width: 100%;
    height: 50vw;
    border-radius: 8px;
}
.header-text{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>