/* Kiruuu Dreambook — no framework or build step required. */
(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const apologies = [
  "Sorry for making your heart feel heavier instead of lighter.",
  "Sorry, Kiruuu. You deserved a softer moment from me.",
  "I'm sorry for the part I played in making things awkward.",
  "Sorry for not thinking enough about how my words might land.",
  "I'm sorry if I made you feel unheard.",
  "Sorry for letting a small thing feel bigger than it needed to.",
  "I'm sorry I didn't handle that in the best way.",
  "Sorry for the stress I added to your day.",
  "I'm sorry for not pausing and choosing my words better.",
  "Sorry, Kiruuu. I could've done better.",
  "I'm sorry if my actions didn't match how much I value you.",
  "Sorry for making you explain how you felt more than once.",
  "I'm sorry for being careless with something that mattered to you.",
  "Sorry for not giving the moment the patience it needed.",
  "I'm sorry if I made you feel like your feelings were too much.",
  "Sorry for the unnecessary tension.",
  "I'm sorry for missing the chance to respond more kindly.",
  "Sorry if I made a difficult moment even more difficult.",
  "I'm sorry for not listening as carefully as I should have.",
  "Sorry, Kiruuu. I don't want a silly mistake to sit between us.",
  "I'm sorry for being thoughtless.",
  "Sorry for not understanding your side sooner.",
  "I'm sorry if I made you question whether I care.",
  "Sorry for not showing up in the way you needed.",
  "I'm sorry for making you upset; that wasn't fair to you.",
  "Sorry for the words I chose.",
  "I'm sorry for the words I should've chosen instead.",
  "Sorry for not being more careful with your trust.",
  "I'm sorry if I turned a conversation into a mess.",
  "Sorry for not taking a breath before reacting.",
  "I'm sorry for any hurt I caused, even if I didn't intend it.",
  "Sorry for not making space for your point of view.",
  "I'm sorry for letting my mood affect you.",
  "Sorry for making you deal with my mistake.",
  "I'm sorry for not getting it right the first time.",
  "Sorry for the awkwardness I brought into our friendship.",
  "I'm sorry if I made you feel overlooked.",
  "Sorry for not being more thoughtful in that moment.",
  "I'm sorry for the tiny storm I helped create.",
  "Sorry, Kiruuu. You deserved a better response.",
  "I'm sorry for not choosing kindness quickly enough.",
  "Sorry if I made you feel like you had to defend yourself.",
  "I'm sorry for not asking instead of assuming.",
  "Sorry for being a little too stubborn.",
  "I'm sorry for not explaining myself clearly.",
  "Sorry for the confusion I caused.",
  "I'm sorry for making a moment that should've been simple feel complicated.",
  "Sorry for not recognising the impact sooner.",
  "I'm sorry for the part I played, and I own that.",
  "Sorry for not doing better when it counted.",
  "I'm sorry if I made you feel distant from me.",
  "Sorry for not checking in properly.",
  "I'm sorry for being less considerate than you deserved.",
  "Sorry for making you carry an uncomfortable feeling.",
  "I'm sorry for not handling your trust with enough care.",
  "Sorry for missing what you were trying to tell me.",
  "I'm sorry for being a little dum-dum in that moment.",
  "Sorry, even my imaginary Gojo would tell me to do better.",
  "I'm sorry for not using my one brain cell responsibly.",
  "Sorry for the emotional buffering screen I caused.",
  "I'm sorry for being a side quest when you needed peace.",
  "Sorry for the plot twist nobody asked for.",
  "I'm sorry for making the vibe go from ✨ to ...",
  "Sorry for being a certified silly goose.",
  "I'm sorry; I should've updated my friendship software.",
  "Sorry for the lag in my common sense.",
  "I'm sorry for making a tiny issue feel like a season finale.",
  "Sorry, Kiruuu. My brain really said 'skip tutorial'.",
  "I'm sorry for not reading the room properly.",
  "Sorry for being the reason the peace got interrupted.",
  "I'm sorry for acting before thinking. Not my finest episode.",
  "I'm sorry for being a little too chaotic at the wrong time.",
  "Sorry for not being the calm, sensible person I pretend to be.",
  "I'm sorry for the awkward silence or weird vibes.",
  "Sorry for not giving you the kind version of my thoughts.",
  "I'm sorry for letting a bad moment speak louder than our friendship.",
  "Sorry for not being more gentle with the situation.",
  "I'm sorry for not making things right sooner.",
  "Sorry for every extra ounce of stress I added.",
  "I'm sorry if my apology is late, but I still mean it.",
  "Sorry for not being perfect at friendship—but I can keep learning.",
  "I'm sorry for the part that was mine to fix.",
  "Sorry for not doing a better job of understanding you.",
  "I'm sorry for making you feel bad, even unintentionally.",
  "Sorry for not being more mindful of your boundaries.",
  "I'm sorry for the frustration I caused.",
  "Sorry for not being more patient.",
  "I'm sorry for not choosing the best time to say things.",
  "Sorry for any moment I made you feel alone in it.",
  "I'm sorry for not being the best version of myself in that moment.",
  "Sorry for not showing enough care through my actions.",
  "I'm sorry for the hurt, the confusion, and the weirdness.",
  "Sorry for not being more thoughtful before I spoke.",
  "I'm sorry for letting one moment get in the way of the good stuff.",
  "Sorry for making you deal with something I could've handled better.",
  "I'm sorry, Kiruuu. Your feelings matter to me.",
  "Sorry for the mess; I'm willing to listen and learn.",
  "I'm sorry. No pressure to reply before you're ready.",
  "Sorry, Kiruuu. I care about you, and I'll try to do better.",
  "One last sorry: I hope we can find our way back to a comfy vibe, at your pace."
];
  const pageSize = 10;
  let currentGroup = 0;
  const opened = new Set();

  function scrollToTarget(selector) {
    const target = $(selector);
    if (target) target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }
  $('#begin')?.addEventListener('click', () => scrollToTarget('#greeting'));
  $$('[data-scroll]').forEach(button => button.addEventListener('click', () => scrollToTarget(button.dataset.scroll)));

  // Reveal sections as they enter the viewport; fall back to visible content.
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }
  reduceMotion.addEventListener?.('change', event => {
    if (event.matches) revealItems.forEach(item => item.classList.add('visible'));
  });

  // Ten apologies are rendered at a time to keep the mobile view focused.
  const sorryGrid = $('#sorry-grid');
  const rangeLabel = $('#sorry-range');
  const openedLabel = $('#sorry-progress-text');
  const progress = $('#sorry-progress');
  const progressFill = $('#sorry-progress-fill');
  const previousButton = $('#prev-group');
  const nextButton = $('#next-group');
  function updateProgress() {
    const count = opened.size;
    openedLabel.textContent = `${count} opened`;
    progress.setAttribute('aria-valuenow', String(count));
    progressFill.style.width = `${count}%`;
  }
  function renderApologies() {
    const start = currentGroup * pageSize;
    const end = Math.min(start + pageSize, apologies.length);
    rangeLabel.textContent = `${String(start + 1).padStart(2, '0')}–${String(end).padStart(2, '0')} of 100`;
    sorryGrid.replaceChildren();
    apologies.slice(start, end).forEach((message, index) => {
      const number = start + index + 1;
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'sorry-card';
      card.setAttribute('aria-expanded', opened.has(number) ? 'true' : 'false');
      card.setAttribute('aria-label', `Sorry ${number}, tap to ${opened.has(number) ? 'open or close' : 'reveal'}`);
      const num = document.createElement('span'); num.className = 'sorry-number'; num.textContent = String(number).padStart(2, '0');
      const text = document.createElement('span'); text.className = 'sorry-message'; text.textContent = opened.has(number) ? message : 'tap to open ♡';
      const mark = document.createElement('span'); mark.className = 'sorry-mark'; mark.setAttribute('aria-hidden', 'true'); mark.textContent = opened.has(number) ? '−' : '＋';
      card.append(num, text, mark);
      card.addEventListener('click', () => {
        const isOpen = card.getAttribute('aria-expanded') !== 'true';
        card.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) { opened.add(number); text.textContent = message; }
        else { text.textContent = 'tap to open ♡'; }
        card.setAttribute('aria-label', `Sorry ${number}, ${isOpen ? 'close' : 'reveal'} card`);
        mark.textContent = isOpen ? '−' : '＋';
        updateProgress();
      });
      sorryGrid.append(card);
    });
    previousButton.disabled = currentGroup === 0;
    nextButton.disabled = end >= apologies.length;
  }
  previousButton.addEventListener('click', () => { if (currentGroup > 0) { currentGroup--; renderApologies(); scrollToTarget('#sorries-title'); } });
  nextButton.addEventListener('click', () => { if ((currentGroup + 1) * pageSize < apologies.length) { currentGroup++; renderApologies(); scrollToTarget('#sorries-title'); } });
  renderApologies(); updateProgress();

  // Playful reveal cards.
  $$('.joke-card').forEach(card => card.addEventListener('click', () => {
    const open = card.getAttribute('aria-expanded') !== 'true';
    card.setAttribute('aria-expanded', String(open));
    const plus = $('.card-plus', card);
    if (plus) plus.textContent = open ? '−' : '＋';
  }));

  // Personal notes use the same accessible expanded-state pattern.
  $$('.note-card').forEach(card => card.addEventListener('click', () => {
    const open = card.getAttribute('aria-expanded') !== 'true';
    card.setAttribute('aria-expanded', String(open));
    const action = $('.note-action', card);
    if (action) action.innerHTML = open ? 'close note <span aria-hidden="true">−</span>' : 'open note <span aria-hidden="true">↗</span>';
  }));

  // Accessible photo lightbox, including Escape and focus return.
  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightbox-image');
  const lightboxClose = $('#lightbox-close');
  let lastFocused = null;
  function openLightbox(button) {
    const image = $('img', button);
    if (!image) return;
    lastFocused = button;
    lightboxImage.src = button.dataset.img;
    lightboxImage.alt = button.dataset.alt || image.alt || 'Expanded photograph';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }
  $$('[data-img]').forEach(button => button.addEventListener('click', () => openLightbox(button)));
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    if (event.key === 'Tab' && !lightbox.hidden) {
      const focusable = $$('button:not([disabled])', lightbox);
      if (focusable.length === 1) { event.preventDefault(); focusable[0].focus(); }
    }
  });

  // Her confirmed favourite palette: wine red, grey, and black.
  // The palette is decorative only; original photographs are never filtered or altered.
  const favouritePalette = $('.favourites-intro');
  if (favouritePalette) {
    const palette = ['#651c32', '#858187', '#171619'];
    let paletteIndex = 0;
    window.setInterval(() => {
      if (reduceMotion.matches || !favouritePalette.isConnected) return;
      paletteIndex = (paletteIndex + 1) % palette.length;
      favouritePalette.style.setProperty('--palette-glow', palette[paletteIndex]);
    }, 2600);
  }

  // A small visual surprise; no extra text or external services required.
  const sparkleButton = $('#sparkle-button');
  const sparkleFeedback = $('#sparkle-feedback');
  sparkleButton.addEventListener('click', () => {
    sparkleFeedback.hidden = false;
    sparkleButton.textContent = 'a little sparkle for you ♡';
    if (!reduceMotion.matches) {
      const toast = $('#toast');
      toast.hidden = false;
      window.setTimeout(() => { toast.hidden = true; }, 1500);
    }
  });

  // Final camera-inspired animation. It does not access the real camera.
  const cameraButton = $('#camera-button');
  const flash = $('#camera-flash');
  const closingLine = $('#closing-line');
  const replayButton = $('#replay-button');
  function takeTinyPhotoMoment() {
    flash.classList.remove('fire');
    // Force reflow so replaying restarts the CSS animation.
    void flash.offsetWidth;
    if (!reduceMotion.matches) flash.classList.add('fire');
    closingLine.hidden = false;
    replayButton.hidden = false;
    cameraButton.textContent = 'captured with care ♡';
    if (!reduceMotion.matches) closingLine.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' });
  }
  cameraButton.addEventListener('click', takeTinyPhotoMoment);
  replayButton.addEventListener('click', takeTinyPhotoMoment);
})();
