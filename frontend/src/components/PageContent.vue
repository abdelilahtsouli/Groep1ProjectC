<template>
  <div :class="{ editor: editing }">
    <!-- Editor Header -->
    <page-editor-header
      v-if="editing"
      @checkForChanges="checkForChanges"
    ></page-editor-header>

    <!-- Edit Button -->
    <div v-if="isLoggedIn" class="icon-container">
      <div v-html="editSVG" class="icon" @click="editing = !editing"></div>
    </div>

    <!-- Page content loaded from database -->
    <div
      id="content"
      v-html="content"
      class="uneditableContent"
      :contenteditable="editing"
      @keyup="checkForChanges()"
    ></div>

    <!-- Editor Footer -->
    <page-editor-footer
      v-if="isLoggedIn && editing"
      :pageId="id"
      :changesMade="changesMade"
      @newContent="setNewContent"
    ></page-editor-footer>
  </div>
</template>


<script lang="ts">
import PageEditorHeader from './PageEditorHeader.vue';
import PageEditorFooter from './PageEditorFooter.vue';
import { defineComponent, ref, watchEffect } from "vue";
import axios from "axios";
import bus from "../bus";
import { VueCookieNext } from "vue-cookie-next";

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    }
  },
  components: {
    PageEditorHeader,
    PageEditorFooter,
  },
  setup(props) {
    // Edit Button SVG's
    const editSVG = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>`;

    const content = ref("");
    const editing = ref(false);
    const changesMade = ref(false);
    const isLoggedIn = ref(VueCookieNext.getCookie("token") != null);

//TODO
    bus.on("sessionModify", (data: any) => {
      isLoggedIn.value = data.loggedIn;
    });

    // Get the content of a page with id and load it onto the page.
    function updatePage(id: string): void {
      axios
        .get("./api/pages/" + id)
        .then((result: any) => {
          if (result.data.Success) {
            content.value = result.data.Content;
            document.title = result.data.Name;
          } else {
            content.value =
              "Er was een probleem bij het laden van deze pagina.";
            console.error(
              "There was an error while loading the page with id " + id
            );
          }
        })
        .catch((result: any) => {
          content.value = "Er was een probleem bij het laden van deze pagina.";
          console.error(
            "There was an error while loading the page with id " + id
          );
        });
    }

    // Emit send from PageEditorFooter when newContent is submitted and send to database
    // Sets content.value = newContent
    function setNewContent(newContent: string) {
      changesMade.value = false;
      content.value = newContent;
      // editing.value = false;
    }

    // Compares original content with editor content
    const checkForChanges = () => {
      // // changesMade.value =
      // //   document.getElementById("content")?.innerHTML !== content.value;
      // Problem:
      //  Accodrion buttons have display in their style which results in "changesMade.value = true" always
      // Solution:
      //  Created temporary DOM object, where button display is switched to the original state
      const tempDom = <Document>document.cloneNode(true);
      const tempDomContent = tempDom.getElementById("content");
      tempDomContent
        ?.querySelectorAll("details")
        .forEach(
          (node) =>
            (node
              .getElementsByTagName("summary")[0]
              .getElementsByTagName("button")[0].style.display = "none")
        );

      changesMade.value =
        content.value !== tempDom.getElementById("content")?.innerHTML;
    };

    if (props.id != undefined) updatePage(props.id.toString());

    return {
      content,
      isLoggedIn,
      editing,
      editSVG,
      changesMade,
      checkForChanges,
      setNewContent,
    };
  },
});
</script>

<style scoped>
[contenteditable] {
  outline: 0px solid transparent;
}

/* Edit button */
.edit-button {
  width: 10%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
  text-align: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.icon {
  height: 24px;
  width: 24px;
  /* fill: var(--dark-blue); */
  color: var(--light-red);
  right: 0;
  margin: 15px 10px 0 0;
  z-index: 0;
  position: absolute;
  opacity: 40%;
}

/* Editor */
.editor {
  border-bottom: 3px solid black;
  border-top: 3px solid black;
  border-radius: 8px;
}

/* .editor-container {
  margin-top: 40px;
} */
</style>
