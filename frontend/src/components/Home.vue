<template>
  <div class="home">
    <div v-for="page in pages" :key="page.Id">
      <div v-if="page.Id == 1">
        <div v-for="media in page.Media" :key="media.Id">
        <div v-if="media.Type == 'image'">
          <img :class="['img-' + media.Location]" :src="media.Path" />
        </div>
        <div v-if="media.Type == 'video'">
          <span :class="['vid-' + media.Location]" v-html="media.Video_HTML"></span>
        </div>
        <div v-else>
          <h1 :class="['txt-' + media.Location]">{{ media.Content }}</h1>
        </div>
      </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch, watchEffect, defineEmits } from 'vue';
import axios from 'axios'
import {defineProps} from 'vue';


const props = defineProps<{cookie : any}>();
var pages = ref([])
const emit = defineEmits(['newCookieValue']) 

watchEffect(() => emit("newCookieValue", props.cookie))

onMounted(() => {
  const baseURI = 'http://localhost:3000/pages'
  axios.get(baseURI)
  .then((result) => {
    pages.value = result.data
  })
})

</script>

<style>

.bloedprikken {
  white-space: pre-wrap;
}

.img-left {
  float: left;
  margin: 50px;
  position: relative;
  left: 0%
}

.img-right {
  float: right;
  margin: 50px;
  position: relative;
  right: 0%
}

.vid-left {
  float: left;
  margin: 50px;
}

.vid-right {
  float: right;
  margin: 50px;
}

.txt-left {
  float: left;
  text-align: left;
  margin: 50px;
}

.txt-right {
  float: right;
  text-align: right;
  margin: 50px;
}


</style>
