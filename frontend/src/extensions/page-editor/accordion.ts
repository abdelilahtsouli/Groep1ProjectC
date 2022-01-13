/**
 * Singleton class for making / removing / editing an accordion.
 */
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

  /**
   * Toggles {Accodrion} ||=> details.open
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions) to toggle open or closed.
   * @param {boolean} toggle The boolean that sets the attribute true(open) or false(closed).
   */
  public toggleOpen(
    nodeList: NodeListOf<HTMLDetailsElement>,
    toggle: boolean
  ): void {
    nodeList.forEach((node) => (node.open = toggle));
  }

  /**
   * Toggles {Accordion} ||=> details => sumary => h3.contentEditable
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions).
   * @param toggle The boolean that sets contentEditable to true or false.
   */
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

  /**
   * Disables enter key for {Accordion} ||=> details => sumary => h3
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions).
   */
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

  /**
   * Toggles {Accordion} ||=> details => div => ["div", "h3", "p"].contentEditable
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions).
   * @param toggle The boolean that sets contentEditable to true or false.
   */
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

  /**
   * Toggles {Accordion} ||=> details => sumary => button.style.display
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions).
   * @param toggle The boolean that sets display to initial if true else to none.
   */
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

  /**
   * Toggles {Accordion} ||=> details => div => ["div", "h3", "p"].contentEditable
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions).
   * @param toggle The boolean that sets contentEditable to true or false.
   */
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

  /**
   * Toggles {Accordion} ||=> details => div.contentEditable
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions).
   * @param toggle The boolean that sets contentEditable to true or false.
   */
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

  /**
   * Disables space key for {Accordion} ||=> details
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions).
   */
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

  // Returns an {accordion} element as a string
  /**
   * Creates an Accordion element.
   * 1* <details> 
   *  |-> 1* <summary> -> m* <h3>
   *  |-> 1* <div> ->  m* <h3> | <p> | <div>
   * @returns {string} The outerHMTL of the created details element.
   */
  public createAccordionElement(): string {
    const document = new Document();

    const details = document.createElement("details");
    details.setAttribute("name", "accordion");
    details.onkeyup = (event) => {
      if (event.key === " ") {
        event.preventDefault();
      }
    };

    const summary = document.createElement("summary");
    const h3 = document.createElement("h3");
    h3.innerHTML = "PLACEHOLDER";

    const div = document.createElement("div");
    div.classList.add("content");

    summary.appendChild(h3);

    details.appendChild(summary);
    details.appendChild(div);

    const p = document.createElement("p");
    p.innerHTML = "PLACEHOLDER";

    const button = document.createElement("button");
    button.innerHTML = "X";
    button.classList.add("remove-button");

    details.getElementsByTagName("div")[0].appendChild(p);
    details.getElementsByTagName("summary")[0].appendChild(button);
    details.removeAttribute("id");
    details.setAttribute("contenteditable", "false");

    return details.outerHTML;
  }

  /**
   * Toggles the header of the {Accodrion} ||=> details => summary && child elements of summary
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions) to toggle.
   * @param {boolean} toggle If true makes the accordions editable and sets event listeners, if false makes them non-editable
   * @param {() => void} afterRemove Optional param which executes after the accordion is removed.
   */
  private toggleHeaderEditable(
    nodeList: NodeListOf<HTMLDetailsElement>,
    toggle: boolean,
    afterRemove?: () => void
  ) {
    this.toggleHeaderContentEditable(nodeList, toggle);
    this.disableHeaderEnterKey(nodeList);
    this.disableSpaceBarOpen(nodeList);
    this.toggleDisplayRemoveButton(nodeList, toggle);
    this.setRemoveEvent(nodeList, afterRemove);
  }

  /**
   * Toggles the body of the {Accodrion} ||=> details => div && child elements of div
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions) to toggle.
   * @param {boolean} toggle If true makes the accordions editable, if false makes them non-editable
   */
  private toggleBodyEditable(
    nodeList: NodeListOf<HTMLDetailsElement>,
    toggle: boolean
  ) {
    this.toggleEditableAccordionContent(nodeList, toggle);
    this.toggleEditableAccordionDiv(nodeList, toggle);
  }


  /**
   * Sets the remove event for the accordion
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions) to set the remove event for.
   * @param {() => void} afterRemove Optional param which executes after the accordion is removed.
   */
  public setRemoveEvent(
    nodeList: NodeListOf<HTMLDetailsElement>,
    afterRemove?: () => void
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
          if (afterRemove) afterRemove();
        })
    );
  }

  /**
   * Calls this.toggleHeaderEditable and this.toggleBodyEditable to make the Accordion editable / non-editable.
   * @param {NodeListOf<HTMLDetailsElement>} nodeList A node list of HTML details elements (accordions) to toggle.
   * @param {boolean} toggle If true makes the accordions editable, if false makes them non-editable
   * @param {() => void} afterRemove Optional param which executes after the accordion is removed.
   */
  public toggleAccordion(
    nodeList: NodeListOf<HTMLDetailsElement>,
    toggle: boolean,
    afterRemove?: () => void
  ): void {
    this.toggleHeaderEditable(nodeList, toggle, afterRemove);
    this.toggleBodyEditable(nodeList, toggle);
  }

  /**
   * Resets the accordion. Closes the accordion, toggles display to false and toggles contenteditable to false.
   * @param {Document} dom The DOM where the reset happens.
   */
  public reset(dom: Document): void {
    const nodeList = dom.getElementsByName(
      "accordion"
    ) as NodeListOf<HTMLDetailsElement>;
    this.toggleOpen(nodeList, false);
    this.toggleDisplayRemoveButton(nodeList, false);
    this.toggleHeaderContentEditable(nodeList, false);
    this.toggleEditableAccordionContent(nodeList, false);
    this.toggleEditableAccordionDiv(nodeList, false);
  }
}

export default Accordion;
