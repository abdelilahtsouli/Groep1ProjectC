<script setup lang="ts">
import { ref } from "vue";
import Text from "./components/Text.vue";

const allText = ref([
  {
    id: 0,
    content:
      "Bij bloedonderzoek nemen we een of meer buisjes bloed af met een hol naaldje. Dit bloed wordt vervolgens in het laboratorium onderzocht door een analist.",
  },
  {
    id: 1,
    content:
      "Bloedonderzoek of onderzoek van urine of ontlasting is nodig wanneer de huisarts of specialist meer te weten wil komen over uw gezondheid. De arts laat ook onderzoek doen om het verloop van ziekte en het effect van een behandeling te bepalen. ",
  },
]);

function changeValue(text: string, index: number) {
  allText.value[index].content = text;
}

function testState() {
  allText.value.forEach(function (value) {
    console.log(value);
  });
}
</script>

<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <br />
    <button @click="testState">Test Parent Component State</button>
    <Text
      v-for="textObj in allText"
      :key="textObj.id"
      :compText="textObj.content"
      :index="textObj.id"
      @value-change="changeValue"
    />
    <!-- <Text :compText="allText[1]" :index="1" @value-change="changeValue" /> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
