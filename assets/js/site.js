// Macad Photography — nav toggle + gallery lightbox (no dependencies)
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // Mobile: expand submenus on tap of the parent label
  document.querySelectorAll('.nav-parent').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 1100px)').matches) {
        var li = btn.closest('.has-children');
        var open = li.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    });
  });

  /* ---------- Lightbox ---------- */
  var grid = document.getElementById('gallery');
  if (!grid) return;
  var items = Array.prototype.slice.call(grid.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  var box = document.createElement('div');
  box.className = 'lb';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Image viewer');
  box.setAttribute('tabindex', '-1');
  box.innerHTML =
    '<button class="lb-btn lb-close" aria-label="Close">&times;</button>' +
    '<button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-btn lb-next" aria-label="Next">&#8250;</button>' +
    '<div class="lb-count"></div>';
  document.body.appendChild(box);

  var lbImg = box.querySelector('img');
  var lbCount = box.querySelector('.lb-count');
  var closeBtn = box.querySelector('.lb-close');
  var focusable = [box.querySelector('.lb-prev'), box.querySelector('.lb-next'), closeBtn];
  var current = 0;
  var lastFocused = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var el = items[current];
    lbImg.src = el.getAttribute('data-full');
    lbImg.alt = el.querySelector('img') ? el.querySelector('img').alt : '';
    lbCount.textContent = (current + 1) + ' / ' + items.length;
  }
  function open(i) {
    lastFocused = document.activeElement;
    show(i);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  items.forEach(function (el, i) {
    el.addEventListener('click', function (e) { e.preventDefault(); open(i); });
  });
  closeBtn.addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowLeft') { show(current - 1); }
    else if (e.key === 'ArrowRight') { show(current + 1); }
    else if (e.key === 'Tab') {
      // Trap focus within the dialog
      var idx = focusable.indexOf(document.activeElement);
      if (idx === -1) { e.preventDefault(); focusable[0].focus(); return; }
      e.preventDefault();
      var next = e.shiftKey ? idx - 1 : idx + 1;
      next = (next + focusable.length) % focusable.length;
      focusable[next].focus();
    }
  });
})();
