<template>
  <div class="welcome">
      <div class="welcome-message">
          <h1>Welkom {{userName}}</h1>
      </div>
  </div>
</template>

<script lang="ts" setup>

import HelloWorld from "./HelloWorld.vue"
import { ref } from 'vue';
import axios from 'axios';

const userName = HelloWorld.response;
</script>

<style>

</style>