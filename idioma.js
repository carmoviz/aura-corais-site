/* Abre o site no idioma do navegador e garante que um F5 comece do topo.
   Roda no <head>, antes de qualquer pintura: o alvo vem de data-idioma-alt no <html>.
   Quem grava a preferencia e o script.js, que rebind o clique a cada troca de idioma. */
(function () {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';   // recarregar volta para o topo
  var raiz = document.documentElement;
  var atual = (raiz.lang || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
  var alt = raiz.getAttribute('data-idioma-alt');
  var salvo = null;
  try { salvo = localStorage.getItem('aura-idioma'); } catch (e) {}
  if (salvo !== 'pt' && salvo !== 'en') salvo = null;
  var lista = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'pt']);
  var querPt = false;
  for (var i = 0; i < lista.length; i++) {
    if (String(lista[i]).toLowerCase().indexOf('pt') === 0) { querPt = true; break; }
  }
  var preferido = salvo || (querPt ? 'pt' : 'en');
  if (preferido !== atual && alt && !/[?&]lang=fixo/.test(location.search)) {
    location.replace(alt);          // replace: nao polui o historico nem cria laco com o botao voltar
  }
})();
