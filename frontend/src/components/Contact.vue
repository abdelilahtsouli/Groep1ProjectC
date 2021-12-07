<template>
  <div>
    <div class="white-space-top"></div>
    <div class="header-contact">
      <div class="contact">
        <img src="../assets/images/stock-img-smiling-chemists.jpg" />
        <h1>Contact</h1>
      </div>
      <div class="content">
        <div class="content-header">
          <h2><b>Klantcontactcentrum</b></h2>
        </div>
        <p>
          Heeft u vragen?
          <a href="/#/Veelgesteldevragen">Bekijk dan de veelgestelde vragen</a>.
          Vindt u daar geen antwoord op uw vraag? Neem dan contact op met het
          Klantcontactcentrum (telefoonnummer
          <a href="tel:088 020 95 55>">088 020 95 55</a>, geopend op werkdagen
          van 8.00 uur tot 17.30 uur)
        </p>
        <p>
          Wegens een verhoogd aantal telefoontjes kan de wachttijd oplopen. Wij
          adviseren u in de middag te bellen, dan is het doorgaans minder druk.
          Aanvullende informatie rondom Corona Moet u bloed laten prikken of
          heeft u een afspraak voor onderzoek, en heeft u recent klachten van
          hoesten of benauwdheid of koorts, stel uw bezoek dan uit totdat u
          volledig hersteld bent. Twijfelt u of u kunt komen of wilt u uw
          afspraak verzetten, belt u dan met het Klantcontactcentrum via
          telefoonnummer <a href="tel:088 020 95 55">088 020 95 55</a>.
        </p>
        <div class="content-header">
          <h2><b>Klachten en suggesties</b></h2>
        </div>
        <p>
          Star-shl wil u altijd goed en snel van dienst zijn. Verloopt onze
          dienstverlening toch niet helemaal zoals u wenst? Laat ons dat dan
          weten. Dan zoeken wij, samen met u, naar een oplossing.
        </p>
      </div>
    </div>
  </div>
  <div class="white-space-bottom"></div>
</template>

<script setup>
import { defineEmits, onMounted } from "vue";

const emit = defineEmits(["switchPage", "userLoggedIn"]);

onMounted(() => {
  emit("switchPage", "Contact");
  if (document.cookie != "") {
    emit("userLoggedIn", true);
  }
});
</script>

<style>
.header-contact .content {
  margin: 10px;
}
.header-contact {
  text-align: center;
}
.contact {
  position: relative;
  width: 100%;
  height: 50vw;
  z-index: 0;
}
.contact img {
  width: 100%;
  height: 50vw;
  object-fit: cover;
  object-position: -20% 0;
  border-radius: 8px;
  z-index: 1;
  
}
.contact h1 {
  color: white;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.header-contact {
  /* margin-bottom: 80px; */
}
.content a {
  color: #e7334c !important;
  text-decoration: none;
}
</style>
