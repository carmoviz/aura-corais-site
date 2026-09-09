/* ==========================================================================
   AURA Corais — site de apresentação · comportamento
   Preenchido por preencher-site.py a partir de site.json (bloco CONFIG).
   ========================================================================== */
const CONFIG = {
  whatsapp: '5573999999999',            // só dígitos, com DDI (placeholder até a confirmação do número comercial)
  nome: 'AURA Corais',
  msgWhats: 'Hello! I saw the AURA Corais website and I would like to receive the presentation.',
  formEndpoint: 'https://formsubmit.co/ajax/contato@auracorais.com',   // URL que recebe o POST JSON do formulário (FormSubmit/Formspree). Vazio = só WhatsApp
  autoplayMs: 6000,
  lang: 'en',                    // 'pt' ou 'en' — define os textos abaixo e o nome dos países
  txt: {
    enviando: 'Sending…',
    sucTitulo: 'Your details are on the way!',
    sucTexto: 'Your details were e-mailed to the AURA Corais team. You will soon receive the full presentation and the latest news about the launch.',
    erroTitulo: 'We could not send it right now',
    erroTexto: 'The automatic submission failed. Talk to the AURA Corais team on WhatsApp — we answer in minutes.',
    telBR: '(DD) 99999-9999',
    telIntl: 'Number with area code',
    semPais: 'No country found'
  }
};

/* Países do seletor de DDI do formulário (o primeiro é o padrão).
   icone-js:sms_failed — ícone usado só pelo JS; precisa entrar no subconjunto do Material Symbols. */
const PAISES = [
  { n: 'Brasil', e: 'Brazil', c: '55', f: '\u{1F1E7}\u{1F1F7}' },
  { n: 'Portugal', e: 'Portugal', c: '351', f: '\u{1F1F5}\u{1F1F9}' },
  { n: 'Estados Unidos / Canadá', e: 'United States / Canada', c: '1', f: '\u{1F1FA}\u{1F1F8}' },
  { n: 'Argentina', e: 'Argentina', c: '54', f: '\u{1F1E6}\u{1F1F7}' },
  { n: 'Chile', e: 'Chile', c: '56', f: '\u{1F1E8}\u{1F1F1}' },
  { n: 'Uruguai', e: 'Uruguay', c: '598', f: '\u{1F1FA}\u{1F1FE}' },
  { n: 'Paraguai', e: 'Paraguay', c: '595', f: '\u{1F1F5}\u{1F1FE}' },
  { n: 'Bolívia', e: 'Bolivia', c: '591', f: '\u{1F1E7}\u{1F1F4}' },
  { n: 'Peru', e: 'Peru', c: '51', f: '\u{1F1F5}\u{1F1EA}' },
  { n: 'Colômbia', e: 'Colombia', c: '57', f: '\u{1F1E8}\u{1F1F4}' },
  { n: 'Equador', e: 'Ecuador', c: '593', f: '\u{1F1EA}\u{1F1E8}' },
  { n: 'Venezuela', e: 'Venezuela', c: '58', f: '\u{1F1FB}\u{1F1EA}' },
  { n: 'México', e: 'Mexico', c: '52', f: '\u{1F1F2}\u{1F1FD}' },
  { n: 'Costa Rica', e: 'Costa Rica', c: '506', f: '\u{1F1E8}\u{1F1F7}' },
  { n: 'Panamá', e: 'Panama', c: '507', f: '\u{1F1F5}\u{1F1E6}' },
  { n: 'Espanha', e: 'Spain', c: '34', f: '\u{1F1EA}\u{1F1F8}' },
  { n: 'França', e: 'France', c: '33', f: '\u{1F1EB}\u{1F1F7}' },
  { n: 'Itália', e: 'Italy', c: '39', f: '\u{1F1EE}\u{1F1F9}' },
  { n: 'Alemanha', e: 'Germany', c: '49', f: '\u{1F1E9}\u{1F1EA}' },
  { n: 'Reino Unido', e: 'United Kingdom', c: '44', f: '\u{1F1EC}\u{1F1E7}' },
  { n: 'Irlanda', e: 'Ireland', c: '353', f: '\u{1F1EE}\u{1F1EA}' },
  { n: 'Países Baixos', e: 'Netherlands', c: '31', f: '\u{1F1F3}\u{1F1F1}' },
  { n: 'Bélgica', e: 'Belgium', c: '32', f: '\u{1F1E7}\u{1F1EA}' },
  { n: 'Suíça', e: 'Switzerland', c: '41', f: '\u{1F1E8}\u{1F1ED}' },
  { n: 'Áustria', e: 'Austria', c: '43', f: '\u{1F1E6}\u{1F1F9}' },
  { n: 'Luxemburgo', e: 'Luxembourg', c: '352', f: '\u{1F1F1}\u{1F1FA}' },
  { n: 'Suécia', e: 'Sweden', c: '46', f: '\u{1F1F8}\u{1F1EA}' },
  { n: 'Noruega', e: 'Norway', c: '47', f: '\u{1F1F3}\u{1F1F4}' },
  { n: 'Dinamarca', e: 'Denmark', c: '45', f: '\u{1F1E9}\u{1F1F0}' },
  { n: 'Finlândia', e: 'Finland', c: '358', f: '\u{1F1EB}\u{1F1EE}' },
  { n: 'Polônia', e: 'Poland', c: '48', f: '\u{1F1F5}\u{1F1F1}' },
  { n: 'Grécia', e: 'Greece', c: '30', f: '\u{1F1EC}\u{1F1F7}' },
  { n: 'Turquia', e: 'Türkiye', c: '90', f: '\u{1F1F9}\u{1F1F7}' },
  { n: 'Israel', e: 'Israel', c: '972', f: '\u{1F1EE}\u{1F1F1}' },
  { n: 'Emirados Árabes Unidos', e: 'United Arab Emirates', c: '971', f: '\u{1F1E6}\u{1F1EA}' },
  { n: 'África do Sul', e: 'South Africa', c: '27', f: '\u{1F1FF}\u{1F1E6}' },
  { n: 'Angola', e: 'Angola', c: '244', f: '\u{1F1E6}\u{1F1F4}' },
  { n: 'Moçambique', e: 'Mozambique', c: '258', f: '\u{1F1F2}\u{1F1FF}' },
  { n: 'Cabo Verde', e: 'Cabo Verde', c: '238', f: '\u{1F1E8}\u{1F1FB}' },
  { n: 'Austrália', e: 'Australia', c: '61', f: '\u{1F1E6}\u{1F1FA}' },
  { n: 'Nova Zelândia', e: 'New Zealand', c: '64', f: '\u{1F1F3}\u{1F1FF}' },
  { n: 'Japão', e: 'Japan', c: '81', f: '\u{1F1EF}\u{1F1F5}' },
  { n: 'China', e: 'China', c: '86', f: '\u{1F1E8}\u{1F1F3}' },
  { n: 'Índia', e: 'India', c: '91', f: '\u{1F1EE}\u{1F1F3}' }
];

