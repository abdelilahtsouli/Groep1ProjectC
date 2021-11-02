<script lang="ts">
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import CSSFloat from "../extensions/extension-css-float";
import { defineComponent, onBeforeUnmount, onMounted, computed } from "vue";

export default defineComponent({
  components: {
    EditorContent,
  },

  props: {
    id: Number,
    content: String,
  },

  setup(props, { emit }) {
    let submitted = false;

    const editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Image,
        CSSFloat.configure({ types: ["image"] }),
      ],
      content: props.content,
    });

    onBeforeUnmount(() => {
      if (editor != null) {
        editor.destroy();
      }
    });

    const checkIfChangesMade = computed(() => {
      if (editor != null) {
        return props.content == editor.getHTML() ? false : true;
      } else {
        return true;
      }
    });

    function submit(): void {
      submitted = true;
      emit("changeContent", props.id, editor.getHTML());
    }

    function setFloatOnDrop(event: DragEvent) {
      console.log(event);

      if (event.pageX > window.innerWidth / 2) {
        editor.chain().focus().setCSSFloat("right").run();
        editor.chain().focus().setTextAlign("right").run();
      } else {
        editor.chain().focus().setCSSFloat("left").run();
        editor.chain().focus().setTextAlign("left").run();
      }
    }

    function addImage() {
      const url = window.prompt("URL");

      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
    return {
      editor,
      submitted,
      checkIfChangesMade,
      submit,
      setFloatOnDrop,
      addImage,
      onMounted,
      onBeforeUnmount,
    };
  },
});
</script>

<template>
  <div>
    <!-- Text Editing Buttons -->

    <div v-if="editor">
      <button @click="addImage">add image from URL</button>
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
      <!-- Image editing buttons -->
      <br />
      <br />
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
      <button
        @click="editor.chain().focus().setCSSFloat('center').run()"
        :class="{ 'is-active': editor.isActive({ cssFloat: 'center' }) }"
      >
        center
      </button>
    </div>

    <!-- Editor -->
    <editor-content :editor="editor" @drop="setFloatOnDrop($event)" />

    <!-- Submit button -->
    <br />
    <br />
    <button @click="submit">Submit changes</button>
    <p v-if="checkIfChangesMade" :style="{ color: 'red' }">
      Changes are not saved
    </p>
    <p v-else :style="{ color: 'green' }">Up to date</p>
    <br />
  </div>
</template>

<style>
.ProseMirror > * + * {
  margin-top: 0.75em;
}

.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  line-height: 1.1;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
}
.ProseMirror img.ProseMirror-selectednode {
  outline: 3px solid #68cef8;
}

.ProseMirror hr {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, 0.1);
  margin: 2rem 0;
}

.is-active {
  background: #0d0d0d;
  color: #fff;
}
</style>
