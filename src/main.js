import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const EASE = 'expo.out';

/* Smooth scroll ---------------------------------------------------------- */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

function scrollToTarget(target) {
  const el = target === '#top' ? 0 : $(target);
  if (el === null) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else (el === 0 ? window.scrollTo(0, 0) : el.scrollIntoView());
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.getAttribute('href') === '#') return;
  const hash = a.getAttribute('href');
  if (hash !== '#top' && !$(hash)) return;
  e.preventDefault();
  if (menuOpen) closeMenu(false);
  scrollToTarget(hash);
  const focusTarget = hash === '#top' ? null : $(hash);
  if (focusTarget) {
    focusTarget.setAttribute('tabindex', '-1');
    focusTarget.focus({ preventScroll: true });
  }
});

/* Intro: the logo arrives, the point lands last ---------------------------- */
const logo = $('[data-logo]');
const punt = $('#punt');
const introFades = $$('[data-intro-fade]');

function introEntrance() {
  const salonLetters = $$('#salon .l');
  const dolaLetters = $$('#dola .l');
  if (reduced) {
    gsap.from([logo, ...introFades], { opacity: 0, duration: 1, stagger: 0.1 });
    return;
  }
  // SALON: the wide spacing opens from the centre outwards.
  const boxes = salonLetters.map((l) => l.getBBox());
  const mid = (boxes[0].x + boxes.at(-1).x + boxes.at(-1).width) / 2;
  gsap.timeline({ delay: 0.15 })
    .from(salonLetters, {
      x: (i) => (mid - (boxes[i].x + boxes[i].width / 2)) * 0.92,
      opacity: 0,
      duration: 1.6,
      ease: 'expo.inOut',
    })
    .from(dolaLetters, { yPercent: 40, opacity: 0, duration: 1.3, stagger: 0.07, ease: EASE }, '-=0.9')
    .from(punt, { scale: 0, transformOrigin: '50% 50%', duration: 1, ease: EASE }, '-=0.5')
    .from(introFades, { opacity: 0, y: 10, duration: 1.1, stagger: 0.1, ease: EASE }, '-=0.6');
}
introEntrance();

/* The salon opens from a point as it scrolls into view (no pin) ------------- */
const entree = $('[data-entree]');
if (!reduced) {
  gsap.fromTo(entree, { clipPath: 'circle(1% at 50% 50%)' }, {
    clipPath: 'circle(72% at 50% 50%)',
    ease: 'none',
    scrollTrigger: { trigger: entree, start: 'top 95%', end: 'top 10%', scrub: true },
  });
  gsap.fromTo($('img', entree), { scale: 1.25 }, {
    scale: 1,
    ease: 'none',
    scrollTrigger: { trigger: entree, start: 'top bottom', end: 'bottom top', scrub: true },
  });
} else {
  gsap.from(entree, { opacity: 0, duration: 1.2, scrollTrigger: { trigger: entree, start: 'top 85%', once: true } });
}

/* Werk: a native scroll row with arrows and mouse drag ---------------------- */
const werkView = $('[data-werk-viewport]');
const werkPrev = $('[data-werk-prev]');
const werkNext = $('[data-werk-next]');
const werkStep = () => Math.round(werkView.clientWidth * 0.7);
const werkState = () => {
  werkPrev.disabled = werkView.scrollLeft <= 4;
  werkNext.disabled = werkView.scrollLeft + werkView.clientWidth >= werkView.scrollWidth - 4;
};
werkPrev.addEventListener('click', () => werkView.scrollBy({ left: -werkStep() }));
werkNext.addEventListener('click', () => werkView.scrollBy({ left: werkStep() }));
werkView.addEventListener('scroll', werkState, { passive: true });
window.addEventListener('resize', werkState);
werkState();
if (finePointer) {
  let startX = 0, startScroll = 0, dragging = false, moved = false;
  werkView.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true; moved = false;
    startX = e.clientX; startScroll = werkView.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) { moved = true; werkView.classList.add('is-dragging'); }
    if (moved) werkView.scrollLeft = startScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    dragging = false;
    werkView.classList.remove('is-dragging');
  });
  // A drag should not open Instagram.
  werkView.addEventListener('click', (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
  werkView.addEventListener('dragstart', (e) => e.preventDefault());
}

/* Nav: mark after the intro, current section marked ------------------------ */
const nav = $('[data-nav]');
ScrollTrigger.create({
  trigger: '[data-entree]',
  start: 'top 40%',
  end: 'max',
  toggleClass: { targets: nav, className: 'is-past-intro' },
});
$$('[data-nav-link]').forEach((link) => {
  const section = $(link.getAttribute('href'));
  ScrollTrigger.create({
    trigger: section,
    start: 'top 45%',
    end: 'bottom 45%',
    onToggle: (self) => (self.isActive ? link.setAttribute('aria-current', 'true') : link.removeAttribute('aria-current')),
  });
});

/* Mobile dock: visible after the hero, hidden where booking is already on screen */
const dock = $('[data-dock]');
const dockState = { past: false, booking: false };
const syncDock = () => dock.classList.toggle('is-visible', dockState.past && !dockState.booking);
ScrollTrigger.create({ trigger: '[data-entree]', start: 'top 60%', end: 'max', onToggle: (s) => { dockState.past = s.isActive; syncDock(); } });
ScrollTrigger.create({ trigger: '#afspraak', start: 'top 85%', end: 'max', onToggle: (s) => { dockState.booking = s.isActive; syncDock(); } });

/* Headings: lines rise out of a mask ---------------------------------------- */
$$('[data-lines]').forEach((h) => {
  const lines = $$('.line > span', h);
  const vars = reduced
    ? { opacity: 0, duration: 1.2, stagger: 0.1 }
    : { yPercent: 110, duration: 1.5, stagger: 0.1, ease: EASE };
  gsap.from(lines, { ...vars, scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
});

/* Copy: quiet fades --------------------------------------------------------- */
$$('[data-fade]').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: reduced ? 0 : 24,
    duration: 1.4,
    ease: EASE,
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
  });
});

