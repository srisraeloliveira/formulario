//Validar CPF, apenas verificação em console.

//705.484.450-52 -> Cpf Valido
//070.987.720-03 -> Cpf Valido
//15756835728 -> Cpf Inválido

//função para limpar o cpf enviado
function ValidaCPF(cpfEnviado) {
  Object.defineProperty(this, "cpfLimpo", {
    enumerable: true,
    get: function () {
      //Expressão regular para tirar deixar apenas digitos numericos -> /\D+/g, ""
      return cpfEnviado.replace(/\D+/g, "");
    },
  });
}
//função para validar cpf e retornar o cpf "limpo"
ValidaCPF.prototype.valida = function () {
  if (typeof this.cpfLimpo === "undefined") return false;
  if (this.cpfLimpo.length !== 11) return false;
  if (this.isSequencia()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.criaDig(cpfParcial);
  const digito2 = this.criaDig(cpfParcial + digito1);

  const novoCpf = cpfParcial + digito1 + digito2;

  return novoCpf === this.cpfLimpo;
};

//função para criar digitos para ser verificado (parte 1 (9dig) e parte 2 (2dig))
ValidaCPF.prototype.criaDig = function (cpfParcial) {
  const cpfArray = Array.from(cpfParcial);
  
  //variável para definir o fator que irá multiplicar o val
  let reg = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, val) => {
    //proteção para val -> deve ser apenas number
    ac += reg * Number(val);
    reg--;
    return ac;
    //por se tratar de reduce, sempre informar o índice inicial = 0
  }, 0);
  //método para verificação de validade de CPF
  const dig = 11 - (total % 11);
  //proteção para dig -> deve ser apenas string
  return dig > 9 ? "0" : String(dig);
};

//função para verificar a sequencia do cpf e não permitir sequencia
ValidaCPF.prototype.isSequencia = function () {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequencia === this.cpfLimpo;
};


//entrada de cpf para teste
// const cpf = new ValidaCPF("705.484.450-52");

// console.log(cpf.valida());

// //retorno se o cpf é válido ou não -> ternário
// cpf.valida() ? console.log("Cpf Válido") : console.log("Cpf Inválido")

//retorno se o cpf é válido ou não -> if/else <- usar menos
// if (cpf.valida()) {
//   console.log("Cpf Válido");
// } else {
//   console.log("Cpf Inválido");
// }
