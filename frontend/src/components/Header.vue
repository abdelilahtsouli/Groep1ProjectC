<template>
  <div>
    <nav class="header">
      <router-link to="/#/Home">
      <!-- <img class="img" src="../assets/images/star-shl-logo-kleur.png" /> -->
      <img
        class="img"
        src="../assets/images/star-shl-logo-kleur-diapositief.png"
      />
      </router-link>
    </nav>
  </div>
</template>

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