/* Photos: open from a point, then drift ----------------------------------- */
$$('[data-reveal]').forEach((fig) => {
  const img = $('img', fig);
  if (reduced) {
    gsap.from(fig, { opacity: 0, duration: 1.2, scrollTrigger: { trigger: fig, start: 'top 88%', once: true } });
    return;
  }
  gsap.fromTo(
    fig,
    { clipPath: 'circle(0% at 50% 50%)' },
    {
      clipPath: 'circle(75% at 50% 50%)',
      duration: 1.9,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: fig, start: 'top 85%', once: true },
      onComplete: () => gsap.set(fig, { clearProps: 'clipPath' }),
    },
  );
  if (img) {
    gsap.fromTo(img, { scale: 1.16, yPercent: -4 }, {
      yPercent: 4,
      ease: 'none',
      scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }
});

/* Menu ---------------------------------------------------------------------- */
const menu = $('[data-menu]');
const menuToggle = $('[data-menu-toggle]');
const menuLabel = $('.nav__menu-label', menuToggle);
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  menu.hidden = false;
  menu.getBoundingClientRect();
  menu.classList.add('is-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuLabel.textContent = 'Sluit';
  document.documentElement.classList.add('menu-open');
  lenis?.stop();
  document.documentElement.style.overflow = 'hidden';
  if (!reduced) {
    gsap.fromTo($$('.menu__list li', menu), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.06, ease: EASE, delay: 0.15 });
  }
  $('a', menu).focus({ preventScroll: true });
}
function closeMenu(returnFocus = true) {
  menuOpen = false;
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuLabel.textContent = 'Menu';
  document.documentElement.classList.remove('menu-open');
  lenis?.start();
  document.documentElement.style.overflow = '';
  const hide = () => { if (!menuOpen) menu.hidden = true; };
  reduced ? hide() : setTimeout(hide, 700);
  if (returnFocus) menuToggle.focus({ preventScroll: true });
}
menuToggle.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
document.addEventListener('keydown', (e) => {
  if (!menuOpen) return;
  if (e.key === 'Escape') closeMenu();
  if (e.key === 'Tab') {
    const focusables = [...$$('.nav a, .nav button'), ...$$('a', menu)];
    const i = focusables.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); focusables.at(-1).focus(); }
    else if (!e.shiftKey && i === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
  }
});

/* Cursor: the point ------------------------------------------------------- */
if (finePointer) {
  const dot = $('[data-cursor-dot]');
  document.documentElement.classList.add('has-cursor');
  const d = reduced ? 0 : 0.45;
  const xTo = gsap.quickTo(dot, 'x', { duration: d, ease: 'power3' });
  const yTo = gsap.quickTo(dot, 'y', { duration: d, ease: 'power3' });
  let state = '';
  const setState = (next) => {
    if (next === state) return;
    state = next;
    dot.classList.toggle('is-view', next === 'view');
    gsap.to(dot, { scale: next === 'view' ? 1 : next === 'link' ? 0.5 : 0.125, duration: reduced ? 0 : 0.6, ease: EASE });
  };
  setState('idle');
  window.addEventListener('pointermove', (e) => {
    xTo(e.clientX); yTo(e.clientY);
    const t = e.target instanceof Element ? e.target : null;
    if (t?.closest('[data-cursor="view"]')) setState('view');
    else if (t?.closest('.pill, .pill-check, .check, input, textarea')) setState('idle');
    else if (t?.closest('a, button')) setState('link');
    else setState('idle');
  }, { passive: true });
  document.addEventListener('pointerleave', () => gsap.to(dot, { scale: 0, duration: 0.3 }));
  document.addEventListener('pointerenter', () => { state = ''; setState('idle'); });
}

