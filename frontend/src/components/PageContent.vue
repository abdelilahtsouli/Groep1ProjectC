<template>
  <div :class="{ editor: editing }">
    <!-- Editor Header -->
    <div v-if="editing" class="header">
      <button @click="formatDoc('formatblock', 'h3')" class="editor-button">
        <div v-html="headerSVG"></div>
      </button>
      <button @click="formatDoc('formatblock', 'p')" class="editor-button">
        <div v-html="paragraphSVG"></div>
      </button>
      <div class="divider"></div>
      <button
        @click="
          formatDoc('insertHTML', createAccordionElement());
          createChildElements('newAccordion');
          toggleContenteditableAttr();
        "
        class="editor-button"
      >
        <div v-html="addRowSVG"></div>
      </button>
    </div>

    <!-- Edit Button -->
    <div v-if="isLoggedIn" class="icon-container">
      <div
        v-html="editSVG"
        class="icon"
        @click="
          editing = !editing;
          toggleContenteditableAttr();
        "
      ></div>
    </div>

    <!-- Page content loaded from database -->
    <div
      id="content"
      v-html="content"
      class="uneditableContent"
      :contenteditable="editing"
      @keyup="checkIfChangesMade()"
    ></div>

    <!-- Editor Footer -->
    <div v-if="isLoggedIn && editing" class="footer">
      <div v-if="changesMade" v-html="crossSVG"></div>
      <div v-else v-html="checkSVG"></div>
      <p>{{ changesMade ? "Niet opgeslagen" : "Up to date" }}</p>
      <button @click="submit()" class="editor-button">
        <div v-html="arrowRightSVG"></div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { VueCookieNext } from "vue-cookie-next";
