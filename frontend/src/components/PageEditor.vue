<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, computed } from "vue";

// Standard Tiptap modules & extensions
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

// Custom Tiptap modules & extensions
// -- HTML Tags
import Video from "../extensions/extension-video";
import Source from "../extensions/extension-source";
// -- Styling CSS
import CSSFloat from "../extensions/extension-css-float";
// -- HTMLElement Attributes
import SourceSrc from "../extensions/extension-src-attr";
import SourceType from "../extensions/extension-type-attr";
import HeightAttr from "../extensions/extension-height-attr";
import WidthAttr from "../extensions/extension-width-attr";
import ControlsAttr from "../extensions/extension-controls-attr";
import ControlsListAttr from "../extensions/extension-controlslist-attr";

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
        // Standard extensions
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Image,
        // Custom extensions
        Video,
        Source,
        CSSFloat.configure({ types: ["image", "video"] }),
        SourceSrc.configure({ types: ["source"] }),
        SourceType.configure({ types: ["source"] }),
        HeightAttr.configure({ types: ["video"] }),
        WidthAttr.configure({ types: ["video"] }),
        ControlsAttr.configure({ types: ["video"] }),
        ControlsListAttr.configure({ types: ["video"] }),
      ],
      content: props.content,
    });

    onBeforeUnmount(() => {
      if (editor != null) {
        editor.destroy();
      }
    });

    const checkIfChangesMade = computed(function () {
      if (editor != null) {
        return props.content == editor.getHTML() ? false : true;
      } else {
        return true;
      }
    });

    function submit(): void {
      submitted = true;
      // console.log(props.content);
      // console.log(editor.getHTML());
      emit("changeContent", props.id, editor.getHTML());
    }

    function setFloatOnDrop(event: DragEvent) {
      console.log(event);

      if (event.pageX > window.innerWidth / 2) {
        // If Image
        editor.chain().focus().setCSSFloat("right").run();
        // If Text (paragraph, heading)
        editor.chain().focus().setTextAlign("right").run();
      } else {
        // If Image
        editor.chain().focus().setCSSFloat("left").run();
        // If Text (paragraph, heading)
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
    <!-- Editor Buttons -->
    <div v-if="editor">
      <!-- Text Editing Buttons -->
      <h3>Text buttons</h3>
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
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
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
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <!-- <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        blockquote
      </button> -->
      <button @click="editor.chain().focus().undo().run()">undo</button>
      <button @click="editor.chain().focus().redo().run()">redo</button>
      <!-- <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        bullet list
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        ordered list
      </button> -->
      <br />
      <br />

      <!-- Image editing buttons -->
      <h3>Image buttons</h3>
      <button @click="addImage">add image from URL</button>
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

/* .ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
} */

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  line-height: 1.1;
}

.ProseMirror img {
  /* max-width: 100%;
  height: auto; 
  margin-left: 10px;
  margin-right: 10px;  */
  margin-top: 0px;
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

.ProseMirror video.ProseMirror-selectednode {
  outline: 3px solid #68cef8;
}

.ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(13, 13, 13, 0.1);
}
</style>
