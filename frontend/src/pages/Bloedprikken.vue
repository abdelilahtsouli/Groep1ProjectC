<template>
  <div class="white-space-top"></div>
  <page-content :id="2" :isLoggedIn="isLoggedIn"></page-content>
  <div class="white-space-bottom"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PageContent from "../components/PageContent.vue";

export default defineComponent({
  components: {
    PageContent,
  },
  props: {
    isLoggedIn: Boolean,
  },
  emits: ["switchPage", "userLoggedIn"],
  setup(props, { emit }) {
    onMounted(() => {
      emit("switchPage", "bloedprikken");
      if (document.cookie != "") {
        emit("userLoggedIn", true);
      }
    });
    console.log(props.isLoggedIn);
  },

});
</script>

<style>
/* :root {
  --text-color: var(--dark-blue);
  --background-mask: var(--light-grey);
} */

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
  background: var(--background-mask);
  width: 100%;
  color: var(--text-color);
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
