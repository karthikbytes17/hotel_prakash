/* ═══════════════════════════════════════════════════════════════
   HOTEL PRAKASH KARKALA — js/script.js
   Pure Vanilla JavaScript — no frameworks
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   CONFIGURATION — edit these values easily
───────────────────────────────────────────── */
const CONFIG = {
  // Hotel WhatsApp number (international format, no + or spaces)
  WHATSAPP_NUMBER: '919632826562',

  // Hotel phone numbers
  PHONE_RECEPTION: 'tel:08258234981',
  PHONE_MOBILE:    'tel:09632826562',
  PHONE_RESTAURANT:'tel:08296363662',

  // Hotel email
  EMAIL: 'htlprakashkrkl@gmail.com',

  // Google Maps link
  MAPS_URL: 'https://maps.google.com/?q=Hotel+Prakash+Karkala+Karnataka+Shayana+Temple+SH37',

  // Room rates — set to empty string or null if not available
  // Client can update these values here
  ROOM_RATES: {
    'AC Room':       null,
    'Non-AC Room':   null,
    'AC Deluxe Room':null,
    'Family Room':   null
  }
};

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getRate(roomName) {
  const rate = CONFIG.ROOM_RATES[roomName];
  return (rate && rate !== '') ? rate : 'Please confirm with hotel';
}

/* ─────────────────────────────────────────────
   HEADER — scroll effect & active nav
───────────────────────────────────────────── */
(function initHeader() {
  const header = $('#site-header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Active nav link on scroll
  const sections = $$('section[id], footer[id]');
  const navLinks = $$('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    let current = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current) link.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
})();

/* ─────────────────────────────────────────────
   HAMBURGER MENU
───────────────────────────────────────────── */
(function initHamburger() {
  const hamburger = $('#hamburger');
  const nav = $('#main-nav');
  if (!hamburger || !nav) return;

  function openNav() {
    nav.classList.add('nav-open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    nav.classList.remove('nav-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (nav.classList.contains('nav-open')) closeNav();
    else openNav();
  });

  // Close when nav link clicked
  $$('.nav-link', nav).forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
  });
})();

/* ─────────────────────────────────────────────
   SMOOTH SCROLL — all anchor links
───────────────────────────────────────────── */
(function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = link.getAttribute('href');
    if (target === '#') return;
    const el = document.querySelector(target);
    if (!el) return;
    e.preventDefault();
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* ─────────────────────────────────────────────
   FOOTER YEAR
───────────────────────────────────────────── */
(function setFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ─────────────────────────────────────────────
   SET MIN DATES on date inputs
───────────────────────────────────────────── */
(function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  $$('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
  });

  // Widget: check-in → set min for check-out
  const wIn  = $('#w-checkin');
  const wOut = $('#w-checkout');
  if (wIn && wOut) {
    wIn.addEventListener('change', () => {
      if (wIn.value) {
        wOut.setAttribute('min', wIn.value);
        if (wOut.value && wOut.value <= wIn.value) wOut.value = '';
      }
    });
  }

  const bIn  = $('#b-checkin');
  const bOut = $('#b-checkout');
  if (bIn && bOut) {
    bIn.addEventListener('change', () => {
      if (bIn.value) {
        bOut.setAttribute('min', bIn.value);
        if (bOut.value && bOut.value <= bIn.value) bOut.value = '';
      }
    });
  }
})();

/* ─────────────────────────────────────────────
   ROOM FILTERS
───────────────────────────────────────────── */
(function initRoomFilters() {
  const filterBtns = $$('.filter-btn');
  const roomCards  = $$('.room-card');
  if (!filterBtns.length || !roomCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      roomCards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden-card');
        } else {
          const cat = card.dataset.category;
          if (cat === filter) {
            card.classList.remove('hidden-card');
          } else {
            card.classList.add('hidden-card');
          }
        }
      });
    });
  });
})();

