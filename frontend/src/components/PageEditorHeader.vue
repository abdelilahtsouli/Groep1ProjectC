<template>
  <div class="header">
    <button @click="formatDoc('formatblock', 'h3')" class="editor-button">
      <div v-html="headerSVG"></div>
    </button>
    <button @click="formatDoc('formatblock', 'p')" class="editor-button">
      <div v-html="paragraphSVG"></div>
    </button>
    <div class="divider"></div>
    <button @click="createAccordion" class="editor-button">
      <div v-html="addRowSVG"></div>
    </button>
    <div class="divider"></div>
    <button @click="formatDoc('bold')" class="editor-button">
      <div v-html="boldSVG"></div>
    </button>
    <button @click="formatDoc('italic')" class="editor-button">
      <div v-html="italicSVG"></div>
    </button>
    <div class="divider"></div>
    <select
      class="editor-button-select"
      v-model="selectedColor"
      @change="formatDoc('forecolor', selectedColor)"
    >
      <option disabled value="">Tekstkleur</option>
      <option value="#2C3E50">Zwart</option>
      <option value="#FFF">Wit</option>
      <option value="red">Rood</option>
      <option value="blue">Blauw</option>
      <option value="green">Groen</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";

export default defineComponent({
  emits: ["checkForChanges"],
  setup(props, { emit }) {
    // Editor Header SVG's
    const addRowSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12 13c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm1 2h-2v1.999L9 17v2l2-.001V21h2v-2.001L15 19v-2l-2-.001V15zm7-12c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h16zM5 5v4h14V5H5z"/></svg>`;
    const paragraphSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" /> </svg>`;
    const headerSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z"/></svg>`;
    const orderedListSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/></svg>`;
    const unorderedListSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/></svg>`;
    const boldSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"/></svg>`;
    const italicSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"/></svg>`;
    const selectedColor = ref("");
    const toggleContenteditableAttr = (editable: boolean) => {
      const nodeList = document.querySelectorAll("details");

      // Makes h3 tags editable
      nodeList.forEach(
        (node) =>
          (node
            .getElementsByTagName("summary")[0]
            .getElementsByTagName("h3")[0].contentEditable =
            editable.toString())
      );

      // Disables enter key in accordion Header: summary->h3
      nodeList.forEach(
        (node) =>
          (node
            .getElementsByTagName("summary")[0]
            .getElementsByTagName("h3")[0].onkeydown = (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          })
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
            if (event.key === " ") {
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
            // checkIfChangesMade();
            emit("checkForChanges");
          })
      );
    };

    onMounted(() => {
      toggleContenteditableAttr(true);
    });

    onBeforeUnmount(() => {
      toggleContenteditableAttr(false);
    });

    // Formats editable content
    function formatDoc(sCmd: string, sValue: string): void {
      const oDoc = document.getElementById("content");
      document.execCommand(sCmd, false, sValue);
      if (oDoc) {
        oDoc.focus();
      }
      console.log(sValue);
      selectedColor.value = "";
      emit("checkForChanges");
    }

    const TagCompatible = () => {
      var node = document.getSelection()?.anchorNode;
      var nodeType = node?.nodeType == 3 ? node.parentNode : node;
      if (nodeType) {
        return nodeType.nodeName !== "H3";
      } else {
        return false;
      }
    };

    const createAccordion = () => {
      if (TagCompatible()) {
        formatDoc("insertHTML", createAccordionElement());
        createChildElements("newAccordion");
        toggleContenteditableAttr(true);
      }
    };

    // Returns an accordion element.
    const createAccordionElement = () => {
      const details = document.createElement("details");
      details.id = "newAccordion";
      details.onkeyup = (event) => {
        if (event.key === " ") {
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

    return {
      addRowSVG,
      paragraphSVG,
      headerSVG,
      orderedListSVG,
      unorderedListSVG,
      boldSVG,
      italicSVG,
      selectedColor,
      formatDoc,
      TagCompatible,
      createAccordion,
      createAccordionElement,
      createChildElements,
    };
  },
});
</script>

<style scoped>
.editor .header {
  border-bottom: 3px solid black;
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.25rem;
}

.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
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

.editor-button-select {
  /* width: 5rem; */
  width: 6rem;
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
