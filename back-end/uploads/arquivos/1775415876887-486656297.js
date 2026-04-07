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

function toast(mensagem) {
  const div = document.createElement("div");
  div.textContent = mensagem;

  div.className =
    "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}