import axios from "axios";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    // Edit Button SVG's
    const editSVG = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>`;
    // Editor Header SVG's
    const addRowSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12 13c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm1 2h-2v1.999L9 17v2l2-.001V21h2v-2.001L15 19v-2l-2-.001V15zm7-12c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h16zM5 5v4h14V5H5z"/></svg>`;
    const paragraphSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" /> </svg>`;
    const headerSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z"/></svg>`;
    const orderedListSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/></svg>`;
    const unorderedListSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/></svg>`;
    // Editor Footer SVG's
    const crossSVG = `<svg v-if="checkIfChangesMade" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: white; background: red; border-radius: 0.4rem" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /> </svg>`;
    const checkSVG = `<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: white; background: green; border-radius: 0.4rem" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /> </svg>`;
    const arrowRightSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M3.741 1.408l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154V1.846a.5.5 0 0 1 .741-.438zM5 13v6.617L18.85 12 5 4.383V11h5v2H5z" /> </svg>`;
    // Variables
    const content = ref("");
    const pageId = ref(props.id);
    const editing = ref(false);
    const changesMade = ref(false);

    // Closes details tag and hides the remove button, before sending the content the database.
    const SetDefaultAccordion = () => {
      const nodeList = document.querySelectorAll("details");
      nodeList.forEach((node) => (node.open = false));
      nodeList.forEach(
        (node) =>
          (node
            .getElementsByTagName("summary")[0]
            .getElementsByTagName("button")[0].style.display = "none")
      );
    };

    // Toggles many fields to make the accordions editable
    const toggleContenteditableAttr = (editable: boolean = editing.value) => {
      const nodeList = document.querySelectorAll("details");

      // Makes h3 tags editable
      nodeList.forEach(
        (node) =>
          (node
            .getElementsByTagName("summary")[0]
            .getElementsByTagName("h3")[0].contentEditable =
            editable.toString())
      );

      // Makes the removal buttons visible while editing
      nodeList.forEach(
        (node) =>
          (node
            .getElementsByTagName("summary")[0]
            .getElementsByTagName("button")[0].style.display = editable
            ? "initial"
            : "none")
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
            el.setAttribute("contentEditable", editable.toString())
          )
        )
      );

      // Makes the content of the accordion editable
      nodeList.forEach(
        (node) =>
          (node.getElementsByTagName("div")[0].contentEditable =
            editable.toString())
      );

      // Prevents pressing space-bar from opening accodrions while edditing the summary tag
      nodeList.forEach(
        (node) =>
          (node.onkeyup = (event) => {
            if (event.keyCode == 32) {
              event.preventDefault();
            }
          })
      );

      // On button click, removes parent detail tag with all childs.
      // Adds this functionality to the specific buttons.
      nodeList.forEach(
        (node) =>
          (node
            .getElementsByTagName("summary")[0]
            .getElementsByTagName("button")[0].onclick = (event) => {
            const details = <Node>(
              (<HTMLElement>event.target).parentNode?.parentNode
            );
            details.parentNode?.removeChild(details);
            checkIfChangesMade();
          })
      );
    };

    // Returns an accordion element.
    const createAccordionElement = () => {
      const details = document.createElement("details");
      details.id = "newAccordion";
      details.onkeyup = (event) => {
        if (event.keyCode == 32) {
          event.preventDefault();
        }
      };

      const summary = document.createElement("summary");
      const h3 = document.createElement("h3");
      h3.innerText = "PLACEHOLDER";

      const div = document.createElement("div");
      div.classList.add("content");

      summary.appendChild(h3);

      details.appendChild(summary);
      details.appendChild(div);

      console.log(details.outerHTML);
      return details.outerHTML;
    };

    // Creates child elements for the new accordion element.
    const createChildElements = (id: string) => {
      const newAccordion = document.getElementById(id);

      const p = document.createElement("p");
      p.innerText = "PLACEHOLDER";

      const button = document.createElement("button");
      button.innerText = "X";
      button.style.display = "none";
      button.classList.add("remove-button");

      newAccordion?.getElementsByTagName("div")[0].appendChild(p);
      newAccordion?.getElementsByTagName("summary")[0].appendChild(button);
      newAccordion?.removeAttribute("id");
      newAccordion?.setAttribute("contenteditable", "false");
    };

    // ....
    function submit(): void {
      // Send the new content of the editor to the backend.
      // Note: POST creates a new page while PUT modifies a page
      SetDefaultAccordion();

      const newContent =
        document.getElementById("content")?.innerHTML !== undefined
          ? document.getElementById("content")?.innerHTML
          : "Er was een probleem bij het laden van deze pagina.";

      axios
        .put(
          "./api/pages/" + props.id,
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

      content.value = newContent;
      changesMade.value = false;
    }

    // ....
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

    // Formats editable content
    function formatDoc(sCmd: string, sValue: string): void {
      const oDoc = document.getElementById("content");
      // if (validateMode()) {
      document.execCommand(sCmd, false, sValue);
      if (oDoc) {
        oDoc.focus();
      }
      // }
    }

    // Compares original content with editor content
    const checkIfChangesMade = () => {
      changesMade.value =
        document.getElementById("content")?.innerHTML !== content.value;
    };

    if (props.id != undefined) updatePage(props.id);

    return {
      content,
      pageId,
      editing,
      editSVG,
      crossSVG,
      checkSVG,
      addRowSVG,
      arrowRightSVG,
      changesMade,
      paragraphSVG,
      headerSVG,
      orderedListSVG,
      unorderedListSVG,
      updatePage,
      submit,
      checkIfChangesMade,
      formatDoc,
      toggleContenteditableAttr,
      createAccordionElement,
      createChildElements,
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
  z-index: 5;
  position: absolute;
  opacity: 40%;
}

/* Editor */
.editor {
  border-bottom: 3px solid black;
  border-top: 3px solid black;
  border-radius: 8px;
}

.editor .header {
  border-bottom: 3px solid black;
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.25rem;
}

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

.editor-container {
  margin-top: 40px;
}

.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
