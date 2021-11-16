<template>
  <button
    @click="
      page1 = true;
      page2 = false;
    "
  >
    Admin editor
  </button>
  <button
    @click="
      page2 = true;
      page1 = false;
    "
  >
    Admin login
  </button>
  <hr />
  <hr />
  <admin-editor v-show="page1"></admin-editor>
  <admin-login v-show="page2"></admin-login>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import AdminEditor from "./pages/AdminEditor.vue";
import AdminLogin from "./pages/AdminLogin.vue";

export default {
  components: {
    AdminEditor,
    AdminLogin,
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    let page1 = ref(true);
    let page2 = ref(false);
    return { page1, page2 };
  },
};
</script>
