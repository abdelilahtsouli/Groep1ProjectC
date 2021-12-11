<template>
  <div class="header">
    <select
      class="editor-button-select"
      v-model="selectedTextType"
      @change="
        formatDoc({
          sCmd: 'formatblock',
          sValue: selectedTextType,
          blockParentTags: ['SUMMARY'],
        })
      "
    >
      <option disabled value="">Teksttype</option>
      <option value="p">Paragraaf</option>
      <option value="h1">Kop 1</option>
      <option value="h2">Kop 2</option>
      <option value="h3">Kop 3</option>
      <option value="h4">Kop 4</option>
      <option value="h5">Kop 5</option>
      <option value="h6">Kop 6</option>
    </select>
    <div class="divider"></div>
    <button @click="createAccordion" class="editor-button">
      <div v-html="addRowSVG"></div>
    </button>
    <div class="divider"></div>
    <button @click="formatDoc({ sCmd: 'bold' })" class="editor-button">
      <div v-html="boldSVG"></div>
    </button>
    <button @click="formatDoc({ sCmd: 'italic' })" class="editor-button">
      <div v-html="italicSVG"></div>
    </button>
    <div class="divider"></div>
    <select
      class="editor-button-select"
      v-model="selectedColor"
      @change="formatDoc({ sCmd: 'forecolor', sValue: selectedColor })"
    >
      <option disabled value="">Tekstkleur</option>
      <option value="#2C3E50">Zwart</option>
      <option value="#FFF">Wit</option>
      <option value="red">Rood</option>
      <option value="blue">Blauw</option>
      <option value="green">Groen</option>
    </select>
    <upload-file-button
      @imageUploaded="createImage"
      @videoUploaded="createVideo"
    ></upload-file-button>
  </div>
  <div class="white-space"></div>
</template>

<script lang="ts">
import UploadFileButton from "./UploadFileButton.vue";
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import * as EditorUtility from "./EditorUtility";

interface kwargFortmatDoc {
  sCmd: string;
  sValue?: string;
  checkForChanges?: boolean;
  blockTags?: string[];
  blockParentTags?: string[];
}

export default defineComponent({
  components: { UploadFileButton },
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
    const selectedTextType = ref("");

    onMounted(() => {
      toggleContenteditableAttr(true);
    });

    onBeforeUnmount(() => {
      toggleContenteditableAttr(false);
    });

    // ! Cannot go into EditorUtitlity -> Has emit
    // Adds event listener to Accordion |=> details => sumary => button.onclick
    // Removes the Accordion / parent details tag, with all children
    function addAccordionRemoveEvent(
      nodeList: NodeListOf<HTMLDetailsElement>
    ): void {
      nodeList.forEach(
        (node) =>
          (node
            .getElementsByTagName("summary")[0]
            .getElementsByTagName("button")[0].onclick = (event) => {
            const details = <Node>(
              (<HTMLElement>event.target).parentNode?.parentNode
            );
            details.parentNode?.removeChild(details);
            emit("checkForChanges");
          })
      );
    }

    function toggleContenteditableAttr(toggle: boolean): void {
      const nodeList = document.querySelectorAll("details");

      // ! Accordion-Header
      EditorUtility.toggleEditableH3(nodeList, toggle);
      EditorUtility.disableEnterKeyH3(nodeList);
      EditorUtility.disableDetailsSpace(nodeList);
      EditorUtility.toggleDisplayRemoveButton(nodeList, toggle);
      addAccordionRemoveEvent(nodeList);
      // ! Accordion-Content
      EditorUtility.toggleEditableAccordionContent(nodeList, toggle);
      EditorUtility.toggleEditableAccordionDiv(nodeList, toggle);
      EditorUtility.addEmptyContentEvent();
      // ! Element with ID "content"
      EditorUtility.changePasteEvent();
    }

    // ! Cannot go into EditorUtitlity -> Has emit
    // Formats editable content
    function formatDoc({
      sCmd,
      sValue,
      checkForChanges = true,
      blockTags = [],
      blockParentTags = [],
    }: kwargFortmatDoc): void {
      const oDoc = document.getElementById("content");

      let execute = true;
      blockTags.forEach((tag) => {
        if (EditorUtility.hasParent(tag)) {
          execute = false;
        }
      });
      blockParentTags.forEach((tag) => {
        if (EditorUtility.hasParent(tag)) {
          execute = false;
        }
      });

      if (execute) {
        document.execCommand(sCmd, false, sValue);
      } else {
        console.log("Insert action block.\nCannot insert into tag.");
      }

      if (oDoc) {
        oDoc.focus();
      }
      if (checkForChanges) {
        emit("checkForChanges");
      }
      selectedColor.value = "";
      selectedTextType.value = "";
    }

    // ! Cannot go into EditorUtitlity -> Has emit
    function createAccordion(): void {
      if (!EditorUtility.isTag("H3")) {
        formatDoc({
          sCmd: "insertHTML",
          sValue: EditorUtility.createAccordionElement(),
          checkForChanges: false,
          blockParentTags: ["SUMMARY"],
        });
        EditorUtility.createChildElements("newAccordion");
        toggleContenteditableAttr(true);
        emit("checkForChanges");
      }
    }

    function createImage(id: string, type: string) {
      const pTag = document.createElement("p");
      const image = document.createElement("image");
      image.setAttribute("src", `/cdn/${id}`);
      image.setAttribute("type", `${type}`);
      image.style.maxHeight = "100%";
      image.style.maxWidth = "100%";
      pTag.appendChild(image);
      formatDoc({ sCmd: "insertHTML", sValue: pTag.outerHTML });
    }

    function createVideo(id: string) {
      const div = document.createElement("div");
      const video = document.createElement("video");
      const source = document.createElement("source");
      video.controls = true;
      video.disablePictureInPicture = true;
      video.setAttribute("controlsList", "nodownload noplaybackrate ");
      source.src = `\\cdn\\${id}`;
      source.type = "video/mp4";
      video.appendChild(source);
      div.appendChild(video);
      formatDoc({ sCmd: "insertHTML", sValue: div.outerHTML });
    }

    return {
      addRowSVG,
      paragraphSVG,
      headerSVG,
      orderedListSVG,
      unorderedListSVG,
      boldSVG,
      italicSVG,
      selectedColor,
      selectedTextType,
      formatDoc,
      createAccordion,
      createImage,
      createVideo,
    };
  },
});
</script>

<style scoped>
@import "../assets/css/editor-components/editorbutton.css";

.editor .header {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.25rem;
  border-bottom: 3px solid #0d0d0d;
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

.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