/* ---------- abertura: partículas se juntam e formam a logo; "Mova para abrir" libera o hero em cascata ---------- */
function iniciarAbertura() {
  const el = document.getElementById('intro');
  if (!el) return;
  const body = document.body;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.remove(); body.classList.add('aberto'); return; }
  body.classList.add('intro-ativa');

  const cv = document.getElementById('intro-canvas');
  const ctx = cv.getContext('2d');
  const DUR = 2600;                       // tempo para as partículas formarem a logo
  const CREME = '#F2ECDF', MEL = '#C99865';
  let W, H, pts = [], formado = false, entrou = false, inicio = 0, saida = 0;

  function medir() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  medir();

  function entrar(forcado) {
    if (entrou || (!formado && !forcado)) return;
    entrou = true; saida = performance.now();
    el.classList.add('saindo');
    body.classList.remove('intro-ativa');
    body.classList.add('aberto');
    if (forcado) el.remove();
  }

  // pontos-alvo: pixels opacos da logo (creme), amostrados numa grade
  const img = new Image();
  img.onload = () => {
    const lw = Math.min(W * (W < 768 ? 0.8 : 0.58), 560);
    const lh = lw * img.height / img.width;
    const off = document.createElement('canvas');
    off.width = Math.round(lw); off.height = Math.round(lh);
    const oc = off.getContext('2d');
    oc.drawImage(img, 0, 0, off.width, off.height);
    let dados;
    try { dados = oc.getImageData(0, 0, off.width, off.height).data; } catch (_) { entrar(true); return; }
    const passo = Math.max(2, Math.round(lw / 175));
    const ox = (W - lw) / 2, oy = (H - lh) / 2 - 24;
    let alvos = [];
    for (let y = 0; y < off.height; y += passo) {
      for (let x = 0; x < off.width; x += passo) {
        if (dados[(y * off.width + x) * 4 + 3] > 120) alvos.push([ox + x, oy + y]);
      }
    }
    for (let i = alvos.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [alvos[i], alvos[j]] = [alvos[j], alvos[i]]; }
    alvos = alvos.slice(0, 2600);
    const raio = Math.max(W, H);
    pts = alvos.map(a => {
      const ang = Math.random() * Math.PI * 2, r = raio * (0.35 + Math.random() * 0.55);
      return { tx: a[0], ty: a[1], sx: W / 2 + Math.cos(ang) * r, sy: H / 2 + Math.sin(ang) * r,
               atraso: Math.random() * 0.45, tam: 1.2 + Math.random() * 1.2, mel: Math.random() < 0.16, fase: Math.random() * 6.283 };
    });
    inicio = performance.now();
    requestAnimationFrame(quadro);
  };
  img.onerror = () => entrar(true);
  img.src = 'assets/logo-creme.png';

  const suave = t => 1 - Math.pow(1 - t, 3);
  function quadro(agora) {
    const t = Math.min(1, (agora - inicio) / DUR);
    const seg = (agora - inicio) / 1000;
    const fim = saida ? Math.min(1, (agora - saida) / 1100) : 0;
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      const k = suave(Math.max(0, Math.min(1, (t - p.atraso) / (1 - p.atraso))));
      let x = p.sx + (p.tx - p.sx) * k, y = p.sy + (p.ty - p.sy) * k;
      if (k >= 1) { x += Math.sin(seg * 1.3 + p.fase) * 0.7; y += Math.cos(seg * 1.1 + p.fase) * 0.7; }   // respiração
      if (fim) { const a = Math.atan2(y - H / 2, x - W / 2); x += Math.cos(a) * fim * fim * W * 0.7; y += Math.sin(a) * fim * fim * H * 0.7; }
      ctx.globalAlpha = Math.min(1, 0.12 + k) * (1 - fim);
      ctx.fillStyle = p.mel ? MEL : CREME;
      ctx.beginPath(); ctx.arc(x, y, p.tam, 0, 6.283); ctx.fill();
    }
    if (t >= 1 && !formado) {
      formado = true; el.classList.add('pronto');
      setTimeout(() => entrar(), 12000);   // rede de segurança: abre sozinho se ninguém interagir
    }
    if (saida && agora - saida > 1400) { el.remove(); return; }
    requestAnimationFrame(quadro);
  }

  window.addEventListener('wheel', e => { if (e.deltaY > 0) entrar(); }, { passive: true });
  window.addEventListener('touchmove', () => entrar(), { passive: true });
  window.addEventListener('keydown', e => { if (['ArrowDown', 'PageDown', 'Enter', ' '].includes(e.key)) entrar(); });
  el.addEventListener('click', () => entrar());
  window.addEventListener('resize', medir);
}

