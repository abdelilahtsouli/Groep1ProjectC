<template>
  <div>
    <image-editor></image-editor>
    <text-editor
      v-for="medium in media"
      :key="medium.id"
      :id="medium.id"
      :content="medium.content"
      @changeContent="setNewContent"
    ></text-editor>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import TextEditor from "./components/TextEditor.vue";
// import TextEditor from "./components/BubbleEditor.vue";
import ImageEditor from "./components/ImageEditor.vue";

export default {
  components: {
    TextEditor,
    ImageEditor
  },

  data() {
    return {
      media: ref([
        {
          id: 0,
          content: `<h2 style="text-align: right">Bloedprikken</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
        },
      ]),
    };
  },

  methods: {
    setNewContent(id, newContent) {
      let medium = this.media.find((m) => m.id === id);
      medium.content = newContent;
    },
  },
};
</script>

<style scoped>
</style>