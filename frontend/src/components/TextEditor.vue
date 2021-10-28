<template>
  <div>
    <!-- Buttons -->
    <div v-if="editor">
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        paragraph
      </button>
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
      >
        left
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
      >
        center
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
      >
        right
      </button>
    </div>
    <hr />

    <!-- Image -->
    <p
      :style="{
        float: 'left',
        margin: '0px 10px 0px 0px',
        position: 'relative',
        zIndex: '2',
      }"
    >
      <img
        contenteditable="true"
        :style="{ verticalAlign: 'middle' }"
        src="@\assets\logo.png"
        alt=""
      />
    </p>

    <!-- Text -->
    <editor-content :editor="editor" />

    <div>
      <br />
      <br />
      <button @click="submit">Submit changes</button>
      <p v-if="checkIfChangesMade" :style="{ color: 'red' }">
        Changes are not saved
      </p>
      <p v-else :style="{ color: 'green' }">Up to date</p>
      <br />
    </div>
  </div>
</template>


<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

export default {
  components: {
    EditorContent,
  },
  emits: ["changeContent"],
  props: {
    id: Number,
    content: String,
  },

  data() {
    return {
      editor: null,
      submitted: false,
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
      content: this.content,
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  computed: {
    checkIfChangesMade() {
      if (this.editor != null) {
        return this.content == this.editor.getHTML() ? false : true;
      } else {
        return true;
      }
    },
  },

  methods: {
    submit() {
      this.submitted = true;
      this.$emit("changeContent", this.id, this.editor.getHTML());
    },
  },
};
</script>

<style scoped>
.is-active {
  background: #0d0d0d;
  color: #fff;
}
</style>