/* ─────────────────────────────────────────────
   GALLERY FILTERS + LIGHTBOX
───────────────────────────────────────────── */
(function initGallery() {
  // --- Filters ---
  const gFilterBtns = $$('.gallery-filter-btn');
  const gItems = $$('.gallery-item');

  gFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.gfilter;
      gItems.forEach(item => {
        if (filter === 'all' || item.dataset.gcategory === filter) {
          item.classList.remove('hidden-gallery');
        } else {
          item.classList.add('hidden-gallery');
        }
      });
      // rebuild visible items for lightbox nav
      buildVisibleItems();
    });
  });

  // --- Lightbox ---
  const lightbox     = $('#lightbox');
  const lbImg        = $('#lightbox-img');
  const lbCaption    = $('#lightbox-caption');
  const lbClose      = $('#lightbox-close');
  const lbOverlay    = $('#lightbox-overlay');
  const lbPrev       = $('#lightbox-prev');
  const lbNext       = $('#lightbox-next');

  if (!lightbox) return;

  let visibleItems = [];
  let currentIndex = 0;

  function buildVisibleItems() {
    visibleItems = gItems.filter(item => !item.classList.contains('hidden-gallery'));
  }
  buildVisibleItems();

  function openLightbox(index) {
    if (!visibleItems[index]) return;
    currentIndex = index;
    const item = visibleItems[index];
    const img = item.querySelector('img');
    const imgBox = item.querySelector('.gitem-img');
    const src = img ? img.getAttribute('src') : '';
    const alt = img ? img.getAttribute('alt') : '';
    const caption = item.dataset.caption || alt || '';

    if (src && img && !imgBox.classList.contains('img-placeholder')) {
      lbImg.src = src;
      lbImg.alt = alt;
      lbImg.style.display = '';
    } else {
      lbImg.src = '';
      lbImg.alt = caption;
      lbImg.style.display = 'none';
    }
    lbCaption.textContent = caption;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update nav buttons
    lbPrev.style.opacity = index === 0 ? '0.3' : '1';
    lbNext.style.opacity = index === visibleItems.length - 1 ? '0.3' : '1';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function prevImage() {
    if (currentIndex > 0) openLightbox(currentIndex - 1);
  }
  function nextImage() {
    if (currentIndex < visibleItems.length - 1) openLightbox(currentIndex + 1);
  }

  // Open on click
  gItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      buildVisibleItems();
      const visIndex = visibleItems.indexOf(item);
      if (visIndex !== -1) openLightbox(visIndex);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbOverlay.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prevImage);
  lbNext.addEventListener('click', nextImage);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? nextImage() : prevImage(); }
  });
})();

