/**
 * components.js – Shared UI components for raman-ahmad.de
 * Injects: Navigation, Mobile Sidebar, Footer, Scroll Animations, Back-to-Top, Active Nav Link
 * Usage: <script src="js/components.js"></script> at end of <body> (before i18n.js)
 *
 * Each page must define window.PAGE_META = { canonical, ogUrl, title, description }
 * and window.NAV_TRANSLATIONS = { de: {...}, en: {...}, ... } for nav/footer keys only.
 */
(function () {

  // ─── NAV HTML ─────────────────────────────────────────────────────────────
  var NAV_LINKS = [
    { href: 'index.html',         i18n: 'nav.home',         label: 'Startseite',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: 'ueber-mich.html',    i18n: 'nav.about',        label: 'Über mich',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { href: 'forschung.html',     i18n: 'nav.research',     label: 'Forschung',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { href: 'publikationen.html', i18n: 'nav.publications', label: 'Publikationen',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { href: 'projekte.html',      i18n: 'nav.projects',     label: 'Projekte',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { href: 'interviews.html',    i18n: 'nav.interviews',   label: 'Interviews',
      icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
    { href: 'cv.html',            i18n: 'nav.cv',           label: 'CV',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { href: 'kontakt.html',       i18n: 'nav.contact',      label: 'Kontakt',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  function svgIcon(d, cls) {
    cls = cls || 'h-6 w-6';
    return '<svg class="' + cls + '" fill="none" viewBox="0 0 24 24" stroke="currentColor">'
      + '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="' + d + '"/></svg>';
  }

  function buildNav() {
    var desktopLinks = NAV_LINKS.map(function (l) {
      return '<a href="' + l.href + '" data-i18n="' + l.i18n + '" class="hover:text-primary">' + l.label + '</a>';
    }).join('\n          ');

    var mobileLinks = NAV_LINKS.map(function (l) {
      return '<a href="' + l.href + '" data-i18n="' + l.i18n
        + '" class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-primary/10 hover:text-primary transition">'
        + svgIcon(l.icon, 'w-5 h-5 flex-shrink-0')
        + '\n        ' + l.label + '\n      </a>';
    }).join('\n      ');

    var html = `
<!-- ══════════════ NAVIGATION ══════════════ -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="text-3xl font-bold text-primary">RA</div>
      <div class="hidden md:flex space-x-8 font-medium">
          ${desktopLinks}
      </div>
      <div class="flex items-center gap-2">
        <select id="language-select" class="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm">
          <option value="de">Deutsch</option>
          <option value="en">English</option>
          <option value="ku">Kurmanjî</option>
          <option value="ckb">سۆرانی</option>
          <option value="ar">العربية</option>
        </select>
        <button id="theme-toggle" class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
          <svg id="sun" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <svg id="moon" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>
        <button id="menu-toggle" class="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Menü öffnen">
          <svg id="hamburger-icon" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg id="close-icon" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>

<!-- ══════════════ MOBILE SIDEBAR ══════════════ -->
<div id="sidebar-backdrop" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm hidden md:hidden" aria-hidden="true"></div>
<aside id="mobile-sidebar" class="fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transform -translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col">
  <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
    <span class="text-2xl font-bold text-primary">RA</span>
    <button id="sidebar-close" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Menü schließen">
      ${svgIcon('M6 18L18 6M6 6l12 12')}
    </button>
  </div>
  <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-1">
      ${mobileLinks}
  </nav>
  <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 text-center">© 2026 Raman Ahmad</div>
</aside>`;

    document.body.insertAdjacentHTML('afterbegin', html);
  }

  // ─── FOOTER HTML ──────────────────────────────────────────────────────────
  var SOCIAL_ICONS = [
    {
      href: 'https://github.com/RamanAhmad', label: 'GitHub',
      path: 'M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.53.12-3.19 0 0 1.01-.32 3.31 1.23.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.3-1.55 3.31-1.23 3.31-1.23.66 1.66.24 2.89.12 3.19.77.84 1.24 1.92 1.24 3.24 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z'
    },
    {
      href: 'https://www.linkedin.com/in/raman-ahmad-5243ab30b/', label: 'LinkedIn',
      path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.029-3.058-1.867-3.058-1.867 0-2.152 1.459-2.152 2.966v5.696h-3v-11h2.882v1.509h.039c.401-.757 1.381-1.557 2.837-1.557 3.033 0 3.597 1.997 3.597 4.597v6.451z'
    },
    {
      href: 'https://orcid.org/0009-0001-8012-3945', label: 'ORCID',
      path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
    },
    {
      href: 'https://www.youtube.com/c/Kurd%C3%AEBiH%C3%AAsan%C3%AE', label: 'YouTube',
      path: 'M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.276 1.105-1.08 1.97-2.186 2.246C18.72 20 12 20 12 20s-6.72 0-8.357-.252c-1.106-.276-1.91-1.141-2.186-2.246C2 15.72 2 12 2 12s0-3.72.457-5.502c.276-1.105 1.08-1.97 2.186-2.246C5.28 4 12 4 12 4s6.72 0 8.357.252c1.106.276 1.91 1.141 2.186 2.246zM10 15.5l6-3.5-6-3.5v7z'
    }
  ];

  function buildFooter() {
    var footerNavLinks = NAV_LINKS.map(function (l) {
      return '<a href="' + l.href + '" data-i18n="' + l.i18n + '" class="hover:text-primary transition">' + l.label + '</a>';
    }).join('\n          ');

    var socialIcons = SOCIAL_ICONS.map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '" class="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition">'
        + '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="' + s.path + '"/></svg></a>';
    }).join('\n          ');

    var html = `
<footer class="bg-gray-950 text-gray-400 py-12">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
      <div class="space-y-3">
        <div class="text-3xl font-bold text-primary">RA</div>
        <p class="text-sm max-w-xs text-gray-500">Fullstack Developer &amp; NLP Enthusiast · Hamburg</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-2 text-sm">
          ${footerNavLinks}
      </div>
      <div class="flex items-center gap-4">
          ${socialIcons}
      </div>
    </div>
    <div class="border-t border-gray-800 pt-6 text-center text-sm">
      <p data-i18n="footer.copyright">© 2026 Raman Ahmad – Alle Rechte vorbehalten.</p>
      <div class="mt-2 flex justify-center gap-4 text-gray-500">
        <a href="impressum.html" class="hover:text-primary transition">Impressum</a>
        <span>·</span>
        <a href="datenschutz.html" class="hover:text-primary transition">Datenschutz</a>
      </div>
    </div>
  </div>
</footer>`;

    // Insert footer before closing body, after <main>
    var main = document.querySelector('main');
    if (main) {
      main.insertAdjacentHTML('afterend', html);
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }

  // ─── SCROLL ANIMATIONS + BACK TO TOP ──────────────────────────────────────
  var SCROLL_STYLES = `
<style>
  .reveal { opacity:0; transform:translateY(32px); transition:opacity .6s ease,transform .6s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-stagger > * { opacity:0; transform:translateY(28px); transition:opacity .5s ease,transform .5s ease; }
  .reveal-stagger.visible > *:nth-child(1){opacity:1;transform:none;transition-delay:0s}
  .reveal-stagger.visible > *:nth-child(2){opacity:1;transform:none;transition-delay:.1s}
  .reveal-stagger.visible > *:nth-child(3){opacity:1;transform:none;transition-delay:.2s}
  .reveal-stagger.visible > *:nth-child(4){opacity:1;transform:none;transition-delay:.3s}
  .reveal-stagger.visible > *:nth-child(5){opacity:1;transform:none;transition-delay:.4s}
  .reveal-stagger.visible > *:nth-child(6){opacity:1;transform:none;transition-delay:.5s}
  .reveal-stagger.visible > *:nth-child(n+7){opacity:1;transform:none;transition-delay:.6s}
  #back-to-top{position:fixed;bottom:2rem;right:2rem;z-index:99;width:44px;height:44px;background:#2563eb;color:white;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(34,197,94,.45);opacity:0;transform:translateY(12px);transition:opacity .3s,transform .3s;pointer-events:none}
  #back-to-top.show{opacity:1;transform:translateY(0);pointer-events:auto}
  #back-to-top:hover{background:#16a34a}
</style>`;

  function initScrollFeatures() {
    document.head.insertAdjacentHTML('beforeend', SCROLL_STYLES);

    // Back-to-top button
    var btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Nach oben scrollen');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 400);
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll reveal
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) { io.observe(el); });
  }

  // ─── SIDEBAR JS ───────────────────────────────────────────────────────────
  function initSidebar() {
    var toggle   = document.getElementById('menu-toggle');
    var sidebar  = document.getElementById('mobile-sidebar');
    var backdrop = document.getElementById('sidebar-backdrop');
    var closeBtn = document.getElementById('sidebar-close');
    var hamIcon  = document.getElementById('hamburger-icon');
    var closeIco = document.getElementById('close-icon');

    function openSidebar() {
      sidebar.classList.remove('-translate-x-full');
      backdrop.classList.remove('hidden');
      hamIcon.classList.add('hidden');
      closeIco.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      sidebar.classList.add('-translate-x-full');
      backdrop.classList.add('hidden');
      hamIcon.classList.remove('hidden');
      closeIco.classList.add('hidden');
      document.body.style.overflow = '';
    }
    if (toggle)   toggle.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);
    document.querySelectorAll('.mobile-nav-link').forEach(function (l) {
      l.addEventListener('click', closeSidebar);
    });
  }

  // ─── ACTIVE NAV LINK ──────────────────────────────────────────────────────
  function initActiveNav() {
    var page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a[href], #mobile-sidebar a[href]').forEach(function (a) {
      if (a.getAttribute('href') === page) {
        a.classList.add('text-primary', 'font-semibold');
        a.style.borderBottom = '2px solid #2563eb';
        a.style.paddingBottom = '2px';
      }
    });
  }

  // ─── INIT ─────────────────────────────────────────────────────────────────
  function init() {
    buildNav();
    buildFooter();
    initSidebar();
    initScrollFeatures();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
