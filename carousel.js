document.querySelectorAll(".gallery-section").forEach((section) => {
  const carousel = section.querySelector(".photo-carousel");
  const previousButton = section.querySelector('[data-direction="previous"]');
  const nextButton = section.querySelector('[data-direction="next"]');

  if (!carousel || !previousButton || !nextButton) {
    return;
  }

  const updateButtons = () => {
    previousButton.disabled = carousel.scrollLeft <= 1;
    nextButton.disabled =
      carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
  };

  const scrollByPhoto = (direction) => {
    const photo = carousel.querySelector("img");
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;

    if (photo) {
      carousel.scrollBy({
        left: direction * (photo.getBoundingClientRect().width + gap),
        behavior: "smooth",
      });
    }
  };

  previousButton.addEventListener("click", () => scrollByPhoto(-1));
  nextButton.addEventListener("click", () => scrollByPhoto(1));
  carousel.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
});
