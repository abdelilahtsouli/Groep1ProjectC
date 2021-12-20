import { removeSlide } from "../SlideShow/main";

// ! Merged
// Toggles Accodrion |=> details.open
export function toggleDetails(
  nodeList: NodeListOf<HTMLDetailsElement>,
  toggle: boolean
): void {
  nodeList.forEach((node) => (node.open = toggle));
}

// ! Merged
// Toggles Accordion |=> details => sumary => h3.contentEditable
export function toggleEditableH3(
  nodeList: NodeListOf<HTMLDetailsElement>,
  toggle: boolean
): void {
  nodeList.forEach((node) =>
    Array.from(
      node.getElementsByTagName("summary")[0].getElementsByTagName("h3")
    ).forEach((el) => (el.contentEditable = toggle.toString()))
  );
}

// ! Merged
// Disables enter key for Accordion |=> details => sumary => h3
export function disableEnterKeyH3(
  nodeList: NodeListOf<HTMLDetailsElement>
): void {
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
}

// ! Merged
// Disables space key for Accordion |=> details
export function disableDetailsSpace(
  nodeList: NodeListOf<HTMLDetailsElement>
): void {
  nodeList.forEach(
    (node) =>
      (node.onkeyup = (event) => {
        if (event.key === " ") {
          event.preventDefault();
        }
      })
  );
}
// ! Merged
// Toggles Accordion |=> details => sumary => button.style.display
export function toggleDisplayRemoveButton(
  nodeList: NodeListOf<HTMLDetailsElement>,
  toggle: boolean
): void {
  nodeList.forEach(
    (node) =>
      (node
        .getElementsByTagName("summary")[0]
        .getElementsByTagName("button")[0].style.display = toggle
        ? "initial"
        : "none")
  );
}

// ! Merged
// Toggles Accordion |=> details => div => ["div", "h3", "p"].contentEditable
export function toggleEditableAccordionContent(
  nodeList: NodeListOf<HTMLDetailsElement>,
  toggle: boolean
): void {
  nodeList.forEach((node) =>
    ["div", "h3", "p"].forEach((tag) =>
      Array.from(
        node
          .getElementsByTagName("summary")[0]
          .getElementsByTagName("h3")[0]
          .getElementsByTagName(tag)
      ).forEach((el) => el.setAttribute("contentEditable", toggle.toString()))
    )
  );
}

// ! Merged
// ! Check if this can be removed
// Toggles Accordion |=> details => div.contentEditable
export function toggleEditableAccordionDiv(
  nodeList: NodeListOf<HTMLDetailsElement>,
  toggle: boolean
): void {
  nodeList.forEach(
    (node) =>
      (node.getElementsByTagName("div")[0].contentEditable = toggle.toString())
  );
}

// Prevents the user from inserting HTML while edditing in contenteditable tags
export function changePasteEvent(): void {
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
export function addEmptyContentEvent(): void {
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

// Returns an accordion element as a string
export function createAccordionElement(): string {
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
}

// Creates child elements for the new accordion element.
export function createChildElements(id: string): void {
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
}

export function isTag(tag: string): boolean {
  const node = document.getSelection()?.anchorNode;
  const nodeType = node?.nodeType == 3 ? node.parentNode : node;
  if (nodeType) {
    return nodeType.nodeName === tag;
  } else {
    return false;
  }
}

export function hasParent(tag: string): boolean {
  const node = document.getSelection()?.anchorNode;
  const nodeType = node?.nodeType == 3 ? node.parentNode : node;
  if (nodeType?.parentNode) {
    return nodeType.parentNode.nodeName === tag;
  } else {
    return false;
  }
}

export function disableCtrlA(): void {
  document.onkeydown = (event) => {
    if (event.ctrlKey && event.key === "a") {
      event.preventDefault();
    }
  };
}

export function resetSlideShowDot(element: HTMLElement): void {
  const slideShowDots = element?.getElementsByClassName("dot");
  for (let i = 0; i < slideShowDots.length; i++) {
    if (i === 0) {
      slideShowDots[i].classList.add("active");
    } else {
      slideShowDots[i].classList.remove("active");
    }
  }
}

export function resetImageDisplay(element: HTMLElement): void {
  const slides = element?.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    if (i == 0) {
      slides[i].style.display = "block";
    } else {
      slides[i].style.display = "none";
    }
  }
}

export function toggleEditSlideButtons(toggle: boolean, dom: Document): void {
  const addButton = dom.getElementsByName("add-slide");
  const removeButton = dom.getElementsByName("remove-slide");

  if (toggle && !addButton[0] && !removeButton[0]) {
    const addSlideButton = dom.createElement("span");
    addSlideButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993v9.349A5.99 5.99 0 0 0 20 13V5H4l.001 14 9.292-9.293a.999.999 0 0 1 1.32-.084l.093.085 3.546 3.55a6.003 6.003 0 0 0-3.91 7.743L2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>`;
    addSlideButton.setAttribute("name", "add-slide");
    addSlideButton.classList.add("add-slide-button");
    addSlideButton.onclick = () => {
      console.log(document.getElementById("hidden-image-input"));
      document.getElementById("hidden-image-input")?.click();
    };

    const removeSlideButton = dom.createElement("span");
    removeSlideButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm-8 5v6h2v-6H9zm4 0v6h2v-6h-2zM9 4v2h6V4H9z"/></svg>`;
    removeSlideButton.setAttribute("name", "remove-slide");
    removeSlideButton.classList.add("remove-slide-button");
    removeSlideButton.onclick = () => removeSlide(0);

    Array.from(dom.getElementsByClassName("slideshow-container")).forEach(
      (slideshow) => {
        slideshow.appendChild(addSlideButton);
        slideshow.appendChild(removeSlideButton);
      }
    );
  } else {
    const addSlideButtons = dom.getElementsByName("add-slide");
    const removeSlideButtons = dom.getElementsByName("remove-slide");

    if (addSlideButtons) {
      addSlideButtons.forEach((button, counter) => {
        dom
          .getElementsByClassName("slideshow-container")
          [counter].removeChild(button);
        counter++;
      });
    }

    if (removeSlideButtons) {
      removeSlideButtons.forEach((button, counter) => {
        dom
          .getElementsByClassName("slideshow-container")
          [counter].removeChild(button);
        counter++;
      });
    }
  }
}
