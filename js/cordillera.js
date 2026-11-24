// Hero cordillera — requiere D3 v7 cargado antes
(() => {
  // Parámetros fijos (elegidos en el prototipo)
  const W = 680, H = 300, N = 200, MAX = 80, START = 40;
  const RUIDO_LINEA = 1.75, RUIDO_COMPARTIDO = 0.5, SEED = 11;
  const OPACIDAD = 0.3;

  const root = document.getElementById('cordillera');
  const slider = root.querySelector('input');
  const svg = d3.select(root).select('svg');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Datos: perfiles con picos agrupados en tres "montañas"
  const xs = d3.range(N).map(i => i / (N - 1));
  const g = (x, m, s) => Math.exp(-((x - m) ** 2) / (2 * s * s));
  const suavizar = (a, k) => a.map((_, i) => {
    let s = 0, c = 0;
    for (let j = -k; j <= k; j++) if (a[i + j] !== undefined) { s += a[i + j]; c++; }
    return s / c;
  });
  const r = d3.randomLcg(SEED), n = d3.randomNormal.source(r)(0, 1);
  const compartido = suavizar(xs.map(() => n()), 1).map(v => v * 0.022 * RUIDO_COMPARTIDO);
  const picos = [{ m: 0.22, h: 0.35 }, { m: 0.52, h: 0.85 }, { m: 0.80, h: 0.55 }];

  const perfiles = d3.range(MAX).map(() => {
    const p = picos[d3.bisect([0.3, 0.75], r())];
    const mu = p.m + (r() - 0.5) * 0.1, h = p.h * (0.4 + r() * 0.9), s = 0.04 + r() * 0.06;
    const p2 = r() < 0.5 ? picos[Math.floor(r() * 3)] : null;
    const raw = xs.map(x => 0.03 + h * g(x, mu, s) + (p2 ? p2.h * 0.35 * g(x, p2.m, 0.07) : 0));
    return suavizar(raw.map((v, i) => Math.max(0, v + 0.03 * RUIDO_LINEA * n() + compartido[i])), 1);
  });
  const promedio = k => xs.map((_, i) => d3.mean(perfiles.slice(0, k), a => a[i]));

  // Escalas y dibujo
  const x = d3.scaleLinear([0, 1], [10, W - 10]);
  const y = d3.scaleLinear([0, d3.max(perfiles.flat()) * 1.03], [H - 12, 8]);
  const linea = d3.line().x((_, i) => x(xs[i])).y(v => y(v));

  svg.append('line').attr('class', 'base')
    .attr('x1', 10).attr('x2', W - 10).attr('y1', H - 12).attr('y2', H - 12);

  const lineas = svg.append('g').selectAll('path').data(perfiles).join('path')
    .attr('class', 'perfil').attr('d', linea);

  const media = svg.append('path').attr('class', 'promedio').attr('d', linea(promedio(START)));

  // Entrada: primero el ruido, después el promedio
  if (reduce) {
    lineas.style('opacity', (_, i) => i < START ? OPACIDAD : 0);
  } else {
    const paso = 2400 / START;
    lineas.filter((_, i) => i < START).transition()
      .delay((_, i) => i * paso).duration(1200).ease(d3.easeCubicOut)
      .style('opacity', OPACIDAD);
    const L = media.node().getTotalLength();
    media.attr('stroke-dasharray', L).attr('stroke-dashoffset', L)
      .transition().delay(START * paso + 600).duration(2200).ease(d3.easeCubicInOut)
      .attr('stroke-dashoffset', 0)
      .on('end', () => media.attr('stroke-dasharray', null).attr('stroke-dashoffset', null));
  }

  // Interacción: cantidad de perfiles promediados
  slider.addEventListener('input', () => {
    const k = +slider.value, d = reduce ? 0 : 450;
    lineas.interrupt().transition().duration(d).style('opacity', (_, i) => i < k ? OPACIDAD : 0);
    media.interrupt().attr('stroke-dasharray', null).attr('stroke-dashoffset', null)
      .transition().duration(d).ease(d3.easeCubicOut).attr('d', linea(promedio(k)));
  });
})();
