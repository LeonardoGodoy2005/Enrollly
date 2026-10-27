
const formulario = document.querySelector("#formulario-matricula");
const campoNome = document.querySelector("#nome");
const campoNascimento = document.querySelector("#nascimento");
const campoTelefone = document.querySelector("#telefone");
const campoEmail = document.querySelector("#email");
const mensagemFeedback = document.querySelector("#mensagem-feedback");
const botaoEnviar = formulario.querySelector('button[type="submit"]');

// Exibe mensagens de feedback para o usuário.
function mostrarMensagem(texto, tipo) {
  mensagemFeedback.textContent = texto;
  mensagemFeedback.hidden = false;
  mensagemFeedback.className = `feedback-${tipo}`;
}

// Limpa a mensagem quando o usuário começa a corrigir os dados.
formulario.addEventListener("input", () => {
  mensagemFeedback.hidden = true;
  mensagemFeedback.textContent = "";
});

// Formata o telefone enquanto o usuário digita.
campoTelefone.addEventListener("input", () => {
  const numeros = campoTelefone.value.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 2) {
    campoTelefone.value = numeros.length
      ? `(${numeros}`
      : "";
  } else if (numeros.length <= 6) {
    campoTelefone.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  } else if (numeros.length <= 10) {
    campoTelefone.value =
      `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  } else {
    campoTelefone.value =
      `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }
});

// Valida o formulário antes de simular o envio.
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = campoNome.value.trim().replace(/\s+/g, " ");
  const telefone = campoTelefone.value.replace(/\D/g, "");
  const nascimento = campoNascimento.value;

  if (nome.split(" ").filter(Boolean).length < 2) {
    mostrarMensagem(
      "Informe seu nome e sobrenome.",
      "erro"
    );

    campoNome.focus();
    return;
  }

  if (nascimento) {
    const dataNascimento = new Date(`${nascimento}T00:00:00`);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (
      Number.isNaN(dataNascimento.getTime()) ||
      dataNascimento > hoje
    ) {
      mostrarMensagem(
        "Informe uma data de nascimento válida.",
        "erro"
      );

      campoNascimento.focus();
      return;
    }
  }

  if (telefone.length !== 10 && telefone.length !== 11) {
    mostrarMensagem(
      "Informe um telefone válido com DDD.",
      "erro"
    );

    campoTelefone.focus();
    return;
  }

  // Mantém os dados normalizados no formulário.
  campoNome.value = nome;

  mostrarMensagem(
    "Validação concluída! O formulário está correto, mas os dados ainda não foram enviados a um servidor.",
    "sucesso"
  );

  // Não enviamos nem armazenamos dados neste protótipo.
  botaoEnviar.textContent = "Dados validados ✓";
});
