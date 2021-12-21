import "../../assets/css/SlideShow.css";

export { slideIndex, setAll, showSlides, addSlide, removeSlide };

let slideIndex = 1;
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

function plusSlides(index: number): void {
  showSlides((slideIndex += index));
}

function currentSlide(index: number): void {
  showSlides((slideIndex = index));
}

function setNumberText() {
  const numbertexts = document.getElementsByClassName("numbertext");
  const imgAmount = document.getElementsByClassName("mySlides").length;

  let counter = 1;
  Array.from(numbertexts).forEach((text) => {
    (<HTMLDivElement>text).innerText = `${counter} / ${imgAmount}`;
    counter++;
  });
}

function setDotEvents() {
  const dots = document.getElementsByClassName("dot");
  Array.from(dots).forEach((dot, counter) => {
    (<HTMLElement>dot).onclick = () => {
      currentSlide(counter);
    };
    counter++;
  });
}

function addDot(containerIndex: number) {
  const dots = document.getElementsByName("dots")[containerIndex];
  const newDot = document.createElement("div");
  newDot.classList.add("dot");
  dots.appendChild(newDot);
}

function removeDot(containerIndex: number) {
  const dots = document.getElementsByName("dots")[containerIndex];
  dots.removeChild(dots.getElementsByClassName("dot")[0]);
}

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

function removeSlide(containerIndex: number): void {
  const slides = document.getElementsByClassName("mySlides");
  if (slides.length > 1) {
    const slideshow = document.getElementsByClassName("slideshow-container")[
      containerIndex
    ];
    console.log(slideshow);
    const slideToRemove =
      slideshow.getElementsByClassName("mySlides")[slideIndex - 1];
    console.log(slideToRemove);

    slideshow.removeChild(slideToRemove);

    removeDot(containerIndex);
    setDotEvents();
    setNumberText();
    showSlides(slideIndex + 1);
  }
}
