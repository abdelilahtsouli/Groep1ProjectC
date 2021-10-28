<template>
  <div v-if="editor">
    <button
      @click="editor.chain().focus().setCSSFloat('left').run()"
      :class="{ 'is-active': editor.isActive({ cssFloat: 'left' }) }"
    >
      left
    </button>
    <button
      @click="editor.chain().focus().setCSSFloat('right').run()"
      :class="{ 'is-active': editor.isActive({ cssFloat: 'right' }) }"
    >
      right
    </button>
    <button @click="addImage">add image from URL</button>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import CSSFloat from "../extensions/extension-css-float";

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    };
  },

  methods: {
    addImage() {
      const url = window.prompt("URL");

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
        CSSFloat.configure({ types: ["image"] }),
      ],
      content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img style="float: right" src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
        <img src="https://source.unsplash.com/K9QHL52rE2k/800x400" />
      `,
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
.is-active {
  background: #0d0d0d;
  color: #fff;
}
</style>