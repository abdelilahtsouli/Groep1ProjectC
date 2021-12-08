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
      <div class="row">
        <div class="col">
          <div class="tabs">
            <div class="tab">
              <input type="checkbox" id="chck1" />
              <label class="tab-label" for="chck1"
                >Wat zijn de coronamaatregelen op de locaties van
                Star-shl?</label
              >
              <div class="tab-content">
                <p>
                  Star-shl blijft de anderhalve meter afstand handhaven. Op onze
                  locaties komen mensen met een kwetsbare gezondheid. Het
                  afstand houden beschermt deze patiënten tegen risico op
                  overdracht van Covid-19. Daarnaast willen we voorkomen dat
                  medewerkers besmet raken en niet kunnen werken.
                </p>
                <p>
                  Mondkapjes zijn vanaf heden verplicht in publieke ruimtes. We
                  vragen patiënten daarom dringend een zelf meegebracht
                  mondkapje te dragen op de locaties van Star-shl. Star-shl
                  volgt hierin het beleid van de Rijksoverheid. Onze medewerkers
                  maken gebruik van een mondneusmasker en handschoenen.
                </p>
                <p>Wij danken u voor uw medewerking!</p>
              </div>
            </div>
            <div class="tab">
              <input type="checkbox" id="chck2" />
              <label class="tab-label" for="chck2"
                >Waar en wanneer kan ik terecht voor een onderzoek?</label
              >
              <div class="tab-content">
                Star-shl blijft de anderhalve meter afstand handhaven. Op onze
                locaties komen mensen met een kwetsbare gezondheid. Het afstand
                houden beschermt deze patiënten tegen risico op overdracht van
                Covid-19. Daarnaast willen we voorkomen dat medewerkers besmet
                raken en niet kunnen werken. Mondkapjes zijn vanaf 6 november
                2021 verplicht in publieke ruimtes. We vragen patiënten daarom
                dringend een zelf meegebracht mondkapje te dragen op de locaties
                van Star-shl. Star-shl volgt hierin het beleid van de
                Rijksoverheid. Onze medewerkers maken gebruik van een
                mondneusmasker en handschoenen. Wij danken u voor uw
                medewerking!
              </div>
            </div>
            <div class="tab">
              <input type="checkbox" id="chck3" />
              <label class="tab-label" for="chck3"
                >Waar kan ik urine, ontlasting en/of overig materiaal
                inleveren?</label
              >
              <div class="tab-content">
                U kunt dit tijdens openingstijden inleveren op een van de
                locaties voor bloedafname. U heeft hier geen afspraak voor
                nodig. Kom niet naar een locatie als u luchtwegklachten heeft.
              </div>
            </div>
            <div class="tab">
              <input type="checkbox" id="chck4" />
              <label class="tab-label" for="chck4"
                >Moet ik een mondkapje dragen op een locatie van
                Star-shl?</label
              >
              <div class="tab-content">
                Mondkapjes zijn vanaf 6 november 2021 verplicht in publieke
                ruimtes. We vragen patiënten daarom dringend een zelf
                meegebracht mondkapje te dragen op de locaties van Star-shl.
                Star-shl volgt hierin het beleid van de Rijksoverheid. Onze
                medewerkers maken gebruik van een mondneusmasker en
                handschoenen.
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>
        Mondkapjes zijn vanaf 6 november 2021 verplicht in publieke ruimtes. We
        vragen patiënten daarom dringend een zelf meegebracht mondkapje te
        dragen op de locaties van Star-shl. Star-shl volgt hierin het beleid van
        de Rijksoverheid. Onze medewerkers maken gebruik van een mondneusmasker
        en handschoenen.
      </p>
    </div>
    <div></div>
  </div>
</template>

<style>
.header-faq {
  position: relative;
  width: 100%;
  height: 50vw;
  z-index: 0;
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
  margin-bottom: 65px;
}
.content-faq a {
  color: #e7334c !important;
  text-decoration: none;
}

.tab input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.row {
  display: flex;
}
.row .col {
  flex: 1;
}
.row .col:last-child {
  /* margin-left: 1em; */
  /* margin: 0 10px; */
  margin: 0 10px 5px 10px;
}

/* Accordion styles */
.tabs {
  border-radius: 8px;
  overflow: hidden;
  /* box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 6px 6px -2px rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 6px 6px -2px rgba(112, 128, 144, 0.5); */
  box-shadow: 0 6px 15px -2px rgba(112, 128, 144, 0.5);
}
.tab {
  background: var(--dark-blue);
  width: 100%;
  color: white;
  overflow: hidden;
}
.tab-label {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: var(--background-mask);
  font-weight: bold;
  cursor: pointer;
  /* border-bottom: 1px solid grey; */
  /* Icon */
}

/* .tab-label:hover {
  background: #1a252f;
} */

.tab-label::after {
  content: "\276F";
  width: 1em;
  height: 1em;
  text-align: center;
  /* transition: all 0.35s; */
  transition: all 1s ease;
}

.tab-content {
  max-height: 0;
  padding: 0 1em;
  color: var(--background-mask);
  background: var(--background-mask);
  /* transition: all 0.35s; */
  /* transition: all 0.5s ease; */
  transition: all 1s ease;
}

.tab-content li {
  margin: 5px 0;
  /* text-align: left; */
}

.tab-close {
  display: flex;
  justify-content: flex-end;
  padding: 1em;
  font-size: 0.75em;
  background: var(--background-mask);
  cursor: pointer;
  /*  */
  transition: all 1s ease;
}
/* .tab-close:hover {
  background: #1a252f;
} */

/* input:checked + .tab-label {
  background: #1a252f;
} */
input:checked + .tab-label::after {
  transform: rotate(90deg);
}
input:checked ~ .tab-content {
  max-height: 100vh;
  padding: 1em;
}
</style>
