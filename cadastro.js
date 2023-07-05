/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
/* eslint-disable no-console *//* eslint-disable eol-last *//* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable func-names */

const tituloOriginal = document.title;
window.onblur = function () {
  document.title = 'Cadastro em andamento !!!';
};

window.onfocus = function () {
  document.title = tituloOriginal;
};

$(document).ready(() => {
  $('h5').css('color', '#483D8B');
});

$('.card-header.py-3').css('font-family', 'Comic Sans MS, cursive');

function salvarPaciente() {
  const nome = document.getElementById('nome').value.trim();
  const idade = document.getElementById('idade').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const prontuario = document.getElementById('prontuario').value.trim();

  if (nome !== '' && idade !== '' && telefone !== '' && prontuario !== '') {
    const paciente = {
      nome,
      idade,
      telefone,
      cidade,
      prontuario,
      dataHora: new Date().toLocaleString(),
    };

    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));

    exibirDadosSalvos();
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('prontuario').value = '';

    $('#nome').removeClass('highlight');
    $('#idade').removeClass('highlight');
    $('#telefone').removeClass('highlight');
    $('#cidade').removeClass('highlight');
    $('#prontuario').removeClass('highlight');
  } else {
    $('.custom-message').text('Por favor, preencha todos os campos.').show();
  }
}

function exibirDadosSalvos() {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  let html = '';
  pacientes.forEach((paciente, index) => {
    html += "<div class='paciente'>";
    html += '<h4>Dados do Paciente:</h4>';
    html += `<p><strong>Nome:</strong> ${paciente.nome.toUpperCase()}</p>`;
    html += `<p><strong>Idade:</strong> ${paciente.idade}</p>`;
    html += `<p><strong>Telefone:</strong> ${paciente.telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')}</p>`;
    html += `<p><strong>Cidade:</strong> ${paciente.cidade}</p>`;
    html += `<p><strong>Síntese da Escuta:</strong> ${paciente.prontuario}</p>`;
    html += `<p><strong>Data e Hora:</strong> ${paciente.dataHora}</p>`;
    html += `<button class='btn-editar' data-index='${index}'>Editar</button>`;
    html += `<button class='btn-excluir' data-index='${index}'>Excluir</button>`;
    html += '</div>';
    html += '---------------------------------------------------------------------------------------------';
  });

  document.getElementById('prontuarios').innerHTML = html;

  const btnExcluir = document.getElementsByClassName('btn-excluir');
  for (let i = 0; i < btnExcluir.length; i++) {
    btnExcluir[i].addEventListener('click', excluirPaciente);
  }

  const btnEditar = document.getElementsByClassName('btn-editar');
  for (let i = 0; i < btnEditar.length; i++) {
    btnEditar[i].addEventListener('click', editarPaciente);
  }
}

$(document).ready(() => {
  $('#telefone').inputmask({
    mask: '(99) 99999-9999',
    autoUnmask: true,
  });

  $('#cidade').autocomplete({
    source(request, response) {
      $.ajax({
        url: 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios',
        method: 'GET',
        data: {
          orderBy: 'nome',
          q: request.term,
        },
        success(data) {
          const cities = [];
          data.forEach((city) => {
            cities.push(city.nome);
          });
          response(cities);
        },
        error(error) {
          console.log(error);
        },
      });
    },
    minLength: 3,
  });

  $('#btnSalvar').click(() => {
    const telefone = $('#telefone').inputmask('unmaskedvalue');
    console.log(telefone);
  });
});

$(() => {
  $(document).on('click', '.btn-excluir', excluirPaciente);
});

function excluirPaciente() {
  const index = $(this).data('index');
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

  const confirmacao = confirm('Tem certeza de que deseja excluir este paciente?');

  if (confirmacao) {
    pacientes.splice(index, 1);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    exibirDadosSalvos();
  }
}

document.getElementById('btnSalvar').addEventListener('click', salvarPaciente);
document.getElementById('btnImprimir').addEventListener('click', exibirDadosSalvos);

function editarPaciente() {
  const index = this.getAttribute('data-index');
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

  const pacienteSelecionado = pacientes[index];
  document.getElementById('nome').value = pacienteSelecionado.nome;
  document.getElementById('idade').value = pacienteSelecionado.idade;
  document.getElementById('telefone').value = pacienteSelecionado.telefone;
  document.getElementById('cidade').value = pacienteSelecionado.cidade;
  document.getElementById('prontuario').value = pacienteSelecionado.prontuario;
  new Date().toLocaleString();

  $('#nome').addClass('highlight');
  $('#idade').addClass('highlight');
  $('#telefone').addClass('highlight');
  $('#cidade').addClass('highlight');
  $('#prontuario').addClass('highlight');

  pacientes.splice(index, 1);

  localStorage.setItem('pacientes', JSON.stringify(pacientes));

  exibirDadosSalvos();

  const botaoSalvar = document.createElement('button');
  botaoSalvar.innerHTML = 'Salvar';
  botaoSalvar.addEventListener('click', function () {
    const pacienteEditado = {
      nome: document.getElementById('nome').value,
      idade: document.getElementById('idade').value,
      telefone: document.getElementById('telefone').value,
      cidade: document.getElementById('cidade').value,
      prontuario: document.getElementById('prontuario').value,
    };

    pacientes.push(pacienteEditado);

    limparCampos();
    localStorage.setItem('pacientes', JSON.stringify(pacientes));

    this.remove();

    exibirDadosSalvos();
  });

  document.getElementById('formulario').appendChild(botaoSalvar);
}
function limparCampos() {
  document.getElementById('nome').value = '';
  document.getElementById('idade').value = '';
  document.getElementById('telefone').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('prontuario').value = '';
}