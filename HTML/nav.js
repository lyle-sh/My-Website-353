(function () {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  nav.innerHTML = `
<a href="HomePage.html" class="nav-logo">
  <img src="../Assets/logo/353-sans-fond.png" alt="353" class="logo-default">
  <img src="../Assets/logo/353-simple-sans-fond.png" alt="353" class="logo-hover">
</a>
<ul class="nav-links">
  <li><a href="HomePage.html#about" data-page="homepage">About</a></li>
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

  // Mark active link by current filename
  const page = window.location.pathname.split('/').pop().toLowerCase().replace('.html', '');
  nav.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });

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
