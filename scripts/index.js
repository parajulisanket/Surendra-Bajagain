let currentSlide = 0;
const totalSlides = 2;

function setSlide(index) {
  currentSlide = index;
  for (let i = 0; i < totalSlides; i++) {
    const slide = document.getElementById(`slide-${i}`);
    const dot = document.getElementById(`dot-${i}`);

    if (i === currentSlide) {
      slide.classList.remove("opacity-0");
      slide.classList.add("opacity-100");

      dot.classList.remove("bg-[#0F172A]/80", "text-slate-300");
      dot.classList.add("bg-[#D97706]", "text-white");
    } else {
      slide.classList.remove("opacity-100");
      slide.classList.add("opacity-0");

      dot.classList.remove("bg-[#D97706]", "text-white");
      dot.classList.add("bg-[#0F172A]/80", "text-slate-300");
    }
  }
}

// Automatically switch slides every 4 seconds (4000ms)
setInterval(() => {
  const nextSlide = (currentSlide + 1) % totalSlides;
  setSlide(nextSlide);
}, 4000);
