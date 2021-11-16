<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const emit = defineEmits(["value-change"]);

const props = defineProps<{
  compText: string;
  index: number;
}>();

let tempText = ref(props.compText);
let showEditor = ref(false);

function confirmChanges(): void {
  emit("value-change", tempText.value, props.index);
}

function toggleEditor(): void {
  showEditor.value = !showEditor.value;
}
function testState() {
  console.log(props.compText);
}
</script>

<template>
  <h3 @click="toggleEditor">{{ compText }}</h3>
  <div v-show="showEditor">
    <br />
    <textarea v-model="tempText" cols="50" rows="10"></textarea>
    <br />
    <button @click="confirmChanges()">Confirm changes</button>
  </div>
  <br />
  <button @click="testState">Test Child Component State</button>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  height: 100px;
}
</style>
