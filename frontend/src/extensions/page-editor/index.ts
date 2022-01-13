import axios from "axios";
import { addSlide } from "../slide-show/main";
import Accordion from "./accordion";
import SlideShow from "./slideshow";

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

/**
 * Singleton class for making / removing / editing custom HTML elements.
 */
class Editor {
  private static instance: Editor;
  public accordion: Accordion;
  public slideshow: SlideShow;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    this.accordion = Accordion.getInstance();
    this.slideshow = SlideShow.getInstance();
  }

  /**
   * Gets/Sets the instance of the Singleton.
   * @returns {Editor} an instance of Editor.
   */
  public static getInstance(): Editor {
    if (!Editor.instance) {
      Editor.instance = new Editor();
    }
    return Editor.instance;
  }

  /**
   * Prevents the user from inserting HTML while edditing in contenteditable tags.
   * In documen.body, prevents the default of onpaste and sets a new method to filter out HTML injection.
   */
  public changePasteEvent(): void {
    document.body.onpaste = (event: ClipboardEvent) => {
      event.preventDefault();
      if (event.clipboardData) {
        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
      }
    };
  }

  /**
   * Sets onkeyup event on element with id "content".
   * - When element with id "content" is has no child nodes, inserts p element with placeholder text.
   */
  public addEmptyContentEvent(): void {
    (<HTMLElement>document.getElementById("content")).onkeyup = (event) => {
      if (event.key === "Backspace") {
        const contentDiv = document.getElementById("content");
        if (!contentDiv?.hasChildNodes()) {
          const pTag = document.createElement("p");
          pTag.innerText = "Plaats hier uw text.";
          contentDiv?.appendChild(pTag);
        }
      }
    };
  }

  /**
   * Check if the current selection / current carcet position is in a certain tag.
   * @param {string} tag The tag/htmlElment to check for.
   * @returns {boolean} Whether or not the tag which is currently selected / where the carcet is positioned.
   */
  public isTag(tag: string): boolean {
    const node = document.getSelection()?.anchorNode;
    const nodeType = node?.nodeType == 3 ? node.parentNode : node;
    if (nodeType) {
      return nodeType.nodeName === tag;
    } else {
      return false;
    }
  }

  /**
   * Check if the current selection / current carcet position has a certain parent tag.
   * @param {string} tag The tag/htmlElment to check for. 
   * @returns {boolean} Whether or not the tag of the currently selection / carcet position has a certain parent tag.
   */
  public hasParent(tag: string): boolean {
    const node = document.getSelection()?.anchorNode;
    const nodeType = node?.nodeType == 3 ? node.parentNode : node;
    if (nodeType?.parentNode) {
      return nodeType.parentNode.nodeName === tag;
    } else {
      return false;
    }
  }

  /**
   * Disables ctrl + a on the whole document.
   */
  public disableCtrlA(): void {
    document.onkeydown = (event) => {
      if (event.ctrlKey && event.key === "a") {
        event.preventDefault();
      }
    };
  }

  /**
   * Creates or deletes an input HTML element for uploading jpeg and png with display="none"
   * @param {boolean} toggle if toggle=true creates the HTML input element with id="hidden-image-input"", else if toggle=false removes this element.
   * @param {() => void} afterUpload Optional param which executes after the Promise has returned.
   */  
  public toggleHiddenInputElement(
    toggle: boolean,
    afterUpload?: () => void
  ): void {
    if (toggle) {
      const inputEl = document.createElement("input");
      inputEl.id = "hidden-image-input";
      inputEl.accept = "image/jpeg, image/png";
      inputEl.type = "file";
      inputEl.style.display = "none";
      inputEl.onchange = (event: any) => {
        if (event.target.files[0]) {
          if (!this.hasParent("SUMMARY")) {
            const file = event.target.files[0];
            const formData = new FormData();
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
                  // TODO ADD SLIDE
                  addSlide(`/cdn/${response.data.id}`, 0);
                  if (afterUpload) afterUpload();
                },
                (error: any) => {
                  console.error(error.value);
                }
              );
            event.target.value = "";
          } else {
            console.error("image/video upload blocked");
          }
        }
      };
      document.getElementById("app")?.appendChild(inputEl);
    } else {
      document.getElementById("hidden-image-input")?.remove();
    }
  }

  /**
   * Resets the accordion and slideshow
   * @param {Document} dom The DOM where the reset happens.
   */
  public resetComponents(dom: Document): void {
    this.accordion.reset(dom);
    this.slideshow.reset(dom);
  }
}

export default Editor;
