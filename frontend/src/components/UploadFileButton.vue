<template>
  <button class="editor-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M14 13.5V8a4 4 0 1 0-8 0v5.5a6.5 6.5 0 1 0 13 0V4h2v9.5a8.5 8.5 0 1 1-17 0V8a6 6 0 1 1 12 0v5.5a3.5 3.5 0 0 1-7 0V8h2v5.5a1.5 1.5 0 0 0 3 0z"
      />
    </svg>
    <input
      accept="image/jpeg, image/png, video/mp4"
      @change="upload($event)"
      type="file"
    />
  </button>
</template>

<script lang="ts">
import Editor from "../Extensions/PageEditor/index";
import {defineComponent} from "vue";
import axios from "axios";

function getCookie(name: string): string | null {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
}

export default defineComponent({
  emits: ["imageUploaded", "videoUploaded"],
  setup(props, { emit }) {
    function upload(event: any) {
      if (!Editor.getInstance().hasParent("SUMMARY")) {
        const file = event.target.files[0];

        var formData = new FormData();
        formData.append("media", file);

        axios
          .post("/cdn/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: <string>getCookie("token"),
            },
          })
          .then(
            (response: any) => {
              // TODO Emit to Parent (response.data.id, file.type)
              if (file.type === "image/png" || file.type === "image/jpeg") {
                emit("imageUploaded", response.data.id, file.type);
              } else if (file.type === "video/mp4") {
                emit("videoUploaded", response.data.id);
              }
            },
            (error: any) => {
              console.log(error.value);
            }
          );
      } else {
        console.log("image/video upload blocked");
      }
    }

    return {
      upload,
    };
  },
});
</script>

<style scoped>
@import "../assets/css/editor-components/editorbutton.css";

.editor-button {
  position: relative;
}

.editor-button input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
