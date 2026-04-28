/* TOPLAP HK — canvas background + interactions */

(function () {
  /* ── Canvas rain animation ─────────────────────────────── */
  const canvas = document.getElementById('canvas-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const CHARS = 'aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789{}[]()<>=+-*/\\|~^&%$#@!?;:'.split('');
  const SNIPPETS = [
    'play (note 60)', 'setBPM 120', 'd1 $ sound "bd"', 'loop 4 |> reverb',
    's.synth.play', 'Pdef(\\x, Pbind(', '~b = Synth(\\saw)', 'do sound "hh"',
  ];

  let cols, drops;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    cols = Math.floor(canvas.width / 16);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '13px monospace';
    drops.forEach((y, i) => {
      const char = Math.random() > 0.97
        ? SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]
        : CHARS[Math.floor(Math.random() * CHARS.length)];

      const alpha = Math.random() * 0.5 + 0.2;
      ctx.fillStyle = i % 3 === 0
        ? `rgba(0,255,136,${alpha})`
        : `rgba(0,204,255,${alpha * 0.6})`;
      ctx.fillText(char, i * 16, y * 16);

      if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      else drops[i] += 0.4;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);

  /* ── Typewriter for hero heading ───────────────────────── */
  const target = document.getElementById('typewriter');
  if (target) {
    const full = target.dataset.text || target.textContent;
    target.textContent = '';
    let i = 0;
    function type() {
      if (i < full.length) {
        target.textContent += full[i++];
        setTimeout(type, 60);
      }
    }
    setTimeout(type, 600);
  }

  /* ── Active nav link on scroll ─────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => {
            a.style.color = a.getAttribute('href') === `#${entry.target.id}`
              ? 'var(--accent)'
              : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
})();
