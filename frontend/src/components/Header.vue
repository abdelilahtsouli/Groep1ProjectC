
<template>
  <nav class="header">
    <img class="starshl" src="../assets/images/logo.png" />
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
}

@media only screen and (min-width: 750px) and (max-width: 1000px) {
  .starshl {
    width: 40% !important;
    height: 40% !important;
    display: flex;
    padding: 0px;
  }
}
.starshl {
  height: 55px;
  display: flex;
  padding: 0px;
  float: center;
}
</style>