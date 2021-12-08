<template>
  <div class="footer">
    <div v-if="changesMade" v-html="crossSVG"></div>
    <div v-else v-html="checkSVG"></div>
    <p>{{ changesMade ? "Niet opgeslagen" : "Up to date" }}</p>
    <button @click="submit()" class="editor-button">
      <div v-html="arrowRightSVG"></div>
    </button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { VueCookieNext } from "vue-cookie-next";

export default defineComponent({
  emits: ["newContent"],
  props: {
    pageId: {
      type: Number,
      required: true,
    },
    changesMade: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    // Editor Footer SVG's
    const crossSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: white; background: red; border-radius: 0.4rem" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /> </svg>`;
    const checkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: white; background: green; border-radius: 0.4rem" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /> </svg>`;
    const arrowRightSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M3.741 1.408l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154V1.846a.5.5 0 0 1 .741-.438zM5 13v6.617L18.85 12 5 4.383V11h5v2H5z" /> </svg>`;

    const getNewContent = () => {
      // Creates a temporary DOM for closing the accordion and hiding the buttons
      const tempDOM = <Document>document.cloneNode(true);

      //-// Resets the accordions //-//
      
      // Closes details tag and hides the remove button, before sending the content the database.
      const nodeList = tempDOM.querySelectorAll("details");
      nodeList.forEach((node) => (node.open = false));
      nodeList.forEach(
        (node) =>
          (node
            .getElementsByTagName("summary")[0]
            .getElementsByTagName("button")[0].style.display = "none")
      );
      // Makes h3 tags non-editable
      nodeList.forEach(
        (node) =>
          (node
            .getElementsByTagName("summary")[0]
            .getElementsByTagName("h3")[0].contentEditable = "false")
      );

      // Makes the content of the accordion editable
      nodeList.forEach((node) =>
        ["div", "h3", "p"].forEach((tag) =>
          Array.from(
            node
              .getElementsByTagName("summary")[0]
              .getElementsByTagName("h3")[0]
              .getElementsByTagName(tag)
          ).forEach((el) =>
            el.setAttribute("contentEditable", "false")
          )
        )
      );

      // Makes the content of the accordion editable
      nodeList.forEach(
        (node) =>
          (node.getElementsByTagName("div")[0].contentEditable =
            "false")
      );
      //-// End //-//
      return tempDOM.getElementById("content")?.innerHTML;
    };

    // ....
    function submit(): void {
      // Send the new content of the editor to the backend.
      // Note: POST creates a new page while PUT modifies a page

      const content = getNewContent();
      const newContent =
        content !== undefined
          ? content
          : "Er was een probleem bij het laden van deze pagina.";

      axios
        .put(
          "./api/pages/" + props.pageId,
          {
            content: newContent,
          },
          {
            headers: {
              authorization: VueCookieNext.getCookie("token"),
            },
          }
        )
        .then((response: any) => {
          console.log(response);
          // TODO: Show that the request is successfull.
        });

      // TODO send emit
      emit("newContent", newContent, false);
    }
    return { crossSVG, checkSVG, arrowRightSVG, submit };
  },
});
</script>

<style scoped>
.editor .footer {
  border-top: 3px solid black;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  white-space: nowrap;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
}

.editor .footer p {
  border-bottom: 1px solid black;
  margin: 5px;
}

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
</style>
