let acaoConfirmada = null;

function abrirModalConfirmacao(titulo, mensagem, callback) {
  document.getElementById("modalTitulo").innerText = titulo;
  document.getElementById("mensagemConfirmar").innerHTML = mensagem;

  acaoConfirmada = callback;

  const btn = document.getElementById("btnConfirmarRemocao");
  btn.onclick = () => {
    if (acaoConfirmada) acaoConfirmada();
    fecharModalConfirmar();
  };

  abrirModal("modalConfirmar");
}

function fecharModalConfirmar() {
  fecharModal("modalConfirmar");
  acaoConfirmada = null;
}

function abrirModalNotificacao(titulo, mensagem) {
  document.getElementById("modalNotificacaoTitulo").innerText = titulo;
  document.getElementById("mensagemNotificacao").innerHTML = mensagem;
  abrirModal("modalNotificacao");
}

function fecharModalNotificacao() {
  fecharModal("modalNotificacao");
}

function abrirModal(id) {
  document.getElementById(id).style.display = "flex";
  document.getElementById(id).classList.remove("hidden");
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
  document.getElementById(id).classList.add("hidden");
}