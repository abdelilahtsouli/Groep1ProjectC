<template>
  <div class="footer">
    <div v-if="changesMade" v-html="crossSVG"></div>
    <div v-else v-html="checkMarkSVG"></div>
    <p>{{ changesMade ? "Niet opgeslagen" : "Up to date" }}</p>
    <button @click="submit()" class="editor-button">
      <div v-html="arrowRightSVG"></div>
    </button>
  </div>
  <div class="white-space"></div>
</template>

<script lang="ts">
import {
  resetImageDisplay,
  resetSlideShowDot,
  toggleEditSlideButtons,
  toggleDetails,
  toggleDisplayRemoveButton,
  toggleEditableAccordionContent,
  toggleEditableAccordionDiv,
  toggleEditableH3,
} from "../Extensions/PageEditor/main";
import axios from "axios";
import { defineComponent, ref } from "vue";
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
    const checkMarkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: white; background: green; border-radius: 0.4rem" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /> </svg>`;
    const arrowRightSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M3.741 1.408l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154V1.846a.5.5 0 0 1 .741-.438zM5 13v6.617L18.85 12 5 4.383V11h5v2H5z" /> </svg>`;

    const getNewContent = () => {
      // Creates a temporary DOM for closing the accordion and hiding the buttons
      const tempDOM = <Document>document.cloneNode(true);

      //-// Resets the accordions //-//
      // Closes details tag and hides the remove button, before sending the content the database.
      const nodeList = tempDOM.querySelectorAll("details");
      toggleDetails(nodeList, false);
      toggleDisplayRemoveButton(nodeList, false);
      toggleEditableH3(nodeList, false);
      toggleEditableAccordionContent(nodeList, false);
      toggleEditableAccordionDiv(nodeList, false);
      //-// End //-//

      const tempDomContent = tempDOM.getElementById("content");
      if (tempDomContent) {
        resetSlideShowDot(tempDomContent);
        resetImageDisplay(tempDomContent);
        toggleEditSlideButtons(false, tempDOM);
        Array.from(
          tempDOM.getElementsByClassName("slideshow-container")
        ).forEach((sl) => {
          const inputElements = tempDOM.getElementsByName("hidden-input");
          console.log(inputElements);
          inputElements.forEach((el) => sl.removeChild(el));
        });
      }

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
          // TODO: Show that the request is successfull.
          console.log(response);
          emit("newContent", newContent, response);
        });
    }
    return { crossSVG, checkMarkSVG, arrowRightSVG, submit };
  },
});
</script>

<style scoped>
@import "../assets/css/editor-components/editorbutton.css";

.editor .footer {
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

.editor .footer p {
  border-bottom: 1px solid black;
  margin: 5px;
}
</style>
