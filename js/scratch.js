// ================= FOTO RASPABLE =================
// Un canvas con la ilustración tapa la foto. Al arrastrar (mouse o dedo) se "borra" el canvas.
// Cuando se raspó ~55% de la superficie, se destapa el resto solo.
(() => {
  const wrap = document.getElementById('scratch');
  if (!wrap) return;

  const canvas = wrap.querySelector('.scratch-canvas');
  const ctx = canvas.getContext('2d');
  const resetBtn = wrap.querySelector('.scratch-reset');
  const cover = new Image();

  const BRUSH = 0.09;        // grosor del raspado, como fracción del ancho
  const REVEAL_AT = 0.55;    // porcentaje raspado para destapar todo

  let drawing = false, last = null, moves = 0, travelled = 0, width = 0;

  function paint() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (cover.complete && cover.naturalWidth) ctx.drawImage(cover, 0, 0, canvas.width, canvas.height);
  }

  function resize() {
    const r = wrap.getBoundingClientRect();
    if (Math.round(r.width) === width) return;   // ignorar cambios de alto (barra del navegador en mobile)
    width = Math.round(r.width);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    if (!wrap.classList.contains('revealed')) paint();
  }

  function point(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * canvas.width / r.width, y: (e.clientY - r.top) * canvas.height / r.height };
  }

  function scratch(from, to) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.lineWidth = canvas.width * BRUSH;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    // bordes irregulares, como raspado de verdad
    const r = ctx.lineWidth / 2;
    for (let i = 0; i < 4; i++) {
      const a = Math.random() * Math.PI * 2, d = r * (0.8 + Math.random() * 0.35);
      ctx.beginPath();
      ctx.arc(to.x + Math.cos(a) * d, to.y + Math.sin(a) * d, r * (0.1 + Math.random() * 0.15), 0, Math.PI * 2);
      ctx.fill();
    }
    travelled += Math.hypot(to.x - from.x, to.y - from.y) / canvas.width;
  }

  function clearedRatio() {
    try {
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 4 * 40) { total++; if (data[i] < 40) clear++; }
      return clear / total;
    } catch (e) {
      // abierto como archivo local (file://) el navegador bloquea leer el canvas: estimamos por recorrido
      return Math.min(travelled / 16, 1);
    }
  }

  function reveal() {
    wrap.classList.add('revealed');
    resetBtn.hidden = false;
  }

  function reset() {
    wrap.classList.remove('revealed', 'started');
    resetBtn.hidden = true;
    travelled = 0;
    paint();
  }

  canvas.addEventListener('pointerdown', e => {
    if (wrap.classList.contains('revealed')) return;
    drawing = true;
    wrap.classList.add('started');
    canvas.setPointerCapture(e.pointerId);
    last = point(e);
    scratch(last, last);
  });

  canvas.addEventListener('pointermove', e => {
    if (!drawing) return;
    const p = point(e);
    scratch(last, p);
    last = p;
    if (++moves % 12 === 0 && clearedRatio() > REVEAL_AT) { drawing = false; reveal(); }
  });

  const stop = () => {
    if (!drawing) return;
    drawing = false;
    if (clearedRatio() > REVEAL_AT) reveal();
  };
  canvas.addEventListener('pointerup', stop);
  canvas.addEventListener('pointercancel', stop);
  resetBtn.addEventListener('click', reset);

  cover.onload = () => { resize(); paint(); wrap.classList.add('ready'); };
  cover.onerror = () => { wrap.classList.add('ready', 'revealed'); };  // si falla la ilustración, se ve la foto
  cover.src = 'assets/img/ilustracion.jpg';

  window.addEventListener('resize', resize);
})();
