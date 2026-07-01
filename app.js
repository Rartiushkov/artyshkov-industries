document.addEventListener("DOMContentLoaded", () => {
  initTopbarScroll();
  initReveal();
  initTerminalTyping();
  initVideoWatchdog();
  initMobileMenu();
});

function initTopbarScroll() {
  const topbar = document.querySelector(".topbar");
  const update = () => {
    if (window.scrollY > 40) topbar.classList.add("scrolled");
    else topbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function initReveal() {
  const els = document.querySelectorAll(
    ".work-item, .research-card, .lab-body, .contact-wrap, .section-header"
  );
  els.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 50);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  els.forEach(el => observer.observe(el));
}

function initTerminalTyping() {
  const body = document.querySelector(".terminal-body");
  if (!body) return;

  const lines = body.querySelectorAll(".t-line, .t-blank");
  lines.forEach(l => { l.style.opacity = "0"; });

  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.style.transition = "opacity 220ms ease";
        line.style.opacity = "1";
      }, 120 + i * 90);
    });
    io.disconnect();
  }, { threshold: 0.3 });

  io.observe(body);
}

function initMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const overlay = document.getElementById("nav-overlay");
  if (!toggle || !overlay) return;

  toggle.addEventListener("click", () => {
    const open = overlay.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  overlay.querySelectorAll(".nav-ol-link").forEach(link => {
    link.addEventListener("click", () => {
      overlay.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

function initVideoWatchdog() {
  const video = document.querySelector(".site-video__media");
  if (!video) return;
  const resume = () => { if (video.paused) video.play().catch(() => {}); };
  video.addEventListener("pause", () => setTimeout(resume, 80));
  document.addEventListener("visibilitychange", () => { if (!document.hidden) resume(); });
}
