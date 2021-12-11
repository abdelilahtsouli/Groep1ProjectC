<template>
  <div class="editor">
    <!-- Editor Header -->
    <page-editor-header @checkForChanges="checkForChanges"></page-editor-header>
    <div>
      <div
        v-html="editSVG"
        class="edit-button"
        @click="$emit('stopEditing')"
      ></div>
    </div>

    <!-- Page content loaded from database -->
    <div
      id="content"
      v-html="content"
      class="text-box"
      :class="{ editor__content: true }"
      :contenteditable="true"
      @keyup="checkForChanges()"
    ></div>

    <!-- Editor Footer -->
    <page-editor-footer
      :pageId="id"
      :changesMade="changesMade"
      @newContent="setNewContent"
    ></page-editor-footer>
  </div>
</template>

<script lang="ts">
import {
  toggleDisplayRemoveButton,
  toggleEditableAccordionDiv,
  toggleEditableH3,
  toggleDetails,
} from "./EditorUtility";
import PageEditorHeader from "./PageEditorHeader.vue";
import PageEditorFooter from "./PageEditorFooter.vue";
import { defineComponent, ref } from "vue";
import { VueCookieNext } from "vue-cookie-next";

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  components: {
    PageEditorHeader,
    PageEditorFooter,
  },
  emits: ["newContent", "stopEditing"],
  setup(props, { emit }) {
    const checkMarkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" style="fill: green; background: transparent; border-radius: 0.4rem" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /> </svg>`;
    const editSVG = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>`;
    const content = ref(props.content);
    const changesMade = ref(false);
    const isLoggedIn = ref(VueCookieNext.getCookie("token") != null);

    // Emit send from PageEditorFooter when newContent is submitted and send to database
    // Sets content.value = newContent
    function setNewContent(newContent: string, serverResponse: any) {
      changesMade.value = false;
      content.value = newContent;
      emit("newContent", newContent, serverResponse);
    }

    // Compares original content with editor content
    // Problem:
    //  Accodrion buttons have display in their style which results in "changesMade.value = true" always
    // Solution:
    //  Created temporary DOM object, where button display is switched to the original state
    const checkForChanges = () => {
      const tempDom = <Document>document.cloneNode(true);
      const tempDomContent = tempDom.getElementById("content");

      const nodeList = tempDomContent?.querySelectorAll("details");
      if (nodeList) {
        toggleDisplayRemoveButton(nodeList, false);
        toggleEditableH3(nodeList, false);
        toggleEditableAccordionDiv(nodeList, false);
        toggleDetails(nodeList, false);
      }

      changesMade.value =
        content.value !== tempDom.getElementById("content")?.innerHTML;
    };

    return {
      checkMarkSVG,
      editSVG,
      content,
      isLoggedIn,
      changesMade,
      checkForChanges,
      setNewContent,
    };
  },
});
</script>

<style scoped>
@import "../assets/css/page-components/editbutton.css";

[contenteditable] {
  outline: 0px solid transparent;
}

/* Editor */
.editor {
  display: flex;
  flex-direction: column;
  /* max-height: 43.5rem; */
  color: #0d0d0d;
  background-color: #fff;
  border-top: 3px solid #0d0d0d;
  border-bottom: 3px solid #0d0d0d;
  border-radius: 0.75rem;
}

.editor__content {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
