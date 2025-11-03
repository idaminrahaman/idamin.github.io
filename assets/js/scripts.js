
/* Theme toggle & smooth scroll & reveal-on-scroll */
const themeKey = "site-theme";
const html = document.documentElement;
const toggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    html.setAttribute("data-theme", "dark");
  } else {
    html.removeAttribute("data-theme");
  }
}

function initTheme() {
  const saved = localStorage.getItem(themeKey);
  if (saved) {
    applyTheme(saved);
  } else {
    applyTheme("light");
    localStorage.setItem(themeKey, "light");
  }
}

if (toggle) {
  toggle.addEventListener("click", () => {
    const current = localStorage.getItem(themeKey) || "light";
    const next = current === "light" ? "dark" : "light";
    localStorage.setItem(themeKey, next);
    applyTheme(next);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if (href.length>1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Reveal on scroll
  const cards = document.querySelectorAll('.card');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.12});
  cards.forEach(c=>obs.observe(c));
});
