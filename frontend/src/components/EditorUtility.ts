// Toggles Accodrion |=> details.open
export function toggleDetails(
  nodeList: NodeListOf<HTMLDetailsElement>,
  toggle: boolean
): void {
  nodeList.forEach((node) => (node.open = toggle));
}

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

export function resetImageDisplay(element: HTMLElement) {
  const slides = element?.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    if (i == 0) {
      slides[i].style.display = "block";
    } else {
      slides[i].style.display = "none";
    }
  }
}
