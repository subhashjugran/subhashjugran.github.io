/* ─────────────────────────────────────────────────────────────
   SUBHASH JUGRAN — Portfolio Script
   ───────────────────────────────────────────────────────────── */

// ── Theme toggle ────────────────────────────────────────────
const html        = document.documentElement;
const toggleBtn   = document.getElementById('theme-toggle');
const themeIcon   = toggleBtn ? toggleBtn.querySelector('.theme-icon') : null;

const ICONS = { dark: '☀️', light: '🌙' };

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeIcon) themeIcon.textContent = ICONS[theme];
  if (toggleBtn) toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

// Load saved preference; default is now LIGHT
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}

// ── Tab switching ────────────────────────────────────────────
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels  = document.querySelectorAll('.tab-panel');

function activateTab(tabName) {
  tabButtons.forEach((btn) => {
    const isTarget = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === `panel-${tabName}`);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => activateTab(button.dataset.tab));
});

// ── Nav "Projects" link → scroll + activate Projects (demo) tab ─
const navProjectsLink = document.getElementById('nav-projects');
if (navProjectsLink) {
  navProjectsLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => activateTab('demo'), 250);
  });
}

// ── "Explore Projects" hero button → same behaviour ──────────
const exploreBtn = document.getElementById('btn-explore');
if (exploreBtn) {
  exploreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => activateTab('demo'), 250);
  });
}

// ── Nav "Blogs" link → scroll + activate Blogs tab ───────────
const navBlogsLink = document.getElementById('nav-blogs');
if (navBlogsLink) {
  navBlogsLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => activateTab('blogs'), 250);
  });
}

// ── Mobile menu ──────────────────────────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const topbar     = document.querySelector('.topbar');

if (menuToggle && topbar) {
  menuToggle.addEventListener('click', () => {
    const isOpen = topbar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// ── Blog category filter ─────────────────────────────────────
const filterBtns     = document.querySelectorAll('.blog-filter-btn');
const blogCards      = document.querySelectorAll('.blog-card');
const categorySelect = document.getElementById('blog-category-select');

function filterBlogs(category) {
  filterBtns.forEach((b) => b.classList.toggle('active', b.dataset.filter === category));
  if (categorySelect) categorySelect.value = category;

  blogCards.forEach((card) => {
    const match = category === 'all' || card.dataset.category === category;
    if (match) {
      card.classList.remove('hidden');
      card.style.animation = 'none';
      void card.offsetHeight;
      card.style.animation = 'fadeInCard 0.3s ease forwards';
    } else {
      card.classList.add('hidden');
    }
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => filterBlogs(btn.dataset.filter));
});

if (categorySelect) {
  categorySelect.addEventListener('change', () => filterBlogs(categorySelect.value));
}
