import "../../assets/css/page-components/main.css";

export { slideIndex, setAll, showSlides, addSlide, removeSlide };

let slideIndex = 1;

/**
 * Sets all required buttons, all dots and the text.
 */
function setAll(): void {
  const prevButtons = document.getElementsByClassName("prev");
  const nextButtons = document.getElementsByClassName("next");
  setDotEvents();
  setNumberText();

  Array.from(prevButtons).forEach(
    (button) =>
      ((<HTMLElement>button).onclick = () => {
        plusSlides(-1);
      })
  );

  Array.from(nextButtons).forEach(
    (button) =>
      ((<HTMLElement>button).onclick = () => {
        plusSlides(1);
      })
  );
}

/**
 * Shows the slide matching the index and shows the correct dot as active.
 * @param {number} index The index of the slide you want to set to active.
 */
function showSlides(index: number): void {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  if (index > slides.length) {
    slideIndex = 1;
  }
  if (index < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    (slides[i] as HTMLElement).style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  (slides[slideIndex - 1] as HTMLElement).style.display = "block";
  dots[slideIndex - 1].className += " active";
}

/**
 * Shows the slide with index (current index + <@param index>)
 * @param {number} index The amount you wan to increase or decrease the slideIndex by.
 */
function plusSlides(index: number): void {
  showSlides((slideIndex += index));
}

/**
 * Sets the current slide to index. Sets slideIndex to <@param index> and shows that slide.
 * @param {number} index The index you want to set as current slide and show.
 */
function currentSlide(index: number): void {
  showSlides((slideIndex = index));
}

/**
 * Sets the numberText for each slide.
 */
function setNumberText() {
  const numbertexts = document.getElementsByClassName("numbertext");
  const imgAmount = document.getElementsByClassName("mySlides").length;

  let counter = 1;
  Array.from(numbertexts).forEach((text) => {
    (<HTMLDivElement>text).innerText = `${counter} / ${imgAmount}`;
    counter++;
  });
}

/**
 * Sets the onclick event for all dots.
 */
function setDotEvents() {
  const dots = document.getElementsByClassName("dot");
  Array.from(dots).forEach((dot, counter) => {
    (<HTMLElement>dot).onclick = () => {
      currentSlide(counter);
    };
    counter++;
  });
}

/**
 * Adds a dot element.
 * @param {number} containerIndex Index of the slideshow.
 */
function addDot(containerIndex: number) {
  const dots = document.getElementsByName("dots")[containerIndex];
  const newDot = document.createElement("div");
  newDot.classList.add("dot");
  dots.appendChild(newDot);
}

/**
 * Removes a dot element.
 * @param {number} containerIndex The index of the slideshow.
 */
function removeDot(containerIndex: number) {
  const dots = document.getElementsByName("dots")[containerIndex];
  dots.removeChild(dots.getElementsByClassName("dot")[0]);
}

/**
 * Adds a slide to the slideshow with index: <@param containerIndex>
 * Adds a new dot, sets the dot onclick events, sets the numberText and then shows the correct slide.
 * @param {string} path The path of image of the new slide. 
 * @param {number} containerIndex The index of the slideshow.
 */
function addSlide(path: string, containerIndex: number): void {
  const slideText = document.createElement("div");
  slideText.classList.add("numbertext");

  const image = document.createElement("img");
  image.src = path;

  const newSlide = document.createElement("div");
  newSlide.classList.add("mySlides");
  newSlide.classList.add("fade");
  newSlide.appendChild(slideText);
  newSlide.appendChild(image);

  const slideshow = document.getElementsByClassName("slideshow-container")[
    containerIndex
  ];
  const referenceNode =
    slideshow.getElementsByClassName("mySlides")[slideIndex - 1];
  slideshow.insertBefore(newSlide, referenceNode);

  addDot(containerIndex);
  setDotEvents();
  setNumberText();
  showSlides(slideIndex);
}

/**
 * Removes the current slide of slideshow with index: <@param containerIndex>
 * Removes a dot, sets the dot onclick events, sets the numberText and then shows the correct slide.
 * @param {number} containerIndex 
 */
function removeSlide(containerIndex: number): void {
  const slides = document.getElementsByClassName("mySlides");
  if (slides.length > 1) {
    const slideshow = document.getElementsByClassName("slideshow-container")[
      containerIndex
    ];
    const slideToRemove =
      slideshow.getElementsByClassName("mySlides")[slideIndex - 1];

    slideshow.removeChild(slideToRemove);

    removeDot(containerIndex);
    setDotEvents();
    setNumberText();
    showSlides(slideIndex + 1);
  }
}
