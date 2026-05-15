// Mobile navigation toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after clicking a navigation link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections smoothly when they enter the screen
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// Highlight the current navigation link while scrolling
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => {
          item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  {
    rootMargin: "-40% 0px -50% 0px",
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Demo video modal for all sample play buttons
const modal = document.querySelector(".video-modal");
const modalTitle = document.querySelector("#modal-title");
const modalVideo = modal.querySelector("video");
const closeModal = document.querySelector(".modal-close");

document.querySelectorAll(".play-btn").forEach((button) => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.video;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalVideo.currentTime = 0;
    modalVideo.play();
  });
});

function hideModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalVideo.pause();
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    hideModal();
  }
});

// Beginner-friendly fake form message for static hosting
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Thanks! Replace this with Formspree, Netlify Forms, or your own backend later.";
  contactForm.reset();
});
