// ================= MODO HALLOWEEN: RAYO + TEMBLOR =================
// Compartido por index.html y halloween.html. Se carga en el <head> SIN defer, para que la
// página de llegada arranque tapada por el destello y no se vea un "parpadeo" de contenido.
// Cualquier <a data-thunder href="..."> dispara el efecto antes de navegar.
(() => {
  const KEY = 'nv-thunder';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = `
    html.nv-arriving::after {
      content: ''; position: fixed; inset: 0; z-index: 2147483647; background: #F4FFF0;
    }
    .nv-strike { position: fixed; inset: 0; z-index: 2147483647; pointer-events: none; }
    .nv-strike .flash { position: absolute; inset: 0; background: #F4FFF0; opacity: 0; }
    .nv-strike .dim { position: absolute; inset: 0; background: #000; opacity: 0; }
    .nv-strike svg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; }
    .nv-strike path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  let arriving = false;
  try { arriving = sessionStorage.getItem(KEY) === '1'; sessionStorage.removeItem(KEY); } catch (e) {}
  if (arriving) document.documentElement.classList.add('nv-arriving');

  // Rayo zigzagueante desde arriba hasta (tx, ty), con alguna ramita
  function boltPath(x0, tx, ty) {
    const pts = [[x0, -10]];
    const steps = 9;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const jitter = (1 - t) * 90 + 20;
      pts.push([x0 + (tx - x0) * t + (Math.random() - 0.5) * jitter, ty * t]);
    }
    pts[pts.length - 1] = [tx, ty];
    let d = 'M' + pts.map(p => p.map(Math.round).join(' ')).join(' L');
    for (let b = 0; b < 2; b++) {
      const [bx, by] = pts[2 + Math.floor(Math.random() * (steps - 3))];
      const dir = Math.random() < 0.5 ? -1 : 1;
      d += ` M${Math.round(bx)} ${Math.round(by)}`;
      let x = bx, y = by;
      for (let k = 0; k < 3; k++) {
        x += dir * (20 + Math.random() * 40); y += 25 + Math.random() * 35;
        d += ` L${Math.round(x)} ${Math.round(y)}`;
      }
    }
    return d;
  }

  function overlay(color) {
    const el = document.createElement('div');
    el.className = 'nv-strike';
    el.setAttribute('aria-hidden', 'true');
    const w = innerWidth, h = innerHeight;
    el.innerHTML = `<div class="dim"></div>
      <svg viewBox="0 0 ${w} ${h}">
        <path class="glow" stroke="${color}" stroke-width="14" opacity="0.35" filter="url(#nvBlur)"/>
        <path class="core" stroke="#FFFFFF" stroke-width="3"/>
        <defs><filter id="nvBlur"><feGaussianBlur stdDeviation="6"/></filter></defs>
      </svg>
      <div class="flash"></div>`;
    document.body.appendChild(el);
    return el;
  }

  // Temblor: se anima cada hijo directo del body con `translate`/`rotate`
  // (propiedades independientes de transform, así no pisa animaciones existentes
  // y no rompe los position:fixed como pasaría transformando el body entero).
  function shake(duration, strength) {
    const frames = [];
    for (let i = 0; i <= 12; i++) {
      const s = strength * (1 - i / 12);
      frames.push({
        translate: `${((Math.random() - 0.5) * 2 * s).toFixed(1)}px ${((Math.random() - 0.5) * 2 * s).toFixed(1)}px`,
        rotate: `${((Math.random() - 0.5) * s * 0.08).toFixed(2)}deg`
      });
    }
    frames[frames.length - 1] = { translate: '0px 0px', rotate: '0deg' };
    [...document.body.children].forEach(el => {
      if (el.classList.contains('nv-strike') || el.tagName === 'SCRIPT') return;
      el.animate(frames, { duration, easing: 'linear' });
    });
  }

  function strike(href, from, color) {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    const el = overlay(color);
    const flash = el.querySelector('.flash'), dim = el.querySelector('.dim'), svg = el.querySelector('svg');

    if (reduced) {
      flash.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, fill: 'forwards' })
        .finished.then(() => location.href = href);
      return;
    }

    const r = from.getBoundingClientRect();
    const tx = r.left + r.width / 2, ty = r.top + r.height / 2;
    const d = boltPath(tx + (Math.random() - 0.5) * innerWidth * 0.5, tx, ty);
    svg.querySelectorAll('path').forEach(p => p.setAttribute('d', d));

    dim.animate([{ opacity: 0 }, { opacity: 0.55 }], { duration: 140, fill: 'forwards' });
    svg.animate(
      [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 0.2, offset: 0.2 }, { opacity: 1, offset: 0.3 }, { opacity: 0.4, offset: 0.6 }, { opacity: 1 }],
      { duration: 700, delay: 120, fill: 'forwards' }
    );
    flash.animate(
      [{ opacity: 0 }, { opacity: 0.85, offset: 0.12 }, { opacity: 0, offset: 0.25 }, { opacity: 0.6, offset: 0.36 }, { opacity: 0.1, offset: 0.55 }, { opacity: 1 }],
      { duration: 820, delay: 120, easing: 'ease-in', fill: 'forwards' }
    ).finished.then(() => location.href = href);
    setTimeout(() => shake(650, 14), 140);
  }

  function arrive() {
    const el = overlay('#FFFFFF');
    const flash = el.querySelector('.flash');
    flash.style.opacity = 1;
    document.documentElement.classList.remove('nv-arriving');
    flash.animate(
      [{ opacity: 1 }, { opacity: 0.25, offset: 0.35 }, { opacity: 0.6, offset: 0.45 }, { opacity: 0 }],
      { duration: reduced ? 300 : 900, easing: 'ease-out', fill: 'forwards' }
    ).finished.then(() => el.remove());
    if (!reduced) shake(500, 7);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (arriving) arrive();
    document.querySelectorAll('a[data-thunder]').forEach(a => {
      a.addEventListener('click', e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // nueva pestaña: normal
        e.preventDefault();
        strike(a.href, a, a.dataset.thunder || '#B4BAC2');
      });
    });
  });

  // Si el navegador restaura la página desde el caché al volver "atrás", sacar el overlay viejo
  window.addEventListener('pageshow', e => {
    if (e.persisted) document.querySelectorAll('.nv-strike').forEach(el => el.remove());
  });
})();
