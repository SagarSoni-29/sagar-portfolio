const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  R = document.documentElement;
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches,
  FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
const C = { g: '#4dffa6', p: '#8f9bff' };
function col() {
  const s = getComputedStyle(R);
  C.g = s.getPropertyValue('--g').trim();
  C.p = s.getPropertyValue('--p').trim();
  C.s = R.dataset.theme === 'light' ? C.p : '#fff';
  $('#tg').textContent = R.dataset.theme === 'light' ? '☀' : '☾';
}
try {
  const t = localStorage.getItem('th');
  if (t) R.dataset.theme = t;
} catch (e) {}
$('#tg').onclick = () => {
  const n = R.dataset.theme === 'light' ? 'dark' : 'light';
  R.dataset.theme = n;
  try {
    localStorage.setItem('th', n);
  } catch (e) {}
  col();
};
col();
// Name letters react to the cursor
['Sagar', 'Soni'].forEach((w, i) => {
  const d = document.createElement('span');
  d.className = 'w';
  [...w].forEach((c, j) => {
    const s = document.createElement('span');
    s.className = 'ch';
    s.textContent = c;
    s.style.animationDelay = (i * 5 + j) * 80 + 250 + 'ms';
    d.append(s);
  });
  $('#nm').append(d);
});
const chs = $$('.ch');
addEventListener('pointermove', (e) => {
  chs.forEach((c) => {
    const r = c.getBoundingClientRect(),
      d = Math.hypot(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
    c.style.setProperty('--t', Math.max(0, 1 - d / 160).toFixed(2));
  });
});
// Terminal typing
const L = [
    'systems online. hello!',
    'building things that think.',
    'turning ideas into intelligent tools.',
    'making documents talk back.',
    'from scanned pdfs to clean data.',
    'ai that people actually enjoy using.',
    'always learning, always shipping.',
    'java, python and a lot of curiosity.',
  ],
  tl = $('#tl');
let li = 0,
  ci = 0,
  del = false;
(function tk() {
  const s = L[li];
  tl.textContent = '> ' + s.slice(0, ci);
  if (RM) {
    tl.textContent = '> ' + L[0];
    return;
  }
  let d = del ? 24 : 62;
  if (!del && ci === s.length) {
    del = true;
    d = 1500;
  } else if (del && ci === 0) {
    del = false;
    li = (li + 1) % L.length;
    d = 380;
  } else ci += del ? -1 : 1;
  setTimeout(tk, d);
})();
// Stars and particle network
const cv = $('#cv'),
  cx = cv.getContext('2d'),
  mp = { x: -999, y: -999 },
  dpr = Math.min(devicePixelRatio || 1, 2);
let W,
  H,
  pts = [],
  st = [],
  SH = [],
  vis = true;
function rs() {
  W = cv.clientWidth;
  H = cv.clientHeight;
  cv.width = W * dpr;
  cv.height = H * dpr;
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  st = Array.from({ length: Math.floor((W * H) / 2200) }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.3 + 0.2,
    a: Math.random() * 6.3,
    s: Math.random() * 0.03 + 0.006,
  }));
  pts = Array.from({ length: Math.min(90, Math.floor((W * H) / 14000)) }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
  }));
}
rs();
addEventListener('resize', rs);
$('#top').addEventListener('pointermove', (e) => {
  const r = cv.getBoundingClientRect();
  mp.x = e.clientX - r.left;
  mp.y = e.clientY - r.top;
});
$('#top').addEventListener('pointerleave', () => (mp.x = -999));
new IntersectionObserver((e) => (vis = e[0].isIntersecting)).observe($('#top'));
(function dr() {
  requestAnimationFrame(dr);
  if (!vis || RM) return;
  cx.clearRect(0, 0, W, H);
  cx.fillStyle = C.s;
  for (const q of st) {
    q.a += q.s;
    cx.globalAlpha = 0.2 + 0.8 * Math.abs(Math.sin(q.a));
    cx.beginPath();
    cx.arc(q.x, q.y, q.r, 0, 6.3);
    cx.fill();
  }
  if (Math.random() < 0.008 && SH.length < 2)
    SH.push({
      x: Math.random() * W * 0.8,
      y: Math.random() * H * 0.35,
      vx: 7 + Math.random() * 4,
      vy: 3 + Math.random() * 2,
      l: 1,
    });
  cx.lineWidth = 1.6;
  for (let i = SH.length; i--;) {
    const o = SH[i];
    o.x += o.vx;
    o.y += o.vy;
    o.l -= 0.016;
    if (o.l <= 0) {
      SH.splice(i, 1);
      continue;
    }
    cx.globalAlpha = o.l;
    cx.strokeStyle = C.s;
    cx.beginPath();
    cx.moveTo(o.x, o.y);
    cx.lineTo(o.x - o.vx * 9, o.y - o.vy * 9);
    cx.stroke();
  }
  cx.lineWidth = 1;
  for (const p of pts) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    const dx = mp.x - p.x,
      dy = mp.y - p.y,
      dm = Math.hypot(dx, dy);
    if (dm < 180) {
      p.x += dx * 0.014;
      p.y += dy * 0.014;
      cx.globalAlpha = 1 - dm / 180;
      cx.strokeStyle = C.g;
      cx.beginPath();
      cx.moveTo(p.x, p.y);
      cx.lineTo(mp.x, mp.y);
      cx.stroke();
    }
    cx.globalAlpha = 0.85;
    cx.fillStyle = C.p;
    cx.beginPath();
    cx.arc(p.x, p.y, 1.7, 0, 6.3);
    cx.fill();
  }
  cx.strokeStyle = C.p;
  for (let i = 0; i < pts.length; i++)
    for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i],
        b = pts[j],
        d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 115) {
        cx.globalAlpha = (1 - d / 115) * 0.38;
        cx.beginPath();
        cx.moveTo(a.x, a.y);
        cx.lineTo(b.x, b.y);
        cx.stroke();
      }
    }
})();
// 3D robot beside the name (three.js)
const bot = $('.bot'),
  T = { x: 0, y: 0 },
  K = { x: 0, y: 0 };
