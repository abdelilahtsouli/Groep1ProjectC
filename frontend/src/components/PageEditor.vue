<script lang="ts">
import PageEditorHeader from "./PageEditorHeader.vue";
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
    PageEditorHeader,
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
      console.log(props.content);
      console.log(editor.getHTML());
      emit("changeContent", props.id, editor.getHTML());
    }

    function setFloatOnDrop(event: DragEvent) {
      console.log(event);

      if (event.pageX > window.innerWidth / 2) {
        editor.chain().focus().setTextAlign("right").run();
        editor.chain().focus().setCSSFloat("right").run();
      } else {
        editor.chain().focus().setTextAlign("left").run();
        editor.chain().focus().setCSSFloat("left").run();
      }
    }

    return {
      editor,
      submitted,
      checkIfChangesMade,
      submit,
      setFloatOnDrop,
      onMounted,
      onBeforeUnmount,
    };
  },
});
</script>

<template>
  <div>
    <div class="editor" v-if="editor">
      <!-- Editor Buttons -->
      <page-editor-header :editor="editor"></page-editor-header>
      <!-- Editor -->
      <editor-content
        class="editor__content"
        :editor="editor"
        @drop="setFloatOnDrop($event)"
        spellcheck="false"
      />
      <div class="editor__footer">
        <!-- Cross Icon -->
        <svg
          v-if="checkIfChangesMade"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          style="fill: white; background: red; border-radius: 0.4rem"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
          />
        </svg>
        <!-- Check icon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          style="fill: white; background: green; border-radius: 0.4rem"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
          />
        </svg>
        <!-- Submit button -->
        <button class="editor-button" @click="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M3.741 1.408l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154V1.846a.5.5 0 0 1 .741-.438zM5 13v6.617L18.85 12 5 4.383V11h5v2H5z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Editor button & Layout styling */
.editor {
  display: flex;
  flex-direction: column;
  color: #0d0d0d;
  background-color: #fff;
  border: 3px solid #0d0d0d;
  border-radius: 0.75rem;
}

.editor__header {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.25rem;
  border-bottom: 3px solid #0d0d0d;
}

.editor__content {
  padding: 1.25rem 1rem;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.editor__footer {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  white-space: nowrap;
  border-top: 3px solid #0d0d0d;
  font-size: 12px;
  font-weight: 600;
  color: #0d0d0d;
  white-space: nowrap;
  padding: 0.25rem 0.75rem;
}

/* Editor button styling */
.editor-button {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  cursor: pointer;
}

.editor-button svg {
  width: 100%;
  height: 100%;
}

.editor-button.is-active,
.editor-button:hover {
  background: #0d0d0d;
  fill: #fff;
}

/* ProseMirror/Editor-Content styling*/
::v-deep(.ProseMirror) {
  outline: none;
}

.ProseMirror > * + * {
  margin-top: 0.75em;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  line-height: 1.1;
}

::v-deep(.ProseMirror img) {
  margin-top: 0px;
}

::v-deep(.ProseMirror img:hover) {
  cursor: pointer;
}
::v-deep(.ProseMirror img.ProseMirror-selectednode) {
  outline: 2px solid #0d0d0d;
}

::v-deep(.ProseMirror video:hover) {
  cursor: pointer;
}

::v-deep(.ProseMirror video.ProseMirror-selectednode) {
  outline: 2px solid #0d0d0d;
}

::v-deep(.ProseMirror hr) {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, 0.1);
  margin: 2rem 0;
}
</style>
