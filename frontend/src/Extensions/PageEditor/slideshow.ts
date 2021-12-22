import { removeSlide } from "../SlideShow/main";

class SlideShow {
  private static instance: SlideShow;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  public static getInstance(): SlideShow {
    if (!SlideShow.instance) {
      SlideShow.instance = new SlideShow();
    }
    return SlideShow.instance;
  }

  public resetDots(element: HTMLElement): void {
    const slideShowDots = element?.getElementsByClassName("dot");
    for (let i = 0; i < slideShowDots.length; i++) {
      if (i === 0) {
        slideShowDots[i].classList.add("active");
      } else {
        slideShowDots[i].classList.remove("active");
      }
    }
  }
  
  public resetImageDisplay(element: HTMLElement): void {
    const slides = element?.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      if (i == 0) {
        (slides[i] as HTMLElement).style.display = "block";
      } else {
        (slides[i] as HTMLElement).style.display = "none";
      }
    }
  }
  
  public toggleEditSlideButtons(toggle: boolean, dom: Document): void {
    const addButton = dom.getElementsByName("add-slide");
    const removeButton = dom.getElementsByName("remove-slide");
  
    if (toggle && !addButton[0] && !removeButton[0]) {
      const addSlideButton = dom.createElement("span");
      addSlideButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993v9.349A5.99 5.99 0 0 0 20 13V5H4l.001 14 9.292-9.293a.999.999 0 0 1 1.32-.084l.093.085 3.546 3.55a6.003 6.003 0 0 0-3.91 7.743L2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>`;
      addSlideButton.setAttribute("name", "add-slide");
      addSlideButton.classList.add("add-slide-button");
      addSlideButton.onclick = () => {
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
            // eslint-disable-next-line no-unexpected-multiline
            [counter].removeChild(button);
          counter++;
        });
      }
  
      if (removeSlideButtons) {
        removeSlideButtons.forEach((button, counter) => {
          dom
            .getElementsByClassName("slideshow-container")
            // eslint-disable-next-line no-unexpected-multiline
            [counter].removeChild(button);
          counter++;
        });
      }
    }
  }

  public reset(dom: Document): void {
    const domContent = dom.getElementById("content");
    if (domContent) {
      this.resetDots(domContent);
      this.resetImageDisplay(domContent);
      this.toggleEditSlideButtons(false, dom);
      Array.from(
        dom.getElementsByClassName("slideshow-container")
      ).forEach((sl) => {
        const inputElements = dom.getElementsByName("hidden-image-input");
        inputElements.forEach((el) => sl.removeChild(el));
      });
    }
  }
}

export default SlideShow;
