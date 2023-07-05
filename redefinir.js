use restrict;

function enviarSolicitacao(exibirSucesso) {
  const formulario = document.forms[0];

  const nomeInput = formulario.elements.nome;
  const emailInput = formulario.elements.email;
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const respostaUsuario = parseInt(document.getElementById('resposta').value, 10);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nome.split(' ').length < 2) {
    exibirMensagem('Digite nome e sobrenome', 'alert-danger');
    return;
  }

  if (nome === '' || email === '') {
    exibirMensagem('Por favor, preencha todos os campos.', 'alert-danger');
    return;
  }

  if (emailRegex.test(email)) {
    const num1 = 3;
    const num2 = 4;
    const resultado = somar(num1, num2);

    if (resultado === respostaUsuario) {
      exibirMensagem('Solicitação enviada ao administrador!', 'alert-success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
      formulario.reset();
      exibirSucesso();
    } else {
      exibirMensagem('Resposta incorreta! Por favor, tente novamente.', 'alert-danger');
    }
  } else {
    exibirMensagem('E-mail inválido. Por favor, insira um e-mail válido.', 'alert-danger');
  }
}

function exibirSucesso() {
  console.log('Solicitação enviada com sucesso!');
}

window.onload = function () {
  document.getElementById('enviar').addEventListener('click', () => {
    enviarSolicitacao(exibirSucesso);
  });
};

function somar(a, b) {
  return a + b;
}

function exibirMensagem(mensagem, tipo) {
  const mensagemContainer = document.createElement('div');
  mensagemContainer.classList.add('alert', tipo);
  mensagemContainer.textContent = mensagem;

  const container = document.getElementById('mensagem-container');
  container.innerHTML = '';
  container.appendChild(mensagemContainer);
  setTimeout(() => {
    container.innerHTML = '';
  }, 3000);
}