document.addEventListener('DOMContentLoaded', () => {
  iniciarAbertura();

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

  /* ---------- formulário: seletor de país, envio por e-mail e confirmação ---------- */
  const form = document.getElementById('form-lead');
  if (form) {
    const nome = form.querySelector('[name=nome]');
    const email = form.querySelector('[name=email]');
    const tel = form.querySelector('[name=telefone]');
    const ddi = form.querySelector('.ddi');
    const ddiBotao = ddi.querySelector('.ddi-botao');
    const ddiPainel = ddi.querySelector('.ddi-painel');
    const ddiBusca = ddi.querySelector('.ddi-busca input');
    const ddiLista = ddi.querySelector('.ddi-opcoes');
    const campoPais = ddi.querySelector('input[type=hidden]');
    const consent = form.querySelector('[name=consent]');
    const sucesso = document.getElementById('form-sucesso');
    const cabecalho = document.getElementById('form-cabecalho');
    const botao = form.querySelector('button[type=submit]');
    const rotuloBotao = botao.textContent;

    /* seletor de país (DDI): lista própria, com a paleta do site (o <select> nativo não é estilizável) */
    let iPais = 0, foco = 0;
    const semAcento = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const nomePais = p => (CONFIG.lang === 'en' ? p.e : p.n);
    PAISES.forEach((p, i) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(i === 0));
      li.innerHTML = '<span class="bandeira"></span><span class="nome"></span><span class="cod"></span>';
      li.querySelector('.bandeira').textContent = p.f;
      li.querySelector('.nome').textContent = nomePais(p);
      li.querySelector('.cod').textContent = '+' + p.c;
      li.addEventListener('click', () => { escolherPais(i); fecharDdi(); tel.focus(); });
      ddiLista.appendChild(li);
    });
    const itensDdi = [...ddiLista.children];
    const vazioDdi = document.createElement('li');
    vazioDdi.className = 'vazio'; vazioDdi.hidden = true; vazioDdi.textContent = CONFIG.txt.semPais;
    ddiLista.appendChild(vazioDdi);

    const pais = () => PAISES[iPais];
    const ehBR = () => pais().c === '55';
    function formatarTel() {
      let v = tel.value.replace(/\D/g, '').slice(0, ehBR() ? 11 : 15);
      if (ehBR()) {
        if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, v.length > 10 ? 7 : 6)}-${v.slice(v.length > 10 ? 7 : 6)}`;
        else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        else if (v.length > 0) v = `(${v}`;
      }
      tel.value = v;
    }
    function escolherPais(i) {
      iPais = i;
      const p = pais();
      ddiBotao.querySelector('.bandeira').textContent = p.f;
      ddiBotao.querySelector('.cod').textContent = '+' + p.c;
      campoPais.value = nomePais(p);
      itensDdi.forEach((li, k) => li.setAttribute('aria-selected', String(k === i)));
      tel.placeholder = ehBR() ? CONFIG.txt.telBR : CONFIG.txt.telIntl;
      formatarTel();
    }
    function marcarFoco(i) {
      foco = i;
      itensDdi.forEach((li, k) => li.classList.toggle('foco', k === i));
      if (itensDdi[i]) itensDdi[i].scrollIntoView({ block: 'nearest' });
    }
    function filtrarDdi(t) {
      const q = semAcento(t.trim()), dig = t.replace(/\D/g, '');
      let visiveis = 0;
      itensDdi.forEach((li, k) => {
        const p = PAISES[k];
        const ok = !q || semAcento(p.n).includes(q) || semAcento(p.e).includes(q) || (dig && p.c.startsWith(dig));
        li.hidden = !ok;
        if (ok) visiveis++;
      });
      vazioDdi.hidden = visiveis > 0;
      const primeiro = itensDdi.findIndex(li => !li.hidden);
      marcarFoco(primeiro < 0 ? -1 : primeiro);
    }
    function abrirDdi() {
      ddi.classList.add('aberto');
      ddiPainel.hidden = false;
      ddiBotao.setAttribute('aria-expanded', 'true');
      ddiBusca.value = '';
      filtrarDdi('');
      marcarFoco(iPais);
      if (itensDdi[iPais]) itensDdi[iPais].scrollIntoView({ block: 'center' });
      setTimeout(() => ddiBusca.focus(), 40);
    }
    function fecharDdi() {
      ddi.classList.remove('aberto');
      ddiPainel.hidden = true;
      ddiBotao.setAttribute('aria-expanded', 'false');
    }
    ddiBotao.addEventListener('click', () => (ddi.classList.contains('aberto') ? fecharDdi() : abrirDdi()));
    ddiBusca.addEventListener('input', () => filtrarDdi(ddiBusca.value));
    ddiPainel.addEventListener('keydown', e => {
      const visiveis = itensDdi.filter(li => !li.hidden);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!visiveis.length) return;
        const atual = visiveis.indexOf(itensDdi[foco]);
        const prox = visiveis[(atual + (e.key === 'ArrowDown' ? 1 : -1) + visiveis.length) % visiveis.length] || visiveis[0];
        marcarFoco(itensDdi.indexOf(prox));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (foco >= 0 && !itensDdi[foco].hidden) { escolherPais(foco); fecharDdi(); tel.focus(); }
      } else if (e.key === 'Escape') {
        e.preventDefault(); fecharDdi(); ddiBotao.focus();
      }
    });
    document.addEventListener('click', e => { if (!ddi.contains(e.target) && ddi.classList.contains('aberto')) fecharDdi(); });
    tel.addEventListener('input', formatarTel);
    escolherPais(0);

    const marca = (el, ok) => el.closest('.campo').classList.toggle('invalido', !ok);

    function mostrarResultado(ok, mail) {
      sucesso.classList.toggle('falhou', !ok);
      sucesso.querySelector('.icone .ms').textContent = ok ? 'mark_email_read' : 'sms_failed';
      sucesso.querySelector('.suc-titulo').textContent = ok ? CONFIG.txt.sucTitulo : CONFIG.txt.erroTitulo;
      sucesso.querySelector('.suc-texto').textContent = ok ? CONFIG.txt.sucTexto : CONFIG.txt.erroTexto;
      const eco = sucesso.querySelector('.suc-eco');
      eco.classList.toggle('oculto', !ok);
      sucesso.querySelector('.suc-email').textContent = mail;
      form.classList.add('oculto'); cabecalho.classList.add('oculto'); sucesso.classList.remove('oculto');
      sucesso.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const dig = tel.value.replace(/\D/g, '');
      const okNome = nome.value.trim().length >= 3;
      const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      const okTel = ehBR() ? (dig.length >= 10 && dig.length <= 11) : (dig.length >= 6 && dig.length <= 15);
      const corretor = form.querySelector('[name=corretor]:checked');
      const okCorretor = !!corretor;
      const okConsent = !consent || consent.checked;
      marca(nome, okNome); marca(email, okEmail); marca(tel, okTel);
      form.querySelector('[name=corretor]').closest('.campo').classList.toggle('invalido', !okCorretor);
      if (consent) consent.closest('.campo').classList.toggle('invalido', !okConsent);
      if (!(okNome && okEmail && okTel && okCorretor && okConsent)) return;

      const p = pais();
      const dados = {
        Nome: nome.value.trim(),
        'E-mail': email.value.trim(),
        WhatsApp: `+${p.c} ${tel.value.trim()}`,
        'País': nomePais(p),
        'Corretor de imóveis': corretor.value,
        Idioma: CONFIG.lang === 'en' ? 'Inglês (EN)' : 'Português (PT)',
        Origem: location.href,
        Enviado: new Date().toLocaleString('pt-BR'),
        _subject: `Novo cadastro no site — ${CONFIG.nome}`,
        _template: 'table',
        _captcha: 'false'
      };

      botao.disabled = true; botao.textContent = CONFIG.txt.enviando;
      let ok = false;
      if (CONFIG.formEndpoint) {
        try {
          const r = await fetch(CONFIG.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(dados)
          });
          let js = null;
          try { js = await r.clone().json(); } catch (_) { /* resposta sem JSON */ }
          ok = r.ok && !(js && String(js.success) === 'false');
        } catch (_) { ok = false; }
      }
      botao.disabled = false; botao.textContent = rotuloBotao;
      mostrarResultado(ok, email.value.trim());
    });

    document.getElementById('form-reset').addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('.campo').forEach(c => c.classList.remove('invalido'));
      escolherPais(0);
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

  /* ---------- faixa de fotos dos lofts ---------- */
  document.querySelectorAll('.loft-fotos').forEach(caixa => {
    const faixa = caixa.querySelector('.lf-strip');
    const passo = () => {
      const f = faixa.querySelector('.lf');
      return f ? f.getBoundingClientRect().width + 2 : 240;
    };
    caixa.querySelector('.lf-seta.esq').addEventListener('click', () => faixa.scrollBy({ left: -passo(), behavior: 'smooth' }));
    caixa.querySelector('.lf-seta.dir').addEventListener('click', () => faixa.scrollBy({ left: passo(), behavior: 'smooth' }));
  });

  /* ---------- lightbox das imagens (galeria e lofts) ---------- */
  const zoom = document.getElementById('zoom');
  if (zoom) {
    const zImg = zoom.querySelector('.zoom-img');
    const zLeg = zoom.querySelector('.zoom-leg');
    const navs = [...zoom.querySelectorAll('.zoom-nav')];
    let grupo = [], k = 0;
    const pintar = () => {
      const el = grupo[k];
      if (!el) return;
      zImg.src = el.currentSrc || el.src;
      zImg.alt = el.alt || '';
      zLeg.textContent = el.dataset.zoom || '';
      navs.forEach(b => b.classList.toggle('oculto', grupo.length < 2));
    };
    const abrir = (lista, i) => {
      grupo = lista; k = Math.max(0, i); pintar();
      zoom.classList.add('ativo'); zoom.setAttribute('aria-hidden', 'false');
      document.body.classList.add('zoom-aberto');
      zoom.querySelector('.zoom-fechar').focus();
    };
    const fechar = () => {
      zoom.classList.remove('ativo'); zoom.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('zoom-aberto');
    };
    const andar = d => { if (grupo.length) { k = (k + d + grupo.length) % grupo.length; pintar(); } };
    document.querySelectorAll('img[data-zoom]').forEach(img => {
      img.addEventListener('click', () => {
        const caixa = img.closest('.slides, .lf-strip');
        const lista = caixa ? [...caixa.querySelectorAll('img[data-zoom]')] : [img];
        abrir(lista, lista.indexOf(img));
      });
    });
    zoom.querySelector('.zoom-fechar').addEventListener('click', fechar);
    zoom.querySelector('.zoom-nav.esq').addEventListener('click', () => andar(-1));
    zoom.querySelector('.zoom-nav.dir').addEventListener('click', () => andar(1));
    zoom.addEventListener('click', e => { if (e.target === zoom || e.target === zImg) fechar(); });
    document.addEventListener('keydown', e => {
      if (!zoom.classList.contains('ativo')) return;
      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowRight') andar(1);
      if (e.key === 'ArrowLeft') andar(-1);
    });
  }

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
