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