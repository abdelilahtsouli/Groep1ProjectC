<template>
  <!-- Edit Button -->
  <div v-if="isLoggedIn && !editing">
    <div v-html="editSVG" class="edit-button" @click="editing = !editing"></div>
  </div>
  <!-- Page Content -->
  <page-editor
    v-if="editing && isLoggedIn"
    :id="id"
    :content="content"
    @newContent="setNewContent"
    @stopEditing="editing = false"
  ></page-editor>
  <div v-else v-html="content" class="text-box"></div>
  <!-- Modal -->
  <transition name="modal">
    <modal v-if="showModal" @close="showModal = false">
      <template #header>
        <div v-html="checkMarkSVG"></div>
      </template>
      <template #body>
        <h3>Veranderingen opgeslagen</h3>
      </template>
      <template #footer><div></div></template>
    </modal>
  </transition>
</template>

<script lang="ts">
import PageEditor from "./PageEditor.vue";
import { defineComponent, ref } from "vue";
import { VueCookieNext } from "vue-cookie-next";
import axios from "axios";
import bus from "../bus";
import Modal from "./Modal.vue";

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    PageEditor,
    Modal,
  },
  setup(props) {
    const checkMarkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60" style="fill: green; background: transparent; border-radius: 0.4rem" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /> </svg>`;
    const editSVG = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>`;
    const content = ref("");
    const editing = ref(false);
    const showModal = ref(false);
    const isLoggedIn = ref(VueCookieNext.getCookie("token") != null);

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

    function setNewContent(newContent: string, serverResponse: any): void {
      content.value = newContent;
      editing.value = false;
      showModal.value = true;
      console.log(serverResponse);
    }

    if (props.id != undefined) updatePage(props.id.toString());

    return {
      editSVG,
      content,
      isLoggedIn,
      editing,
      showModal,
      checkMarkSVG,
      setNewContent,
    };
  },
});
</script>

<style scoped>
@import "../assets/css/page-components/main.css";
</style>