/* ─────────────────────────────────────────────
   BOOKING MODAL
───────────────────────────────────────────── */
(function initBookingModal() {
  const modal    = $('#booking-modal');
  const step1    = $('#modal-step-1');
  const step2    = $('#modal-step-2');
  const form     = $('#booking-form');
  const closeBtn = $('#modal-close');
  const backBtn  = $('#btn-back-form');
  const waBtn    = $('#btn-whatsapp-booking');
  if (!modal) return;

  // Open triggers
  const openBtns = [
    $('#btn-book-nav'),
    $('#btn-book-hero'),
    $('#btn-book-location'),
    $('#btn-sticky-book'),
    $('#btn-book-footer'),
    $('#btn-widget-check')
  ];

  function openModal(preselectedRoom) {
    // pre-fill from widget if available
    const wIn    = $('#w-checkin');
    const wOut   = $('#w-checkout');
    const wGuest = $('#w-guests');
    const wRoom  = $('#w-room');

    const bIn    = $('#b-checkin');
    const bOut   = $('#b-checkout');
    const bGuest = $('#b-guests');
    const bRoom  = $('#b-room');

    if (wIn && wIn.value && bIn)  bIn.value  = wIn.value;
    if (wOut && wOut.value && bOut) bOut.value = wOut.value;
    if (wGuest && bGuest) bGuest.value = wGuest.value;
    if (preselectedRoom && bRoom) {
      bRoom.value = preselectedRoom;
    } else if (wRoom && wRoom.value && bRoom) {
      bRoom.value = wRoom.value;
    }

    showStep(1);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { const first = modal.querySelector('input, select'); if (first) first.focus(); }, 100);
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    // Only restore scroll if no other modal is open
    const roomModal = $('#room-modal');
    if (!roomModal || !roomModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  function showStep(n) {
    step1.classList.toggle('hidden', n !== 1);
    step2.classList.toggle('hidden', n !== 2);
  }

  openBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => openModal());
  });

  // "Book This Room" buttons (delegated — works from any context incl. room modal)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-book-room');
    if (!btn) return;
    // Close room details modal if open
    const roomModal = $('#room-modal');
    if (roomModal && roomModal.classList.contains('active')) {
      roomModal.classList.remove('active');
      roomModal.setAttribute('aria-hidden', 'true');
    }
    openModal(btn.dataset.room);
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
  if (backBtn) backBtn.addEventListener('click', () => showStep(1));

  // Form validation & submission
  function clearErrors() {
    $$('.field-error', form).forEach(el => el.textContent = '');
    $$('.error', form).forEach(el => el.classList.remove('error'));
  }
  function setError(inputId, errId, msg) {
    const inp = $('#' + inputId, form);
    const err = $('#' + errId, form);
    if (inp) inp.classList.add('error');
    if (err) err.textContent = msg;
    return false;
  }

  function validateForm() {
    clearErrors();
    let valid = true;
    const name    = $('#b-name', form);
    const phone   = $('#b-phone', form);
    const checkin = $('#b-checkin', form);
    const checkout= $('#b-checkout', form);
    const guests  = $('#b-guests', form);
    const room    = $('#b-room', form);

    if (!name.value.trim())
      valid = setError('b-name', 'err-b-name', 'Please enter your name.');
    if (!phone.value.trim())
      valid = setError('b-phone', 'err-b-phone', 'Please enter your phone number.');
    if (!checkin.value)
      valid = setError('b-checkin', 'err-b-checkin', 'Please select a check-in date.');
    if (!checkout.value)
      valid = setError('b-checkout', 'err-b-checkout', 'Please select a check-out date.');
    else if (checkin.value && checkout.value <= checkin.value)
      valid = setError('b-checkout', 'err-b-checkout', 'Check-out must be after check-in.');
    if (!guests.value)
      valid = setError('b-guests', 'err-b-guests', 'Please select number of guests.');
    if (!room.value)
      valid = setError('b-room', 'err-b-room', 'Please select a room type.');

    return valid;
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm()) return;

      const name     = $('#b-name', form).value.trim();
      const phone    = $('#b-phone', form).value.trim();
      const checkin  = $('#b-checkin', form).value;
      const checkout = $('#b-checkout', form).value;
      const guests   = $('#b-guests', form).value;
      const room     = $('#b-room', form).value;
      const message  = $('#b-message', form).value.trim();
      const rate     = getRate(room);

      // Populate summary
      const summary = $('#booking-summary');
      if (summary) {
        summary.innerHTML = `
          <div class="summary-row"><span class="s-label">Name</span><span class="s-value">${escapeHTML(name)}</span></div>
          <div class="summary-row"><span class="s-label">Room</span><span class="s-value">${escapeHTML(room)}</span></div>
          <div class="summary-row"><span class="s-label">Check-in</span><span class="s-value">${formatDate(checkin)}</span></div>
          <div class="summary-row"><span class="s-label">Check-out</span><span class="s-value">${formatDate(checkout)}</span></div>
          <div class="summary-row"><span class="s-label">Guests</span><span class="s-value">${escapeHTML(guests)}</span></div>
          <div class="summary-row"><span class="s-label">Phone</span><span class="s-value">${escapeHTML(phone)}</span></div>
          <div class="summary-row"><span class="s-label">Rate</span><span class="s-value">${escapeHTML(rate)}</span></div>
          ${message ? `<div class="summary-row"><span class="s-label">Message</span><span class="s-value">${escapeHTML(message)}</span></div>` : ''}
        `;
      }

      // Build WhatsApp URL
      const waText = buildWhatsAppMessage({ name, room, checkin, checkout, guests, phone, message, rate });
      if (waBtn) {
        waBtn.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
      }

      showStep(2);
    });
  }
})();

