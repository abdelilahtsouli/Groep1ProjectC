
<template>
  <nav class="header">
    <!-- <img class="img" src="../assets/images/star-shl-logo-kleur.png" /> -->
    <img
      class="img"
      src="../assets/images/star-shl-logo-kleur-diapositief.png"
    />
  </nav>
</template>

<script lang = "ts">
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;
  background-color: var(--dark-blue);
  /* background-color: var(--white); */
}

@media only screen and (min-width: 750px) and (max-width: 1000px) {
  .header .img {
    width: 40% !important;
    height: 40% !important;
    display: flex;
    padding: 0px;
  }
}
.header .img {
  height: 35px;
  padding: 0px;
  display: flex;
  /* background-color: var(--white); */
  background-color: var(--dark-blue);
}
</style>