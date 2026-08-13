(function () {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  nav.innerHTML = `
<a href="index.html" class="nav-logo">
  <img src="Assets/logo/353-sans-fond.png" alt="353" class="logo-default">
  <img src="Assets/logo/353-simple-sans-fond.png" alt="353" class="logo-hover">
</a>
<ul class="nav-links">
  <li><a href="index.html#about" data-page="homepage">About</a></li>
  <li><a href="Career.html"         data-page="career">Career</a></li>
  <li><a href="gallery.html"        data-page="gallery">Gallery</a></li>
  <li><a href="trackdays.html"      data-page="trackdays">Track Days</a></li>
  <li><a href="Partners.html"       data-page="partners">Partners</a></li>
</ul>
<div class="nav-r">
  <div class="soc">
    <a href="https://www.instagram.com/lyle.schofield/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
    <a href="https://www.youtube.com/channel/UCOOhixOmg9xK0StpdplDpQQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
    <a href="https://www.tiktok.com/@lyle.schofield" target="_blank" rel="noopener noreferrer" aria-label="TikTok">TT</a>
    <a href="https://www.facebook.com/lyle.schofield.racing" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
  </div>
  <a href="#" class="btn bo btn-sm">Shop</a>
</div>
<button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
  <span></span><span></span><span></span>
</button>`;

  // Mark active link by current filename. The homepage is served at "/" (empty
  // last segment) in production and as "index" locally, so both alias to homepage.
  const file = window.location.pathname.split('/').pop().toLowerCase().replace('.html', '');
  const page = (file === '' || file === 'index') ? 'homepage' : file;
  nav.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });

  // Hover preview image that trails the cursor over the nav links
  const PREVIEWS = {
    homepage:  'Assets/images/hero/driver-face.webp',
    career:    'Assets/images/hero/driver-podium-champain-face.webp',
    gallery:   'Assets/images/hero/driver-win-face.webp',
    trackdays: 'Assets/images/hero/driver-cockpit-front.webp',
    partners:  'Assets/images/hero/driver-outside-car-side.webp'
  };

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const box = document.createElement('div');
    box.className = 'nav-preview';
    box.setAttribute('aria-hidden', 'true');
    box.innerHTML = Object.entries(PREVIEWS)
      .map(([key, src]) => `<img src="${src}" alt="" data-for="${key}">`)
      .join('');
    document.body.appendChild(box);

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null, active = false, shown = null;

    const tick = () => {
      const ease = reduced ? 1 : .18;
      cx += (tx - cx) * ease;
      cy += (ty - cy) * ease;
      box.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      // Keep animating while hovered, then coast to a stop once caught up
      raf = (active || Math.abs(tx - cx) > .5 || Math.abs(ty - cy) > .5)
        ? requestAnimationFrame(tick)
        : null;
    };
    const run = () => { if (raf === null) raf = requestAnimationFrame(tick); };

    nav.querySelectorAll('.nav-links a[data-page]').forEach(link => {
      const img = box.querySelector(`img[data-for="${link.dataset.page}"]`);
      if (!img) return;

      link.addEventListener('mouseenter', e => {
        // First reveal jumps to the cursor instead of flying in from the corner
        tx = cx = e.clientX;
        ty = cy = e.clientY;
        if (shown) shown.classList.remove('on');
        img.classList.add('on');
        shown = img;
        active = true;
        box.classList.add('on');
        run();
      });

      link.addEventListener('mousemove', e => {
        tx = e.clientX;
        ty = e.clientY;
        run();
      });

      link.addEventListener('mouseleave', () => {
        active = false;
        box.classList.remove('on');
        img.classList.remove('on');
        if (shown === img) shown = null;
      });
    });
  }

  // Hamburger toggle
  const hamburger = nav.querySelector('.nav-hamburger');
  const navLinks  = nav.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();
