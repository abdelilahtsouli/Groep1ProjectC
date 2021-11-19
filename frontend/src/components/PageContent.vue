<template>
  <div v-if="isLoggedIn()">
    <button class="edit-button" @click="editing = !editing">Edit</button>
  </div>

  <div v-if="!editing" style="margin: 0px 10px 0px 10px" v-html="content"></div>

  <page-editor
    v-else
    :content="content"
    :pageId="pageId"
    @changeContent="setNewContent"
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
  },
  components: {
    PageEditor,
  },
  setup(props) {
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

    function isLoggedIn() {
      return VueCookieNext.getCookie("token") != null;
    }

    if (props.id != undefined) updatePage(props.id);

    return {
      content,
      pageId,
      editing,
      updatePage,
      setNewContent,
      isLoggedIn,
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
</style>
