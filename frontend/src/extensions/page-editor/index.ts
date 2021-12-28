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

class Editor {
  private static instance: Editor;
  public accordion: Accordion;
  public slideshow: SlideShow;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    this.accordion = Accordion.getInstance();
    this.slideshow = SlideShow.getInstance();
  }

  public static getInstance(): Editor {
    if (!Editor.instance) {
      Editor.instance = new Editor();
    }
    return Editor.instance;
  }

  // Prevents the user from inserting HTML while edditing in contenteditable tags
  public changePasteEvent(): void {
    document.body.onpaste = (event: ClipboardEvent) => {
      event.preventDefault();
      if (event.clipboardData) {
        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
        // TODO check if this should be inserText
      }
    };
  }

  // When element with id "content" is has no child nodes,
  // inserts p element with placeholder text
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

  public isTag(tag: string): boolean {
    const node = document.getSelection()?.anchorNode;
    const nodeType = node?.nodeType == 3 ? node.parentNode : node;
    if (nodeType) {
      return nodeType.nodeName === tag;
    } else {
      return false;
    }
  }

  public hasParent(tag: string): boolean {
    const node = document.getSelection()?.anchorNode;
    const nodeType = node?.nodeType == 3 ? node.parentNode : node;
    if (nodeType?.parentNode) {
      return nodeType.parentNode.nodeName === tag;
    } else {
      return false;
    }
  }

  public disableCtrlA(): void {
    document.onkeydown = (event) => {
      if (event.ctrlKey && event.key === "a") {
        event.preventDefault();
      }
    };
  }

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

  public resetComponents(dom: Document): void {
    this.accordion.reset(dom);
    this.slideshow.reset(dom);
  }
}

export default Editor;
