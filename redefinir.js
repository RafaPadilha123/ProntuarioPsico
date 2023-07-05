/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line linebreak-style
// eslint-disable-next-line no-unused-vars
function enviarSolicitacao() {
  const formulario = document.forms[0];

  const nomeInput = formulario.elements.nome;
  const emailInput = formulario.elements.email;
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nome.split(' ').length < 2) {
    exibirMensagem('Por favor, insira pelo menos duas palavras no campo Nome Completo.', 'alert-danger');
    return;
  }

  if (nome === '' || email === '') {
    exibirMensagem('Por favor, preencha todos os campos.', 'alert-danger');
    return;
  }

  if (emailRegex.test(email)) {
    exibirMensagem('Solicitação enviada ao administrador!', 'alert-success');
    formulario.reset();
  } else {
    exibirMensagem('E-mail inválido. Por favor, insira um e-mail válido.', 'alert-danger');
  }
}

function exibirMensagem(mensagem, tipo) {
  const mensagemContainer = document.createElement('div');
  mensagemContainer.classList.add('alert', tipo);
  mensagemContainer.textContent = mensagem;

  // Adicione o código necessário para exibir o balão de mensagem onde você deseja na sua página.
  // Por exemplo, você pode adicionar o balão dentro de um elemento com um ID específico:
  const container = document.getElementById('mensagem-container');
  container.innerHTML = '';
  container.appendChild(mensagemContainer);
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 3000);
}