/* Appointment form ------------------------------------------------------- */
// Web3Forms access key for Tim's mailbox. Set VITE_WEB3FORMS_KEY in .env.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

const form = $('[data-form]');
const done = $('[data-form-done]');
const status = $('[data-form-status]');
const submit = $('[data-submit]');
const submitLabel = $('[data-submit-label]');
const extToggle = $('[data-ext-toggle]');
const extConfirm = $('[data-ext-confirm]');
const extBox = $('input', extConfirm);

extToggle.addEventListener('change', () => {
  extConfirm.hidden = !extToggle.checked;
  if (!extToggle.checked) { extBox.checked = false; setError(extBox, ''); }
  ScrollTrigger.refresh();
});

// "Vraag aan" on a treatment pre-selects it in the form.
$$('[data-service]').forEach((a) => a.addEventListener('click', () => {
  const box = $(`input[name="behandeling"][value="${a.dataset.service}"]`);
  if (box && !box.checked) {
    box.checked = true;
    box.dispatchEvent(new Event('change', { bubbles: true }));
  }
}));

function setError(input, message) {
  const err = $('#' + input.getAttribute('aria-describedby'));
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (err) err.textContent = message;
}

function validate() {
  const naam = form.elements.naam;
  const tel = form.elements.telefoon;
  const mail = form.elements.email;
  const checks = [
    [naam, naam.value.trim() ? '' : 'Vul je naam in.'],
    [tel, tel.value.replace(/\D/g, '').length >= 9 ? '' : 'Vul een telefoonnummer in waarop ik je kan bereiken.'],
    [mail, !mail.value.trim() || mail.checkValidity() ? '' : 'Dit e-mailadres klopt niet. Kijk het even na of laat het leeg.'],
  ];
  if (extToggle.checked) {
    checks.push([extBox, extBox.checked ? '' : 'Ik behandel enkel extensions die ik zelf geplaatst heb. Bevestig dit om verder te gaan.']);
  }
  let first = null;
  for (const [input, msg] of checks) {
    setError(input, msg);
    if (msg && !first) first = input;
  }
  return first;
}

form.addEventListener('input', (e) => {
  if (e.target.getAttribute('aria-invalid') === 'true') setError(e.target, '');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = '';
  status.classList.remove('is-error');
  const invalid = validate();
  if (invalid) { invalid.focus(); return; }

  const data = new FormData(form);
  if (data.get('botcheck')) return;
  const payload = {
    access_key: WEB3FORMS_KEY,
    subject: 'Nieuwe afspraakaanvraag via de website',
    from_name: 'Salon Dola website',
    naam: data.get('naam'),
    telefoon: data.get('telefoon'),
    email: data.get('email') || '',
    behandeling: data.getAll('behandeling').join(', ') || 'Niet opgegeven',
    geen_extensions_elders: extToggle.checked ? 'Bevestigd' : '',
    voorkeur: data.get('voorkeur') || '',
    bericht: data.get('bericht') || '',
  };

  submit.disabled = true;
  submitLabel.textContent = 'Bezig met versturen';
  try {
    if (!WEB3FORMS_KEY) {
      if (!import.meta.env.DEV) throw new Error('not-configured');
      await new Promise((r) => setTimeout(r, 900)); // Local preview without a key.
    } else {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error('send-failed');
    }
    showDone();
  } catch {
    status.textContent = 'Versturen lukte niet. Probeer het opnieuw of bel 09 223 25 65.';
    status.classList.add('is-error');
    submit.disabled = false;
    submitLabel.textContent = 'Verstuur aanvraag';
  }
});

function showDone() {
  form.hidden = true;
  done.hidden = false;
  if (!reduced) gsap.from(done.children, { opacity: 0, y: 16, duration: 1.2, stagger: 0.12, ease: EASE });
  done.focus({ preventScroll: true });
  const offset = -Math.round(window.innerHeight * 0.35);
  if (lenis) lenis.scrollTo(done, { offset, duration: 1.4 });
  else window.scrollTo(0, done.getBoundingClientRect().top + window.scrollY + offset);
  ScrollTrigger.refresh();
}

window.addEventListener('load', () => ScrollTrigger.refresh());
