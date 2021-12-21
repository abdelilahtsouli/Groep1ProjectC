class Accordion {
  private static instance: Accordion;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  public static getInstance(): Accordion {
    if (!Accordion.instance) {
      Accordion.instance = new Accordion();
    }
    return Accordion.instance;
  }

  // Toggles Accodrion |=> details.open
  public toggleOpen(
    nodeList: NodeListOf<HTMLDetailsElement>,
    toggle: boolean
  ): void {
    nodeList.forEach((node) => (node.open = toggle));
  }

  // Toggles Accordion |=> details => sumary => h3.contentEditable
  public toggleHeaderContentEditable(
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
  public disableHeaderEnterKey(nodeList: NodeListOf<HTMLDetailsElement>): void {
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

  // Toggles Accordion |=> details => div => ["div", "h3", "p"].contentEditable
  public toggleBodyContendEditable(
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

  // TODO: Maybe remove
  // Toggles Accordion |=> details => sumary => button.style.display
  public toggleDisplayRemoveButton(
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

  // TODO: Maybe remove
  // Toggles Accordion |=> details => div => ["div", "h3", "p"].contentEditable
  public toggleEditableAccordionContent(
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

  // ! Keep instead of toggleEditableAccordionContent?
  // Toggles Accordion |=> details => div.contentEditable
  public toggleEditableAccordionDiv(
    nodeList: NodeListOf<HTMLDetailsElement>,
    toggle: boolean
  ): void {
    nodeList.forEach(
      (node) =>
        (node.getElementsByTagName("div")[0].contentEditable =
          toggle.toString())
    );
  }

  // Disables space key for Accordion |=> details
  public disableSpaceBarOpen(nodeList: NodeListOf<HTMLDetailsElement>): void {
    nodeList.forEach(
      (node) =>
        (node.onkeyup = (event) => {
          if (event.key === " ") {
            event.preventDefault();
          }
        })
    );
  }

  // TODO: Check
  // Returns an accordion element as a string
  public createAccordionElement(): string {
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

  // TODO: Check
  // Creates child elements for the new accordion element.
  public createChildElements(id: string): void {
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

  private toggleHeaderEditable(nodeList: NodeListOf<HTMLDetailsElement>, toggle: boolean) {
    this.toggleHeaderContentEditable(nodeList, toggle);
    this.disableHeaderEnterKey(nodeList);
    this.disableSpaceBarOpen(nodeList);
    this.toggleDisplayRemoveButton(nodeList, toggle);
    this.setRemoveEvent(nodeList);
  }

  private toggleBodyEditable(nodeList: NodeListOf<HTMLDetailsElement>, toggle:boolean) {
    this.toggleEditableAccordionContent(nodeList, toggle);
    this.toggleEditableAccordionDiv(nodeList, toggle);
  }

  public setRemoveEvent(
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
        })
    );
  }

  public toggleAccordion(nodeList: NodeListOf<HTMLDetailsElement>, toggle: boolean): void{
    this.toggleHeaderEditable(nodeList, toggle);
    this.toggleBodyEditable(nodeList, toggle);
  }

  public reset(dom: Document): void {
    const nodeList = dom.querySelectorAll("details");
    console.log(nodeList.forEach((node) => console.log(node)))
    this.toggleOpen(nodeList, false);
    this.toggleDisplayRemoveButton(nodeList, false);
    this.toggleHeaderContentEditable(nodeList, false);
    this.toggleEditableAccordionContent(nodeList, false);
    this.toggleEditableAccordionDiv(nodeList, false);
  }
}

export default Accordion;
