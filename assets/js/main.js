// Bùi Gia Trang — main.js (ES Module, không phụ thuộc thư viện ngoài)

/* ---------- Dark / Light mode (Âm - Dương) ---------- */
const THEME_KEY = "buigiatrang-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.querySelector(".theme-toggle");
  if (btn) btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) applyTheme(saved);

  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

/* ---------- Menu di động ---------- */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Highlight menu theo trang hiện tại ---------- */
function initActiveMenu() {
  const path = window.location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll(".nav-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    const normalized = href.replace(/index\.html$/, "");
    if (normalized === path || (normalized !== "/" && path.startsWith(normalized))) {
      a.setAttribute("aria-current", "page");
    }
  });
}

/* ---------- Tìm kiếm bài viết ---------- */
async function initSearch() {
  const toggle = document.querySelector(".search-toggle");
  const panel = document.querySelector(".search-panel");
  const input = document.querySelector(".search-input");
  const results = document.querySelector(".search-results");
  if (!toggle || !panel || !input || !results) return;

  let index = null;

  toggle.addEventListener("click", async () => {
    const isOpen = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
      input.focus();
      if (!index) {
        try {
          const res = await fetch(rootPath() + "assets/search-index.json");
          index = await res.json();
        } catch (e) {
          index = [];
        }
      }
    }
  });

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = "";
    if (!q || !index) return;
    const matches = index.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 8);
    if (matches.length === 0) {
      results.innerHTML = '<p class="search-empty">Không tìm thấy bài viết phù hợp.</p>';
      return;
    }
    matches.forEach((item) => {
      const a = document.createElement("a");
      a.href = rootPath() + item.url;
      a.textContent = item.title;
      results.appendChild(a);
    });
  });
}

function rootPath() {
  const depth = document.documentElement.getAttribute("data-root") || "";
  return depth;
}

/* ---------- Mục lục tự động + highlight khi cuộn ---------- */
function initTOC() {
  const article = document.querySelector(".article-body");
  const tocList = document.querySelector(".toc ul");
  if (!article || !tocList) return;

  const headings = article.querySelectorAll("h2, h3");
  if (headings.length === 0) {
    const tocEl = document.querySelector(".toc");
    if (tocEl) tocEl.style.display = "none";
    return;
  }

  headings.forEach((h, i) => {
    if (!h.id) h.id = "muc-" + i;
    const li = document.createElement("li");
    li.style.paddingLeft = h.tagName === "H3" ? "1em" : "0";
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    tocList.appendChild(li);
  });

  const links = tocList.querySelectorAll("a");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const active = tocList.querySelector(`a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-80px 0px -70% 0px" }
  );
  headings.forEach((h) => observer.observe(h));
}

/* ---------- Đếm thời gian đọc ---------- */
function initReadingTime() {
  const article = document.querySelector(".article-body");
  const target = document.querySelector("[data-reading-time]");
  if (!article || !target) return;
  const words = article.textContent.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  target.textContent = minutes + " phút đọc";
}

/* ---------- Copy link bài viết ---------- */
function initCopyLink() {
  const btn = document.querySelector("[data-copy-link]");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const original = btn.textContent;
      btn.textContent = "Đã sao chép liên kết";
      setTimeout(() => (btn.textContent = original), 2000);
    } catch (e) {
      /* im lặng bỏ qua nếu trình duyệt không hỗ trợ */
    }
  });
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Lazy loading ảnh (dự phòng cho trình duyệt cũ) ---------- */
function initLazyImages() {
  const imgs = document.querySelectorAll("img:not([loading])");
  imgs.forEach((img) => img.setAttribute("loading", "lazy"));
}

function init() {
  initTheme();
  initMobileMenu();
  initActiveMenu();
  initSearch();
  initTOC();
  initReadingTime();
  initCopyLink();
  initBackToTop();
  initLazyImages();
}

document.addEventListener("DOMContentLoaded", init);
