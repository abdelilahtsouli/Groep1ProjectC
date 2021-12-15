import "../../assets/css/SlideShow.css";

export { slideIndex, setAll, showSlides, addSlide, removeSlide };

let slideIndex = 1;
function setAll(): void {
  const prevButtons = document.getElementsByClassName("prev");
  const nextButtons = document.getElementsByClassName("next");
  const dots = document.getElementsByClassName("dot");
  const numbertexts = document.getElementsByClassName("numbertext");

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

  const imgAmount = document.getElementsByClassName("mySlides").length;
  let counter = 1;

  Array.from(dots).forEach((dot, counter) => {
    (<HTMLElement>dot).onclick = () => {
      currentSlide(counter);
    };
    counter++;
  });

  counter = 1;
  Array.from(numbertexts).forEach((text) => {
    (<HTMLDivElement>text).innerText = `${counter} / ${imgAmount}`;
    counter++;
  });
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
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function plusSlides(index: number): void {
  showSlides((slideIndex += index));
}

function currentSlide(index: number): void {
  showSlides((slideIndex = index));
}

function addSlide(): void {
  //
}

function removeSlide(): void {
  //
}
