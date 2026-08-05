/* ============================================================
   interactions.js  |  HomePage
   ============================================================ */

/* ------------------------------------------------------------
   Signature video (Partners header)
   Plays when scrolled into view. If autoplay is refused — low-power
   mode, data saver, background tab — park it on the final frame so the
   finished signature still shows instead of empty space.
   ------------------------------------------------------------ */
(function () {
  const sig = document.querySelector('.sig-vid');
  if (!sig) return;

  const park = () => {
    if (sig.paused && sig.duration) sig.currentTime = sig.duration - 0.05;
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sig.removeAttribute('autoplay');
    sig.addEventListener('loadeddata', park, { once: true });
    if (sig.readyState >= 2) park();
    return;
  }

  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) { sig.pause(); return; }
      const p = sig.play();
      if (p && p.catch) p.catch(() => {});
      setTimeout(park, 800);
    });
  }, { threshold: .25 }).observe(sig);
})();
