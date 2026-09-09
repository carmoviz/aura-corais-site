/* Abre o site no idioma do navegador e lembra a escolha do visitante.
   Roda no <head>, antes de qualquer pintura: o alvo vem de data-idioma-alt no <html>. */
(function () {
  var CHAVE = 'aura-idioma';
  var raiz = document.documentElement;
  var atual = (raiz.lang || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
  var alt = raiz.getAttribute('data-idioma-alt');
  var salvo = null;
  try { salvo = localStorage.getItem(CHAVE); } catch (e) {}
  var navegador = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'pt']);
  var querPt = false;
  for (var i = 0; i < navegador.length; i++) {
    if (String(navegador[i]).toLowerCase().indexOf('pt') === 0) { querPt = true; break; }
  }
  var preferido = salvo || (querPt ? 'pt' : 'en');
  if (preferido !== atual && alt && !/[?&]lang=fixo/.test(location.search)) {
    location.replace(alt);          // replace: não polui o histórico nem cria laço com o botão voltar
    return;
  }
  document.addEventListener('DOMContentLoaded', function () {
    var link = document.querySelector('.idioma');
    if (!link) return;
    link.addEventListener('click', function () {
      try { localStorage.setItem(CHAVE, atual === 'pt' ? 'en' : 'pt'); } catch (e) {}
    });
  });
})();
