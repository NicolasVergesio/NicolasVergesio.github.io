// ================= TRADUCCIÓN ES / EN =================
// El español vive en el HTML. Acá solo va el inglés: misma clave que el data-i18n del elemento.

const EN = {
  nav_sobre: 'About',
  nav_serv: 'Services',
  nav_port: 'Portfolio',
  nav_tray: 'Experience',
  nav_cont: 'Contact',

  hero_bio: "I'm a bioinformatician and data analyst. I look for patterns and bring order to the data nobody dares to touch. <em>The result: problems turned into actionable information.</em>",
  btn_write: 'Get in touch <span>→</span>',
  btn_port: 'See portfolio <span>→</span>',

  sobre_eyebrow: '/ About',
  sobre_title: 'A bit of <em>context</em>',
  sobre_p1: "I help people <em>understand and analyze their information</em>, and automate their reports. Throughout my career I've worked as a data analyst and bioinformatician: cleaning, integrating and shaping scattered sources.",
  sobre_p2: "I'm drawn to where biology, code and well-framed questions meet. What I do best is take a problem, decode it, and leave it in a state where the best possible decision can be made with the information at hand. Sometimes that's a dashboard, sometimes a pipeline, sometimes an app. <em>Whatever the problem, it gets solved in the end.</em>",
  sobre_fun: '<span>Fun fact</span> Outside of data, I compose music. Two crafts that, deep down, do the same thing: work with sequences and look for meaning in them.',

  serv_eyebrow: '/ Services',
  serv_title: 'How I can <em>help</em>',
  s1_title: 'Data analysis &amp; reporting',
  s1_body: '<p class="serv-desc">Taking messy data, scattered sources and vague questions, and leaving them <em>in a state where management can make the best actionable decisions</em>. From exploratory analysis to a production dashboard that updates itself.</p><div class="serv-tags"><span class="serv-tag">Cleaning &amp; ETL</span><span class="serv-tag">Dashboards</span><span class="serv-tag">Automated reports</span><span class="serv-tag">Visualization</span></div>',
  s2_title: 'Automation',
  s2_body: '<p class="serv-desc">Manual processes that could run on their own. Scripts that replace spreadsheets. ETLs that bring scattered data together. <em>The boring stuff, done right</em>, so time goes into thinking instead of copy-pasting.</p><div class="serv-tags"><span class="serv-tag">ETL</span><span class="serv-tag">Internal apps</span><span class="serv-tag">Data extraction</span><span class="serv-tag">Automated QC</span></div>',
  s3_title: 'Bioinformatics &amp; science',
  s3_body: '<p class="serv-desc">I help scientific teams analyze their data, improve reproducibility, automate their pipelines and raise the quality of their figures. I also run programming workshops for data analysis. My specialty is where <em>research, product and analysis</em> meet.</p><div class="serv-tags"><span class="serv-tag">Reproducible pipelines</span><span class="serv-tag">Statistical analysis</span><span class="serv-tag">Paper-ready figures</span><span class="serv-tag">Workshops</span></div>',

  port_title: 'Selected <em>projects</em>',
  p1: '<div class="proj-meta"><span class="cat">Bioinformatics</span><span>2025</span></div><h3 class="proj-title">R package for <em>tissue specificity</em></h3><p class="proj-desc">A tool to analyze and visualize tissue-specific gene expression patterns, packaged for reproducibility.</p><div class="proj-stack"><span>R</span><span>tidyverse</span><span>ggplot2</span></div>',
  p2: '<div class="proj-meta"><span class="cat">Dashboards</span><span>2024</span></div><h3 class="proj-title"><em>Automated</em> monthly report</h3><p class="proj-desc">A pipeline that centralizes data from multiple departments and delivers the regional CEO report on the first business day of the month, no Excel involved.</p><div class="proj-stack"><span>R</span><span>SQL</span><span>Power BI</span></div>',
  p3: '<div class="proj-meta"><span class="cat">Power Apps</span><span>2024</span></div><h3 class="proj-title"><em>Yield &amp; ROI</em> calculator</h3><p class="proj-desc">An internal app that lets the sales team calculate yields in real time while negotiating with clients.</p><div class="proj-stack"><span>Power Apps</span><span>SharePoint</span></div>',
  p4: '<div class="proj-meta"><span class="cat">Shiny app</span><span>2025</span></div><h3 class="proj-title"><em>Interactive</em> bioprocess explorer</h3><p class="proj-desc">A Shiny app to explore experimental results from culture media optimization, with filters and export.</p><div class="proj-stack"><span>R</span><span>Shiny</span><span>plotly</span></div>',
  p5: '<div class="proj-meta"><span class="cat">Automation</span><span>2024</span></div><h3 class="proj-title"><em>Automated</em> invoice extraction</h3><p class="proj-desc">An app that pulls data from PDF invoices and loads it into a database. Less admin work, fewer typos.</p><div class="proj-stack"><span>Python</span><span>OCR</span><span>Power Automate</span></div>',
  p6: '<div class="proj-meta"><span class="cat">PhD</span><span>2025–now</span></div><h3 class="proj-title"><em>Structural bioinformatics</em> pipelines</h3><p class="proj-desc">Reproducible processing of large-scale genomic data for research on protein structure and function.</p><div class="proj-stack"><span>Python</span><span>R</span><span>Docker</span></div>',

  cake_tag: '/ Side project',
  cake_desc: "My space for sharing bioinformatics and data analysis without the solemnity. Tutorials, notes and experiments where I explain what I'm learning <em>the way I wish it had been explained to me</em>. Under construction, growing little by little.",
  cake_btn: 'Visit Cakeformatics <span>→</span>',

  tray_eyebrow: '/ Experience',
  tray_title: 'Experience &amp; <em>education</em>',
  tray_btn: 'Download full CV <span>↓</span>',
  t1_date: 'Jul 2025<span class="end">→ present</span>',
  t1: '<div class="tray-role">PhD candidate in <em>Bioinformatics</em></div><div class="tray-org">UNQ · Structural Bioinformatics Group · CONICET Fellow</div><ul class="tray-bullets"><li>Reproducible R and Python pipelines for processing large volumes of genomic data.</li><li>Interactive visualization tools (Shiny, Quarto) that speed up result interpretation for researchers.</li></ul>',
  t2: '<div class="tray-role">Data <em>Analyst</em></div><div class="tray-org">Koppert Argentina</div><ul class="tray-bullets"><li>Automated the regional CEO\'s monthly report; centralized data in SharePoint and removed manual Excel processes.</li><li>ETL flows in R and SQL to integrate scattered sources and ensure the integrity of Power BI dashboards.</li><li>Daily production dashboards with logistics and quality KPIs for immediate operational response.</li></ul>',
  t3: '<div class="tray-role">Culture Media &amp; <em>Metabolites Specialist</em></div><div class="tray-org">Stämm Biotech</div><ul class="tray-bullets"><li>Improved bioprocess yield through statistical analysis of experimental data.</li><li>R and Python scripts to automate quality control and reduce human error.</li></ul>',
  edu_label: 'Education',
  edu_list: '<div class="tray-edu-item"><div class="tray-edu-title">MSc in Bioinformatics and Systems Biology</div><div class="tray-edu-year">2025 · ongoing</div></div><div class="tray-edu-item"><div class="tray-edu-title">BSc in Biotechnology</div><div class="tray-edu-year">2015 – 2022</div></div>',

  scratch_hint: 'Scratch to reveal the photo',
  scratch_reset: '↺ Cover it again',

  cont_head: 'Got a problem?<br><em>Let the data speak.</em>'
};

const ES = {};
const i18nEls = document.querySelectorAll('[data-i18n]');
i18nEls.forEach(el => { ES[el.dataset.i18n] = el.innerHTML; });

const langBtn = document.getElementById('langToggle');
let currentLang = 'es';

function setLang(lang) {
  const dict = lang === 'en' ? EN : ES;
  i18nEls.forEach(el => {
    const k = el.dataset.i18n;
    if (dict[k] !== undefined) el.innerHTML = dict[k];
  });
  document.documentElement.lang = lang;
  currentLang = lang;
  langBtn.querySelectorAll('[data-l]').forEach(s => s.classList.toggle('on', s.dataset.l === lang));
  langBtn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
  try { localStorage.setItem('nv-lang', lang); } catch (e) {}
}

langBtn.addEventListener('click', () => setLang(currentLang === 'es' ? 'en' : 'es'));

let saved = null;
try { saved = localStorage.getItem('nv-lang'); } catch (e) {}
if (saved === 'en') setLang('en');
  