let HV = 0;
addEventListener('pointermove', (e) => {
  if (HV) return;
  const r = bot.getBoundingClientRect();
  T.x = Math.max(-1, Math.min(1, (e.clientX - r.left - r.width / 2) / 450));
  T.y = Math.max(-1, Math.min(1, (e.clientY - r.top - r.height / 2) / 450));
});
document.addEventListener('pointerleave', () => {
  T.x = T.y = 0;
});
try {
  const cvs = $('#r3'),
    ren = new THREE.WebGLRenderer({ canvas: cvs, alpha: true, antialias: true }),
    scn = new THREE.Scene(),
    cam = new THREE.PerspectiveCamera(32, 1 / 1.12, 0.1, 50);
  ren.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  cam.position.set(0, -0.2, 10.5);
  const fit = () => ren.setSize(cvs.clientWidth || 300, (cvs.clientWidth || 300) * 1.12, false);
  fit();
  addEventListener('resize', fit);
  const M = (c, m, r) => new THREE.MeshStandardMaterial({ color: c, metalness: m, roughness: r }),
    shell = M(0x2f7fa8, 0.65, 0.28),
    dark = M(0x050f1a, 0.9, 0.12),
    glow = new THREE.MeshBasicMaterial({ color: 0x66f6ff }),
    halo = new THREE.MeshBasicMaterial({
      color: 0x22c8ff,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  const G = new THREE.Group();
  scn.add(G);
  const add = (g, mat, p, s, par = G) => {
      const m = new THREE.Mesh(g, mat);
      m.position.set(...p);
      if (s) m.scale.set(...s);
      par.add(m);
      return m;
    },
    S = new THREE.SphereGeometry(1, 48, 32);
  const head = new THREE.Group();
  head.position.y = 0.9;
  G.add(head);
  add(S, shell, [0, 0, 0], [1.2, 1, 1.05], head);
  add(S, dark, [0, 0, 0.9], [0.95, 0.74, 0.27], head);
  const eyes = new THREE.Group();
  head.add(eyes);
  [-0.4, 0.4].forEach((x) => {
    add(new THREE.CircleGeometry(0.17, 32), glow, [x, 0.04, 1.16], [1, 1.3, 1], eyes);
    add(new THREE.CircleGeometry(0.32, 32), halo, [x, 0.04, 1.155], [1, 1.2, 1], eyes);
  });
  [-1, 1].forEach((d) => {
    add(
      new THREE.CylinderGeometry(0.42, 0.42, 0.3, 32),
      M(0x0c2536, 0.8, 0.3),
      [d * 1.22, 0, 0],
      null,
      head,
    ).rotation.z = Math.PI / 2;
    add(
      new THREE.TorusGeometry(0.3, 0.045, 12, 40),
      glow,
      [d * 1.39, 0, 0],
      null,
      head,
    ).rotation.y = Math.PI / 2;
  });
  add(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), shell, [0, 1.12, 0], null, head);
  add(S, glow, [0, 1.33, 0], [0.09, 0.09, 0.09], head);
  add(S, shell, [0, -1.05, 0], [0.72, 0.82, 0.55]);
  add(new THREE.CircleGeometry(0.14, 24), glow, [0, -0.85, 0.545]);
  add(S, halo, [0, -2.05, 0], [0.55, 0.12, 0.55]);
  const arms = [-1, 1].map((d) => {
    const p = new THREE.Group();
    p.position.set(d * 0.85, -0.6, 0);
    G.add(p);
    add(S, shell, [0, -0.4, 0], [0.2, 0.46, 0.2], p);
    add(S, glow, [0, -0.88, 0], [0.11, 0.11, 0.11], p);
    p.rotation.z = d * 0.3;
    return p;
  });
  scn.add(new THREE.AmbientLight(0x88aacc, 0.7));
  const dl = new THREE.DirectionalLight(0xffffff, 1.1);
  dl.position.set(2, 4, 6);
  scn.add(dl);
  const p1 = new THREE.PointLight(0x22d8ff, 1.6, 20);
  p1.position.set(-4, 1, 3);
  scn.add(p1);
  const p2 = new THREE.PointLight(0x8f9bff, 1.2, 20);
  p2.position.set(4, -1, 3);
  scn.add(p2);
  const t0 = performance.now();
  (function rn() {
    requestAnimationFrame(rn);
    if (!vis) return;
    const t = (performance.now() - t0) / 1000;
    K.x += (T.x - K.x) * 0.08;
    K.y += (T.y - K.y) * 0.08;
    G.position.set(K.x * 0.35, Math.sin(t * 1.6) * 0.12, 0);
    G.rotation.y = K.x * 0.3;
    head.rotation.y = K.x * 0.55;
    head.rotation.x = K.y * 0.35;
    eyes.scale.y = t % 5 > 4.85 ? 0.1 : 1;
    const w = t > 2.2 && t < 4.6 ? 2.3 + Math.sin(t * 10) * 0.3 : 0.3 + Math.sin(t * 1.6) * 0.05;
    arms[1].rotation.z += (w - arms[1].rotation.z) * 0.15;
    arms[0].rotation.z = -0.3 - Math.sin(t * 1.6) * 0.05;
    ren.render(scn, cam);
  })();
} catch (e) {
  bot.style.display = 'none';
}
// Scroll: text fill, progress bar, timeline
const fl = $('#fl');
fl.innerHTML = fl.textContent
  .trim()
  .split(/\s+/)
  .map((w) => `<span>${w}</span>`)
  .join(' ');
const ws = $$('#fl span');
function sc() {
  const h = innerHeight,
    r = fl.getBoundingClientRect(),
    p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (r.height + h * 0.3)));
  ws.forEach((w, i) => w.classList.toggle('on', i < p * ws.length));
  $('#pb').style.transform = `scaleX(${scrollY / (R.scrollHeight - h)})`;
  const t = $('#tlw').getBoundingClientRect();
  $('#tlw').style.setProperty('--pr', Math.min(1, Math.max(0, (h * 0.75 - t.top) / t.height)));
}
addEventListener('scroll', sc, { passive: true });
sc();
// Photo reveal, card tilt, magnetic buttons, cursor ring
const ph = $('#ph');
ph.addEventListener('pointermove', (e) => {
  const r = ph.getBoundingClientRect();
  ph.style.setProperty('--mx', e.clientX - r.left + 'px');
  ph.style.setProperty('--my', e.clientY - r.top + 'px');
});
ph.addEventListener('pointerleave', () => ph.style.setProperty('--mx', '-300px'));
$$('.card').forEach((c) => {
  c.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width,
      y = (e.clientY - r.top) / r.height;
    c.style.setProperty('--rx', ((0.5 - y) * 9).toFixed(1) + 'deg');
    c.style.setProperty('--ry', ((x - 0.5) * 11).toFixed(1) + 'deg');
    c.style.setProperty('--gx', x * 100 + '%');
    c.style.setProperty('--gy', y * 100 + '%');
  });
  c.addEventListener('pointerleave', () => {
    c.style.setProperty('--rx', '0deg');
    c.style.setProperty('--ry', '0deg');
  });
});
$$('.mag').forEach((b) => {
  b.addEventListener('pointermove', (e) => {
    if (!FINE) return;
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  });
  b.addEventListener('pointerleave', () => (b.style.transform = ''));
});
if (FINE)
  addEventListener('pointermove', (e) => {
    const g = $('#cg');
    g.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    g.style.opacity = 1;
  });
