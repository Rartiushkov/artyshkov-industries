document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initTerminalTyping();
  initTopbarScroll();
});

function initReveal() {
  const els = document.querySelectorAll(".domain-card, .research-card, .lab-copy, .lab-terminal, .hero-stats, .contact-block");
  els.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

function initTerminalTyping() {
  const lines = document.querySelectorAll("#terminal-output .t-line");
  lines.forEach((line, i) => {
    line.style.opacity = "0";
    setTimeout(() => {
      line.style.transition = "opacity 300ms ease";
      line.style.opacity = "1";
    }, 400 + i * 180);
  });
}

function initTopbarScroll() {
  const topbar = document.querySelector(".topbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      topbar.style.borderBottomColor = "rgba(255,255,255,0.1)";
    } else {
      topbar.style.borderBottomColor = "rgba(255,255,255,0.07)";
    }
  }, { passive: true });
}