/* ─────────────────────────────────────────────
   ROOM DETAILS MODAL
───────────────────────────────────────────── */
(function initRoomDetails() {
  const modal      = $('#room-modal');
  const closeBtn   = $('#room-modal-close');
  const content    = $('#room-modal-content');
  if (!modal || !closeBtn || !content) return;

  const roomData = {
    'AC Room': {
      badge: 'AC',
      type: 'Air Conditioned',
      features: ['Air Conditioning','Hot Water','Television','Clean Linen','Fresh Towels','Bathing Soaps','Attached Bathroom'],
      guests: 'Up to 2 Guests',
      imgSrc: 'images/rooms/doubleac.jpg',
      imgAlt: 'Double AC Room at Hotel Prakash'
    },
    'Non-AC Room': {
      badge: 'Non-AC',
      type: 'Fan Cooled',
      features: ['Ceiling Fan','Hot Water','Television','Clean Linen','Fresh Towels','Bathing Soaps','Attached Bathroom'],
      guests: 'Up to 2 Guests',
      imgSrc: 'images/rooms/doublenonac.jpg',
      imgAlt: 'Double Non-AC Room at Hotel Prakash'
    },
    'AC Deluxe Room': {
      badge: 'AC Deluxe',
      type: 'Air Conditioned — Deluxe',
      features: ['Air Conditioning','Hot Water','Television','Clean Linen','Fresh Towels','Bathing Soaps','Attached Bathroom'],
      guests: 'Up to 2 Guests',
      imgSrc: 'images/rooms/3bed.jpg',
      imgAlt: '3-Bed AC Room at Hotel Prakash'
    },
    'Family Room': {
      badge: 'Family',
      type: 'Air Conditioned — Family',
      features: ['Air Conditioning','Hot Water','Television','Clean Linen','Fresh Towels','Bathing Soaps','Attached Bathroom','Extra Space'],
      guests: 'Up to 4 Guests',
      imgSrc: 'images/rooms/4bed.jpg',
      imgAlt: '4-Bed Family Room at Hotel Prakash'
    }
  };

  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-details');
    if (!btn) return;
    const roomName = btn.dataset.room;
    const data = roomData[roomName];
    if (!data) return;

    const rate = getRate(roomName);
    const featuresHTML = data.features.map(f => `<div class="rmd-feat">${f}</div>`).join('');

    content.innerHTML = `
      <div class="room-modal-inner">
        <div class="rmd-header">
          <p class="rmd-type">${data.badge} · ${data.guests}</p>
          <h2 class="rmd-title" id="room-modal-title">${roomName}</h2>
        </div>
        <div class="rmd-img img-box">
          <img src="${data.imgSrc}" alt="${data.imgAlt}" loading="lazy" />
        </div>
        <p class="rmd-features-title">Room Features</p>
        <div class="rmd-features">${featuresHTML}</div>
        <div class="rmd-rate-row">
          <span class="rmd-rate-label">Room Rate</span>
          <span class="rmd-rate-value">${rate}</span>
        </div>
        <div class="rmd-actions">
          <button class="btn-primary btn-book-room" data-room="${roomName}">Book This Room</button>
          <a href="${CONFIG.PHONE_MOBILE}" class="btn-outline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 9.93a19.79 19.79 0 01-3.07-8.67A2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call Hotel
          </a>
        </div>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  function closeRoomModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    // Only restore scroll if booking modal is also not open
    const bookModal = $('#booking-modal');
    if (!bookModal || !bookModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  closeBtn.addEventListener('click', closeRoomModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeRoomModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeRoomModal();
  });
})();

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
(function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  function clearErrors() {
    $$('.field-error', form).forEach(el => el.textContent = '');
    $$('.error', form).forEach(el => el.classList.remove('error'));
  }
  function setError(inputId, errId, msg) {
    const inp = $('#' + inputId, form);
    const err = $('#' + errId, form);
    if (inp) inp.classList.add('error');
    if (err) err.textContent = msg;
    return false;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const name    = $('#cf-name', form);
    const phone   = $('#cf-phone', form);
    const message = $('#cf-message', form);

    if (!name.value.trim())
      valid = setError('cf-name', 'err-cf-name', 'Please enter your name.');
    if (!phone.value.trim())
      valid = setError('cf-phone', 'err-cf-phone', 'Please enter your phone number.');
    if (!message.value.trim())
      valid = setError('cf-message', 'err-cf-message', 'Please enter a message.');

    if (!valid) return;

    const text = buildContactWhatsApp({
      name: name.value.trim(),
      phone: phone.value.trim(),
      email: $('#cf-email', form).value.trim(),
      message: message.value.trim()
    });

    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });
})();

/* ─────────────────────────────────────────────
   WHATSAPP MESSAGE BUILDERS
───────────────────────────────────────────── */
function buildWhatsAppMessage({ name, room, checkin, checkout, guests, phone, message, rate }) {
  const lines = [
    'Hello Hotel Prakash,',
    '',
    'I would like to enquire about a room booking.',
    '',
    `Name: ${name}`,
    `Room: ${room}`,
    `Check-in: ${formatDate(checkin)}`,
    `Check-out: ${formatDate(checkout)}`,
    `Guests: ${guests}`,
    `Phone: ${phone}`
  ];
  if (rate && rate !== 'Please confirm with hotel') {
    lines.push(`Rate Info: ${rate}`);
  }
  if (message) {
    lines.push(`Message: ${message}`);
  }
  lines.push('');
  lines.push('Please confirm availability and final tariff.');
  lines.push('');
  lines.push('Thank you.');
  return lines.join('\n');
}

function buildContactWhatsApp({ name, phone, email, message }) {
  const lines = [
    'Hello Hotel Prakash,',
    '',
    'I have an enquiry.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`
  ];
  if (email) lines.push(`Email: ${email}`);
  lines.push('');
  lines.push(`Message: ${message}`);
  lines.push('');
  lines.push('Thank you.');
  return lines.join('\n');
}

