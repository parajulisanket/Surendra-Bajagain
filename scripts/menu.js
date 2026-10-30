document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  // 1. Mobile & Tablet Hamburger Toggle
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      // Toggle between hamburger icon (three lines) and close icon (X)
      if (mobileMenu.classList.contains("hidden")) {
        menuIcon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      } else {
        menuIcon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      }
    });
  }

  // 2. Dynamic Active State Handler (Perfect for header.php inclusions)
  let currentFilename = window.location.pathname.split("/").pop();

  // Default root path or empty string fallback to index.html
  if (!currentFilename || currentFilename === "") {
    currentFilename = "index.html";
  }

  const allNavLinks = document.querySelectorAll("header nav a, #mobile-menu a");

  allNavLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    // Check if current URL matches link reference
    const isMatch =
      linkHref === currentFilename ||
      (currentFilename === "" &&
        (linkHref === "index.html" || linkHref === "index.php"));

    if (isMatch) {
      if (link.classList.contains("bg-[#D97706]")) {
        // Highlight active contact button state
        link.classList.add("ring-2", "ring-offset-2", "ring-[#D97706]");
      } else {
        // Apply active class and color to standard navigation links
        link.classList.add("active", "text-[#D97706]");
        link.classList.remove("text-[#0F172A]");
      }
    } else {
      if (!link.classList.contains("bg-[#D97706]")) {
        link.classList.remove("active", "text-[#D97706]");
        link.classList.add("text-[#0F172A]", "hover:text-[#D97706]");
      }
    }
  });
});
