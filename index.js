/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-undef *//* eslint-disable-next-line linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-else-return *//* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */

// Função auto-executável
// Confirm que dá acesso ao formulário de login ou redireciona para uma página '404 error'
(function () {
  const resposta = confirm('Você está entrando em uma página restrita a colaboradores !!!');
  if (resposta === false) {
    location.href = 'error.html';
  }
}());

$(document).ready(() => {
  $('#email').attr('placeholder', 'Digite seu e-mail');
});

// Função com nome
// Manipulação de String "toLowerCase"
function logar() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const manterLogado = $('#manterLogado').prop('checked');

  fetch('http://localhost:3000/users')
    .then((response) => response.json())
    .then((users) => {
      const user = users.find((u) => u.email === email && u.password === senha);
      if (user) {
        if (manterLogado) {
          document.cookie = `email=${email}; expires=Thu, 31 Dec 2024 23:59:59 UTC; path=/`;
          document.cookie = `senha=${senha}; expires=Thu, 31 Dec 2024 23:59:59 UTC; path=/`;
        }
        location.href = 'redirect.html';
      } else {
        exibirErro();
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
    });

  return false;
}

// Função aninhada para exibir uma mensagem de erro
function exibirErro() {
  setTimeout(() => {
    alert('Email ou senha incorretos');
  }, 500);
}

// Função anônima com argumento, usada para também aceitar o "Enter" como botão entrar
document.addEventListener('keypress', (e) => {
  // Evento de teclado (quando o usuário utiliza a tecla)
  if (e.key === 'Enter') {
    const btn = document.querySelector('#entrar');
    // Evento de mouse (quando o usuário clica no botão para entrar)
    btn.click();
  }
});

function redefinir() {
  window.location.href = 'redefinir.html';
}
