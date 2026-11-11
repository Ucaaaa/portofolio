(function () {
  document.documentElement.classList.add('js');

  // Tahun di footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Indikator level bahasa (titik rivet)
  document.querySelectorAll('.lang').forEach(function (el) {
    var level = parseInt(el.dataset.level, 10) || 0;
    var dots = el.querySelector('.dots');
    for (var i = 0; i < 5; i++) {
      var b = document.createElement('b');
      if (i >= level) b.className = 'off';
      dots.appendChild(b);
    }
  });

  // Menu mobile
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Animasi muncul saat scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var siblings = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
          e.target.style.transitionDelay = Math.min(siblings, 4) * 80 + 'ms';
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Menu aktif sesuai bagian yang terlihat
  var links = nav.querySelectorAll('a');
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  window.addEventListener('scroll', function () {
    var y = window.scrollY + 140, current = -1;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) current = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === current); });
  }, { passive: true });
})();
