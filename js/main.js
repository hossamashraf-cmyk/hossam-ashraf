/* =====================================================
   Main app logic
   ===================================================== */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  let lang = localStorage.getItem('lang') || 'en';
  let activeFilter = 'all';

  /* ---------- Helpers ---------- */
  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function thumbSources(p) {
    if (p.type === 'youtube') {
      const v = p.orientation === 'vertical'
        ? [`https://i.ytimg.com/vi/${p.ytId}/oardefault.jpg`, `https://i.ytimg.com/vi/${p.ytId}/hqdefault.jpg`]
        : [`https://i.ytimg.com/vi/${p.ytId}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${p.ytId}/hqdefault.jpg`];
      return v;
    }
    if (p.type === 'drive') return [`https://drive.google.com/thumbnail?id=${p.driveId}&sz=w1000`];
    return [];
  }

  function embedUrl(p) {
    if (p.type === 'youtube') {
      const origin = encodeURIComponent(location.origin.startsWith('http') ? location.origin : 'https://www.youtube.com');
      return `https://www.youtube-nocookie.com/embed/${p.ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${origin}`;
    }
    if (p.type === 'drive') return `https://drive.google.com/file/d/${p.driveId}/preview`;
    return null;
  }

  function externalUrl(p) {
    if (p.type === 'youtube') return p.orientation === 'vertical' ? `https://www.youtube.com/shorts/${p.ytId}` : `https://www.youtube.com/watch?v=${p.ytId}`;
    if (p.type === 'drive') return `https://drive.google.com/file/d/${p.driveId}/view`;
    return p.url;
  }

  /* ---------- i18n ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $('#lang-toggle-label').textContent = t('lang.switch');
    document.title = lang === 'ar'
      ? 'حسام أشرف — مونتير فيديو وصانع محتوى بصري'
      : 'Hossam Ashraf — Video Editor & Visual Storyteller';
    renderPortfolio();
    renderHistory();
    renderResults();
    renderTestimonials();
  }

  $('#lang-toggle').addEventListener('click', () => {
    lang = lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', lang);
    applyLang();
  });

  /* ---------- Portfolio ---------- */
  const ALL_PLAYABLE = () => PROJECTS.concat(HISTORY_SERIES.episodes);

  function projectCard(p) {
    const srcs = thumbSources(p);
    const badgeCat = p.category === 'ai'
      ? `<span class="work-badge ai"><i class="fa-solid fa-wand-magic-sparkles"></i> ${t('work.ai')}</span>`
      : p.category === 'history'
        ? `<span class="work-badge history"><i class="fa-solid fa-landmark"></i> ${t('history.ep')} ${String(p.ep).padStart(2, '0')}</span>`
      : p.category === 'reels'
        ? `<span class="work-badge"><i class="fa-solid fa-mobile-screen"></i> ${t('work.f.reels')}</span>`
        : `<span class="work-badge"><i class="fa-solid fa-film"></i> ${t('work.f.videos')}</span>`;
    const isLink = p.type === 'link';
    const playIcon = isLink ? 'fa-folder-open' : 'fa-play';

    const thumb = srcs.length
      ? `<img src="${srcs[0]}" data-fallbacks="${esc(srcs.slice(1).join('|'))}" alt="${esc(p.title[lang])}" loading="lazy" class="work-img">`
      : `<div class="work-thumb-fallback"><i class="fa-solid ${isLink ? 'fa-folder-open' : 'fa-clapperboard'}"></i></div>`;

    return `
      <button class="work-card reveal" type="button" data-id="${p.id}" data-cat="${p.category}" aria-label="${esc(p.title[lang])}">
        <div class="work-thumb">
          ${thumb}
          <div class="work-badges">${badgeCat}</div>
          <span class="play-btn"><i class="fa-solid ${playIcon}"></i></span>
        </div>
        <div class="work-info">
          <h4>${esc(p.title[lang])}</h4>
          <p>${esc(p.role[lang])}</p>
        </div>
      </button>`;
  }

  function renderPortfolio() {
    const featured = PROJECTS.filter((p) => p.orientation === 'wide' && (activeFilter === 'all' || p.category === activeFilter));
    const vertical = PROJECTS.filter((p) => p.orientation === 'vertical' && (activeFilter === 'all' || p.category === activeFilter));

    const fGrid = $('#featured-grid'), vGrid = $('#reels-grid');
    fGrid.innerHTML = featured.map(projectCard).join('');
    vGrid.innerHTML = vertical.map(projectCard).join('');
    $('#featured-group').hidden = featured.length === 0;
    $('#reels-group').hidden = vertical.length === 0;
    $('#empty-state').hidden = featured.length + vertical.length > 0;

    bindThumbFallbacks(fGrid);
    bindThumbFallbacks(vGrid);
    bindCards();
    observeReveals();
  }

  function bindThumbFallbacks(scope) {
    $$('.work-img', scope).forEach((img) => {
      if (img.dataset.bound) return;
      img.dataset.bound = '1';
      img.addEventListener('error', function () {
        const list = (this.dataset.fallbacks || '').split('|').filter(Boolean);
        if (list.length) { this.src = list.shift(); this.dataset.fallbacks = list.join('|'); }
        else {
          const fb = document.createElement('div');
          fb.className = 'work-thumb-fallback';
          fb.innerHTML = '<i class="fa-solid fa-clapperboard"></i>';
          this.replaceWith(fb);
        }
      });
      // YouTube returns a 120x90 placeholder instead of 404 for missing sizes
      img.addEventListener('load', function () {
        if (this.naturalWidth <= 120 && this.dataset.fallbacks) {
          const list = this.dataset.fallbacks.split('|');
          this.src = list.shift();
          this.dataset.fallbacks = list.join('|');
        }
      });
    });
  }

  function bindCards() {
    $$('.work-card').forEach((card) => {
      if (card.dataset.bound) return;
      card.dataset.bound = '1';
      card.addEventListener('click', () => openProject(card.dataset.id));
    });
  }

  /* ---------- History series ---------- */
  function renderHistory() {
    const grid = $('#history-grid');
    grid.innerHTML = HISTORY_SERIES.episodes.map(projectCard).join('');
    bindThumbFallbacks(grid);
    bindCards();
    observeReveals();
  }

  $('#filter-bar').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    $$('.filter-btn').forEach((b) => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn); });
    renderPortfolio();
  });

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox'), lbPlayer = $('#lightbox-player'), lbDialog = $('#lightbox-dialog');

  function openProject(id) {
    const p = ALL_PLAYABLE().find((x) => x.id === id);
    if (!p) return;
    const url = embedUrl(p);
    if (!url) { window.open(externalUrl(p), '_blank', 'noopener'); return; }

    lbDialog.classList.toggle('vertical', p.orientation === 'vertical');
    lbPlayer.innerHTML = `<iframe src="${url}" title="${esc(p.title[lang])}" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    $('#lightbox-title').textContent = p.title[lang];
    const ext = $('#lightbox-ext');
    ext.href = externalUrl(p);
    ext.querySelector('span').textContent = p.type === 'youtube' ? t('work.ytHint') : t('work.open');
    ext.classList.toggle('is-youtube', p.type === 'youtube');
    ext.querySelector('i').className = p.type === 'youtube' ? 'fa-brands fa-youtube' : 'fa-solid fa-arrow-up-right-from-square';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    lbPlayer.innerHTML = '';
    document.body.classList.remove('no-scroll');
  }
  $('#lightbox-close').addEventListener('click', closeLightbox);
  $('#lightbox-backdrop').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox(); });

  /* ---------- Results ---------- */
  let resultsFilter = 'all';

  function formatViews(v) {
    // "166K" → number + unit (same size, unit tinted)
    const m = String(v).match(/^([\d.,]+)\s*([A-Za-z+]*)$/);
    if (!m) return esc(v);
    return `${m[1]}<small>${m[2]}</small>`;
  }

  const viewsToNum = (v) => {
    const m = String(v).match(/^([\d.,]+)\s*([KkMm]?)/);
    if (!m) return 0;
    const n = parseFloat(m[1].replace(',', ''));
    return m[2].toUpperCase() === 'M' ? n * 1e6 : m[2].toUpperCase() === 'K' ? n * 1e3 : n;
  };

  function sortedResults() {
    const order = RESULT_INDUSTRIES.map((i) => i.id);
    return RESULTS.slice().sort((a, b) => {
      const d = order.indexOf(a.industry) - order.indexOf(b.industry);
      return d !== 0 ? d : viewsToNum(b.views) - viewsToNum(a.views);
    });
  }

  function renderResultsFilter() {
    $('#results-filter').innerHTML = RESULT_INDUSTRIES.map((ind) => `
      <button class="filter-btn ${ind.id === resultsFilter ? 'active' : ''}" type="button" role="tab"
        data-industry="${ind.id}" aria-selected="${ind.id === resultsFilter}">${esc(ind.label[lang])}</button>`).join('');
  }

  function renderResults() {
    renderResultsFilter();
    const list = sortedResults().filter((r) => resultsFilter === 'all' || r.industry === resultsFilter);
    const industryCard = (id) => {
      const ind = RESULT_INDUSTRIES.find((i) => i.id === id);
      return ind ? (ind.card || ind.label)[lang] : id;
    };
    $('#results-grid').innerHTML = list.map((r) => {
      const label = industryCard(r.industry);
      return `
      <figure class="result-card reveal ${r.pos ? 'crop-' + r.pos : ''}">
        <img src="${r.img}" alt="${esc(label)} reel — ${esc(r.views)} views" loading="lazy">
        <span class="result-label">${esc(label)}</span>
        <figcaption class="result-views"><i class="fa-regular fa-eye"></i> <span class="stat-num">${formatViews(r.views)}</span></figcaption>
      </figure>`;
    }).join('');
    observeReveals();
  }

  $('#results-filter').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    resultsFilter = btn.dataset.industry;
    renderResults();
  });

  /* ---------- Testimonials ---------- */
  function renderTestimonials() {
    $('#testi-grid').innerHTML = TESTIMONIALS.map((x) => `
      <article class="testi-card reveal">
        <i class="fa-solid fa-quote-right testi-quote-icon" aria-hidden="true"></i>
        <div class="testi-stars" aria-label="5 stars">
          ${'<i class="fa-solid fa-star"></i>'.repeat(5)}
        </div>
        <blockquote>${esc(x.text[lang])}</blockquote>
        <div class="testi-author">
          <span class="testi-avatar">${esc(x.name[lang].charAt(0))}</span>
          <div><strong>${esc(x.name[lang])}</strong><small>${esc(x.role[lang])}</small></div>
        </div>
      </article>`).join('') + `<p class="testi-placeholder-note">${t('testi.note')}</p>`;
    observeReveals();
  }

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealObserver.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  function observeReveals() { $$('.reveal:not(.in)').forEach((el) => revealObserver.observe(el)); }
  // Safety net: never leave content hidden (slow IO, print, screenshots, odd browsers)
  setTimeout(() => $$('.reveal:not(.in)').forEach((el) => el.classList.add('in')), 2500);

  /* ---------- Counters ---------- */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count, dur = 1400, start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('.counter').forEach((el) => counterObserver.observe(el));

  /* ---------- Header / nav ---------- */
  const header = $('#site-header'), burger = $('#nav-burger'), navLinks = $('#nav-links');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('#nav-links a').forEach((a) => a.addEventListener('click', () => { navLinks.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));

  // active link highlight
  const sections = $$('main section[id]');
  const linkFor = (id) => $(`#nav-links a[href="#${id}"]`);
  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const link = linkFor(en.target.id);
      if (!link) return;
      if (en.isIntersecting) { $$('#nav-links a').forEach((l) => l.classList.remove('active')); link.classList.add('active'); }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => secObserver.observe(s));

  /* ---------- Contact form → WhatsApp ---------- */
  $('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#cf-name'), msg = $('#cf-msg'), type = $('#cf-type').value;
    let ok = true;
    [name, msg].forEach((f) => { const bad = !f.value.trim(); f.classList.toggle('invalid', bad); if (bad) ok = false; });
    if (!ok) return;
    const text = `${t('form.waIntro')} ${name.value.trim()}.\n${t('form.waType')}: ${type}\n${t('form.waDetails')}: ${msg.value.trim()}`;
    window.open(`https://wa.me/201113930448?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  /* ---------- Misc ---------- */
  $('#year').textContent = new Date().getFullYear();
  // duplicate marquee items for seamless loop
  const track = $('#marquee-track');
  track.innerHTML += track.innerHTML;

  applyLang();
  observeReveals();
})();
