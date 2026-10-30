document.addEventListener("DOMContentLoaded", () => {
  const carouselGrid = document.getElementById("project-carousel-grid");
  const prevBtn = document.getElementById("prev-project-btn");
  const nextBtn = document.getElementById("next-project-btn");

  if (carouselGrid && prevBtn && nextBtn) {
    const getScrollStep = () => {
      const firstCard = carouselGrid.querySelector("div");
      // Calculate card width + gap (32px / gap-8)
      return firstCard ? firstCard.offsetWidth + 32 : 350;
    };

    nextBtn.addEventListener("click", () => {
      const maxScrollLeft = carouselGrid.scrollWidth - carouselGrid.clientWidth;
      if (carouselGrid.scrollLeft >= maxScrollLeft - 10) {
        // Loop back to start if at the end
        carouselGrid.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselGrid.scrollBy({ left: getScrollStep(), behavior: "smooth" });
      }
    });

    prevBtn.addEventListener("click", () => {
      if (carouselGrid.scrollLeft <= 10) {
        // Loop to end if at the start
        carouselGrid.scrollTo({
          left: carouselGrid.scrollWidth,
          behavior: "smooth",
        });
      } else {
        carouselGrid.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
      }
    });
  }
});
