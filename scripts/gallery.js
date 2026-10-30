/**
 * Standalone Lightbox Controller
 */
function openLightbox(imageSrc, captionText) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");

  img.src = imageSrc;
  caption.textContent = captionText;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");

  modal.classList.remove("flex");
  modal.classList.add("hidden");
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Close modal on background click
document
  .getElementById("lightboxModal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeLightbox();
    }
  });

// Close modal on ESC key press
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});
