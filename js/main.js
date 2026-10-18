// Nav: fondo al scrollear
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Acordeón servicios
function toggleServ(head) {
  const item = head.parentElement;
  document.querySelectorAll('.serv-item').forEach(o => { if (o !== item) o.classList.remove('open'); });
  item.classList.toggle('open');
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

