// ── NAV BURGER ──
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-menu a').forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));

// ── SCROLL REVEAL ──
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.rev').forEach(el => ro.observe(el));

// Add rev class dynamically
document.querySelectorAll('.s1-left,.s1-right,.s2-h2,.bc,.s3-left,.s3-cards .ac').forEach((el, i) => {
  el.classList.add('rev');
  if (i > 0) el.classList.add(['','d1','d2','d3'][Math.min(i,3)]);
});

// ── METRIC COUNTERS ──
function counter(el, end, fmt, dur) {
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(end * ease));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const metrics = {
  '99,8%': el => counter(el, 998, v => (v/10).toFixed(1).replace('.',',')+'%', 1600),
  '45s':   el => counter(el, 45,  v => v+'s', 1200),
  '+45%':  el => counter(el, 45,  v => '+'+v+'%', 1400),
  '+11':   el => counter(el, 11,  v => '+'+v, 1000),
};

const mo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting || e.target.dataset.done) return;
    e.target.dataset.done = 1;
    const num = e.target.querySelector('.bc-num, .bc-num-xl');
    if (num && metrics[num.textContent.trim()]) metrics[num.textContent.trim()](num);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.bc').forEach(c => mo.observe(c));

// ── CHAT ANIMATION ──
const chatArea = document.querySelector('.chat-area');
if (chatArea) {
  const msgs = [
    { cls: 'user', text: 'A las 10:00, perfecto' },
    { cls: 'bot',  text: '✅ ¡Listo! Te envío la confirmación ahora.' },
  ];
  let idx = 0;
  const addMsg = () => {
    if (idx >= msgs.length) return;
    const typing = chatArea.querySelector('.typing');
    if (typing) typing.remove();
    const m = msgs[idx++];
    const d = document.createElement('div');
    d.className = 'bubble ' + m.cls;
    d.textContent = m.text;
    d.style.cssText = 'opacity:0;transform:translateY(6px);transition:opacity .35s,transform .35s';
    chatArea.appendChild(d);
    requestAnimationFrame(() => requestAnimationFrame(() => { d.style.opacity=1; d.style.transform='none'; }));
    if (idx < msgs.length) {
      const t = document.createElement('div');
      t.className = 'bubble bot typing';
      t.innerHTML = '<span></span><span></span><span></span>';
      chatArea.appendChild(t);
      setTimeout(addMsg, 2000);
    }
  };
  setTimeout(addMsg, 2600);
}

// ── VSL LIGHTBOX ──
const vslBtn  = document.getElementById('vslBtn');
const lb      = document.getElementById('lb');
const lbBg    = document.getElementById('lbBg');
const lbClose = document.getElementById('lbClose');
const lbVideo = document.getElementById('lbVideo');

function openLb() {
  lb.classList.add('lb-open');
  document.body.style.overflow = 'hidden';
  lbVideo.play();
}
function closeLb() {
  lb.classList.remove('lb-open');
  lbVideo.pause();
  lbVideo.currentTime = 0;
  document.body.style.overflow = '';
}
vslBtn.addEventListener('click', openLb);
lbBg.addEventListener('click', closeLb);
lbClose.addEventListener('click', closeLb);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

// ── NAV ACTIVE ──
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
  document.querySelectorAll('.nav-menu a').forEach(l => {
    const active = l.getAttribute('href') === '#' + cur;
    l.style.color = active ? '#111' : '';
    l.style.fontWeight = active ? '700' : '';
  });
}, { passive: true });