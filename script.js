/* ==========================================================================
   AURA Corais — site de apresentação · comportamento
   Preenchido por preencher-site.py a partir de site.json (bloco CONFIG).
   ========================================================================== */
const CONFIG = {
  whatsapp: '5573999999999',            // só dígitos, com DDI (placeholder até a confirmação do número comercial)
  nome: 'AURA Corais',
  msgWhats: 'Olá! Vi o site do AURA Corais e quero receber a apresentação.',
  formEndpoint: '',   // opcional: URL que recebe POST JSON (Formspree, Make, Apps Script). Vazio = só WhatsApp
  autoplayMs: 6000
};

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- header ---------- */
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('rolado', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const burger = document.querySelector('.hamburguer');
  const menuMobile = document.querySelector('.menu-mobile');
  const toggleMenu = () => {
    const aberto = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!aberto));
    burger.classList.toggle('ativo');
    menuMobile.classList.toggle('ativo');
    menuMobile.setAttribute('aria-hidden', String(aberto));
    document.body.classList.toggle('travado', !aberto);
    if (!aberto) header.classList.add('rolado'); else onScroll();
  };
  burger.addEventListener('click', toggleMenu);
  menuMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { if (menuMobile.classList.contains('ativo')) toggleMenu(); }));

  /* ---------- carrossel ---------- */
  const carrossel = document.querySelector('.carrossel');
  if (carrossel) {
    const slides = [...carrossel.querySelectorAll('.slide')];
    const dotsBox = carrossel.querySelector('.dots');
    const atual = carrossel.querySelector('.contador .atual');
    const total = carrossel.querySelector('.contador .total');
    let i = 0, timer;
    slides.forEach((_, k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Ir para imagem ${k + 1}`);
      b.addEventListener('click', () => { mostrar(k); reiniciar(); });
      dotsBox.appendChild(b);
    });
    const dots = [...dotsBox.children];
    if (total) total.textContent = slides.length;
    function mostrar(k) {
      i = (k + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('ativo', n === i));
      dots.forEach((d, n) => d.classList.toggle('ativo', n === i));
      if (atual) atual.textContent = i + 1;
      // carrega a próxima imagem com antecedência
      const prox = slides[(i + 1) % slides.length].querySelector('img');
      if (prox && prox.loading === 'lazy') prox.loading = 'eager';
    }
    function reiniciar() { clearInterval(timer); timer = setInterval(() => mostrar(i + 1), CONFIG.autoplayMs); }
    carrossel.querySelector('.seta-dir').addEventListener('click', () => { mostrar(i + 1); reiniciar(); });
    carrossel.querySelector('.seta-esq').addEventListener('click', () => { mostrar(i - 1); reiniciar(); });
    carrossel.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { mostrar(i + 1); reiniciar(); }
      if (e.key === 'ArrowLeft') { mostrar(i - 1); reiniciar(); }
    });
    let x0 = null;
    carrossel.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    carrossel.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { mostrar(dx < 0 ? i + 1 : i - 1); reiniciar(); }
      x0 = null;
    });
    mostrar(0); reiniciar();
  }

  /* ---------- formulário → WhatsApp ---------- */
  const form = document.getElementById('form-lead');
  if (form) {
    const nome = form.querySelector('[name=nome]');
    const email = form.querySelector('[name=email]');
    const tel = form.querySelector('[name=telefone]');
    const consent = form.querySelector('[name=consent]');
    const sucesso = document.getElementById('form-sucesso');
    const cabecalho = document.getElementById('form-cabecalho');

    tel.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, v.length > 10 ? 7 : 6)}-${v.slice(v.length > 10 ? 7 : 6)}`;
      else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      e.target.value = v;
    });

    const marca = (el, ok) => el.closest('.campo').classList.toggle('invalido', !ok);

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const okNome = nome.value.trim().length >= 3;
      const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      const dig = tel.value.replace(/\D/g, '');
      const okTel = dig.length >= 10 && dig.length <= 11;
      const corretor = form.querySelector('[name=corretor]:checked');
      const okCorretor = !!corretor;
      const okConsent = !consent || consent.checked;
      marca(nome, okNome); marca(email, okEmail); marca(tel, okTel);
      form.querySelector('[name=corretor]').closest('.campo').classList.toggle('invalido', !okCorretor);
      if (consent) consent.closest('.campo').classList.toggle('invalido', !okConsent);
      if (!(okNome && okEmail && okTel && okCorretor && okConsent)) return;

      const dados = { nome: nome.value.trim(), email: email.value.trim(), telefone: tel.value.trim(), corretor: corretor.value, origem: location.href, quando: new Date().toISOString() };

      if (CONFIG.formEndpoint) {
        try { await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) }); } catch (_) { /* segue para o WhatsApp mesmo assim */ }
      }
      const msg = `${CONFIG.msgWhats}\nNome: ${dados.nome}\nE-mail: ${dados.email}\nWhatsApp: ${dados.telefone}\nCorretor: ${dados.corretor}`;
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      form.classList.add('oculto'); cabecalho.classList.add('oculto'); sucesso.classList.remove('oculto');
    });

    document.getElementById('form-reset').addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('.campo').forEach(c => c.classList.remove('invalido'));
      sucesso.classList.add('oculto'); form.classList.remove('oculto'); cabecalho.classList.remove('oculto');
    });
  }

  /* ---------- links do WhatsApp ---------- */
  document.querySelectorAll('a[data-whats]').forEach(a => {
    const texto = a.dataset.whats || CONFIG.msgWhats;
    a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
    a.target = '_blank'; a.rel = 'noopener noreferrer';
  });

  /* ---------- âncoras ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const alvo = document.querySelector(id);
      if (!alvo) return;
      e.preventDefault();
      alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  /* ---------- entrada suave das seções ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => io.observe(el));
    // rede de segurança: nada fica invisível se o observador não disparar (impressão, leitores antigos, âncora direta)
    setTimeout(() => reveals.forEach(el => el.classList.add('in')), 3500);
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }
});
