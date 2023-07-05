/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
/* eslint-disable radix */
// eslint-disable-next-line linebreak-style

setInterval(() => {
  const cronometro = document.getElementById('tempo').innerHTML;
  const regressivo = parseInt(cronometro) - 1;
  if (regressivo === 0) {
    location.href = 'cadastro.html';
  }
  document.getElementById('tempo').innerHTML = regressivo;
}, 1000);
