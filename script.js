// Mobile nav
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// FAQ accordion
document.querySelectorAll(".faq-item button").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const answer = item.querySelector(".answer");
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(o => {
      o.classList.remove("open");
      o.querySelector(".answer").style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Scroll reveal
const observer = new IntersectionObserver(
  entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Form: fall back to a mail draft until a Formspree ID is configured
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", e => {
    if (form.action.includes("YOUR_FORM_ID")) {
      e.preventDefault();
      const d = new FormData(form);
      const lines = [];
      for (const [key, value] of d.entries()) lines.push(`${key}: ${value}`);
      const subject = form.dataset.mailSubject || "Website";
      window.location.href =
        `mailto:${form.dataset.mailTo}?subject=${encodeURIComponent(subject + " — " + (d.get("name") || ""))}&body=${encodeURIComponent(lines.join("\n"))}`;
    }
  });
}
