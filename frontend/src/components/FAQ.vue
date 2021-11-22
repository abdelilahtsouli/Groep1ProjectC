<template>
  <div>
    <div class="white-space-top"></div>
    <div class="header-faq">
      <img src="../assets/images/corona.png" />
      <h1>Veelgesteldevragen</h1>
    </div>
    <div class="content-faq">
      <p>
        Op deze pagina vindt u veelgestelde vragen, onder andere over het
        coronavirus in relatie tot Star-shl. Voor algemene vragen over corona
        verwijzen wij u naar de
        <a href="https://www.rivm.nl/coronavirus-covid-19/actueel"
          >website van het RIVM</a
        >.
      </p>
      <h1>Onderzoeken</h1>

      <div class="Cards-FAQ">
        <div class="Card-FAQ">
          <h5>
            Wat zijn de coronamaatregelen op de locaties van Star-shl?
          </h5>
        </div>
        <div class="card-collapse">
          <div class="card-body">
              <p>
                Star-shl blijft de anderhalve meter afstand handhaven. Op onze
                locaties komen mensen met een kwetsbare gezondheid. Het afstand
                houden beschermt deze patiënten tegen risico op overdracht van
                Covid-19. Daarnaast willen we voorkomen dat medewerkers besmet
                raken en niet kunnen werken.
              </p>
              <p>
                Mondkapjes zijn vanaf heden verplicht in publieke
                ruimtes. We vragen patiënten daarom dringend een zelf
                meegebracht mondkapje te dragen op de locaties van Star-shl.
                Star-shl volgt hierin het beleid van de Rijksoverheid. Onze
                medewerkers maken gebruik van een mondneusmasker en
                handschoenen.
              </p>
              <p>Wij danken u voor uw medewerking!</p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.header-faq {
  position: relative;
  width: 100%;
  height: 50vw;
  z-index: 1;
}

.header-faq img {
  width: 100%;
  height: 50vw;
  object-fit: cover;
  object-position: -20% 0;
  border-radius: 8px;
  z-index: 0;
}
.header-faq h1 {
  position: absolute;
  color: white;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.content-faq {
  text-align: center;
}
.content-faq a {
  color: #e7334c !important;
  text-decoration: none;
}
.Card-FAQ {
    margin-left: 18px;
    width: 90%;
    height: 50px;
    background-color: var(--dark-blue);
    border-radius: 8px;
    
}
.Card-FAQ h5{
    position: relative;
    top: 10%;
    width: 100%;
    text-align: center;
    color: white;
}
</style>