$$('.hero .btn').forEach((c) => {
  c.addEventListener('pointerenter', () => {
    HV = 1;
    const a = bot.getBoundingClientRect(),
      b = c.getBoundingClientRect();
    T.x = Math.max(-1, Math.min(1, (b.left + b.width / 2 - a.left - a.width / 2) / 450));
    T.y = Math.max(-1, Math.min(1, (b.top + b.height / 2 - a.top - a.height / 2) / 450));
  });
  c.addEventListener('pointerleave', () => (HV = 0));
});
const pv = document.createElement('div');
pv.id = 'pv';
document.body.append(pv);
if (FINE)
  $$('.card').forEach((c) => {
    c.addEventListener('pointermove', (e) => {
      pv.textContent = c.dataset.say;
      pv.style.opacity = 1;
      pv.style.transform = `translate(${e.clientX + 20}px,${e.clientY + 20}px)`;
    });
    c.addEventListener('pointerleave', () => (pv.style.opacity = 0));
  });
let AC,
  snd = 0,
  lt = null;
function bp(f) {
  if (!AC) return;
  const o = AC.createOscillator(),
    g = AC.createGain(),
    t = AC.currentTime;
  o.frequency.value = f;
  g.gain.setValueAtTime(0.05, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  o.connect(g);
  g.connect(AC.destination);
  o.start();
  o.stop(t + 0.12);
}
const soundTip = $('#sound-tip');
const hideSoundTip = () => {
  soundTip.style.opacity = '0';
};
setTimeout(hideSoundTip, 20000);
$('#sd').onclick = () => {
  snd = !snd;
  $('#sd').textContent = snd ? '🔊' : '🔇';
  hideSoundTip();
  if (snd && !AC) AC = new (window.AudioContext || window.webkitAudioContext)();
  if (snd) bp(660);
};
document.addEventListener('pointerover', (e) => {
  const t = e.target.closest('a,button,.card');
  if (t !== lt) {
    lt = t;
    if (t && snd) bp(t.matches('.card') ? 440 : 560);
  }
});
// Contact form: uses Web3Forms when an access key is set, otherwise opens the visitor's email app
const WEB3FORMS_KEY = '';
const CONTACT_EMAIL = 'sagar1983soni@gmail.com';
const contactForm = $('#cf');
const contactStatus = $('#cs');
function openEmailApp({ name, email, message }) {
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
  const link = document.createElement('a');
  link.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  link.click();
  contactStatus.innerHTML = `Your email app should open with the message ready to send. Nothing opened? <a href="https://mail.google.com/mail/?view=cm&to=${CONTACT_EMAIL}&su=${subject}&body=${body}" target="_blank" rel="noopener">Open it in Gmail</a>.`;
}
async function sendMessage(data) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: 'Portfolio message from ' + data.name,
      ...data,
    }),
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
}
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm));
  if (!WEB3FORMS_KEY) return openEmailApp(data);
  const button = contactForm.querySelector('button');
  button.disabled = true;
  contactStatus.textContent = 'Sending...';
  try {
    await sendMessage(data);
    contactForm.reset();
    contactStatus.textContent = 'Thanks! Your message has been sent. I will reply soon.';
  } catch (err) {
    contactStatus.textContent =
      'Something went wrong. Please email me directly at ' + CONTACT_EMAIL + '.';
  } finally {
    button.disabled = false;
  }
});
// Marquee: duplicate the content for a seamless loop
$('#mt').innerHTML += $('#mt').innerHTML;
