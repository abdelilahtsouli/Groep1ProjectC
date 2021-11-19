<template>
  <div v-if="isLoggedIn" class="icon-container">
    <div v-html="editSVG" class="icon" @click="editing = !editing"></div>
  </div>

  <div v-if="!editing" v-html="content" class="uneditableContent"></div>

  <page-editor
    v-else
    :content="content"
    :pageId="pageId"
    @changeContent="setNewContent"
    class="editor-container"
  ></page-editor>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { VueCookieNext } from "vue-cookie-next";
import axios from "axios";
import PageEditor from "./PageEditor.vue";

export default defineComponent({
  props: {
    id: String,
    isLoggedIn: Boolean,
  },
  components: {
    PageEditor,
  },
  setup(props) {
    const editSVG = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>`;
    const content = ref("");
    const pageId = ref(props.id);
    const editing = ref(false);

    function updatePage(id: string) {
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

    function setNewContent(newContent: string) {
      content.value = newContent;
    }

    // function isLoggedIn() {
    //   return document.cookie != '';
    // }

    if (props.id != undefined) updatePage(props.id);

    return {
      content,
      pageId,
      editing,
      updatePage,
      setNewContent,
      editSVG,
    };
  },
});
</script>

<style scoped>
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
  z-index: 5;
  position: absolute;
  opacity: 40%;
}

.editor-container {
  margin-top: 40px;
}
</style>