/* ─────────────────────────────────────────────
   ESCAPE HTML UTILITY
───────────────────────────────────────────── */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
(function initScrollReveal() {
  const revealEls = $$('.section-title, .section-eyebrow, .room-card, .service-card, .location-card, .discover-card, .contact-item, .rest-item, .fact-item');
  
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger children in groups of 4
    if (i % 4 === 1) el.classList.add('reveal-delay-1');
    if (i % 4 === 2) el.classList.add('reveal-delay-2');
    if (i % 4 === 3) el.classList.add('reveal-delay-3');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    $$('.reveal').forEach(el => el.classList.add('visible'));
  }
})();

/* ─────────────────────────────────────────────
   SCROLL TO TOP BUTTON
───────────────────────────────────────────── */
(function initScrollTop() {
  // Create button
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─────────────────────────────────────────────
   HERO BOOKING WIDGET → open modal
───────────────────────────────────────────── */
(function initWidgetButton() {
  const btn = $('#btn-widget-check');
  if (!btn) return;
  // The btn-widget-check is already covered by openBtns in booking modal init above
  // This ensures the room type from widget pre-fills into modal
})();

/* ─────────────────────────────────────────────
   IMAGE FALLBACK — ensure img-placeholder data-label is set
───────────────────────────────────────────── */
(function fixImageFallbacks() {
  $$('.img-box').forEach(box => {
    const img = box.querySelector('img');
    if (img) {
      img.addEventListener('error', function() {
        if (!box.getAttribute('data-label')) {
          box.setAttribute('data-label', img.alt || 'Hotel Prakash');
        }
        box.classList.add('img-placeholder');
      });
    }
  });
})();

/* ─────────────────────────────────────────────
   PREVENT MODAL SCROLL BLEED — handle body overflow
───────────────────────────────────────────── */
(function handleModalScroll() {
  // Ensure only one overflow hidden is applied/removed
  let openCount = 0;
  const origOpen = window._modalOpen;
  const origClose = window._modalClose;
  // Already handled per-modal above; this is a safety net.
})();

/* ─────────────────────────────────────────────
   CONSOLE — brand message
───────────────────────────────────────────── */
console.log('%cHotel Prakash Karkala', 'font-family:serif;font-size:20px;color:#b8973e;font-weight:bold');
console.log('%cShayana Temple, SH 37, Karkala, Karnataka 574234', 'font-size:12px;color:#6b5e4d');
console.log('%c📞 082582 34981 | 📱 +91 96328 26562', 'font-size:12px;color:#6b5e4d');
