class ValidaFormulário {
  constructor() {
    this.formulario = document.querySelector(".formulario");
    this.eventos();
  }

  //método para enviar as informações para o formulário
  eventos() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  //envio do formulário
  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if (camposValidos && senhasValidas) {
      alert("Formulário enviado!");
      this.formulario.submit();
    }
  }
  //método para verificação de senhas válidas
  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector(".senha");
    const repetirSenha = this.formulario.querySelector(".repetir-senha");

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, "Campos senha e repetir senha precisam ser iguais");
      this.criaErro(
        repetirSenha,
        "Campos senha e repetir senha precisam ser iguais"
      );
    }

    //criando uma variável para economizar digitação
    let cod = senha.value.length;

    if (cod < 6 || cod > 12) {
      this.criaErro(senha, "Senha precisa ter entre 6 e 12 caracteres");
    }

    return valid;
  }

  //método para verificar se os campos são válidos
  camposSaoValidos() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll(".validar")) {
      const label = campo.previousElementSibling.innerText;
      if (!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
        valid = false;
      }

      if (campo.classList.contains("cpf")) {
        if (!this.validaCPF(campo)) valid = false;
      }
      if (campo.classList.contains("usuario")) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }

    return valid;
  }

  //método para validação de usuários 
  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, "Usuário precisa ter entre 3 e 12 caracteres");
      valid = false;
    }

    if (!usuario.match(/^[a-z A-Z 0-9]+$/g)) {
      //[a-zA-Z0-9]+ [a-z A-Z 0-9]      ->/^[a-z A-Z 0-9]+$/g
      this.criaErro(
        campo,
        "Nome de Usuário precisa conter apenas letras e/ou números"
      );
      valid = false;
    }
    return valid;
  }

  //metodo para verificar CPF em classe criada em script de verificação de CPF
  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.valida()) {
      this.criaErro(campo, "CPF inválido");
      return false;
    }
    return true;
  }

  //método para criar msg de erro
  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
    campo;
  }
}

const valida = new ValidaFormulário();
