<template>
  <div class="bloedprikken">
    <div v-for="page in pages" :key="page.Id">
      <div v-if="page.Id == 2">
        <div v-for="media in page.Media" :key="media.Id">
          <div v-if="media.Type == 'image'">
            <img :class="['img-' + media.Location]" :src="media.Path" />
          </div>
          <div v-if="media.Type == 'video'">
            <span
              :class="['vid-' + media.Location]"
              v-html="media.Video_HTML"
            ></span>
          </div>
          <div v-else>
            <p :class="['txt-' + media.Location]">{{ media.Content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, onMounted, ref } from "vue";
import axios from "axios";

var pages = ref([]);

function fetchContent() {
  const baseURI = "http://localhost:3000/pages";
  axios.get(baseURI).then((result) => {
    pages.value = result.data;
  });
}

const emit = defineEmits(["switchPage"]);

onMounted(() => {
  fetchContent();
  emit("switchPage", "bloedprikken");
});
</script>