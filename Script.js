var input = document.getElementById('tela'),
    numeros = document.querySelectorAll('.numeros div'),
    contas = document.querySelectorAll('.contas div'),
    resultado = document.getElementById('resultado'),
    limpar = document.getElementById('limpar'),
    resultadoMostrado = false;

// 1. Adicionar evento para os botões de números e ponto (.)
for (var i = 0; i < numeros.length; i++) {
  numeros[i].addEventListener("click", function(e) {
    var textNaTela = input.innerHTML;
    var valor = e.target.innerHTML;

    if (e.target.id === "limpar") return;

    if (resultadoMostrado === false) {
      input.innerHTML += valor;
    } else {
      resultadoMostrado = false;
      input.innerHTML = valor;
    }
  });
}

// 2. Adicionar evento para os botões de operações (+, -, ×, ÷)
for (var i = 0; i < contas.length; i++) {
  contas[i].addEventListener("click", function(e) {
    var textNaTela = input.innerHTML;
    var ultimoChar = textNaTela[textNaTela.length - 1];
    var operador = e.target.innerHTML;

    if (textNaTela === "") return;

    if (ultimoChar === "+" || ultimoChar === "-" || ultimoChar === "×" || ultimoChar === "÷") {
      input.innerHTML = textNaTela.slice(0, -1) + operador;
    } else {
      input.innerHTML += operador;
    }
    resultadoMostrado = false;
  });
}

// 3. Botão Limpar ("C")
if (limpar) {
  limpar.addEventListener("click", function() {
    input.innerHTML = "";
    resultadoMostrado = false;
  });
}

// 4. Função central de calcular (separada para ser usada tanto pelo clique quanto pelo Enter)
function calcular() {
  var inputString = input.innerHTML;
  if (!inputString) return;

  var expressao = inputString.replace(/×/g, '*').replace(/÷/g, '/');

  try {
    var resultadoFinal = eval(expressao);
    input.innerHTML = resultadoFinal;
    resultadoMostrado = true;
  } catch (error) {
    input.innerHTML = "Erro";
    resultadoMostrado = true;
  }
}

// Botão de Resultado ("=") por clique
resultado.addEventListener("click", calcular);


// ==========================================
// 5. SUPORTE AO TECLADO DO COMPUTADOR
// ==========================================
document.addEventListener("keydown", function(e) {
  var tecla = e.key;

  // Se for um número de 0 a 9 ou ponto (.)
  if (!isNaN(tecla) || tecla === ".") {
    var textNaTela = input.innerHTML;
    if (resultadoMostrado === false) {
      input.innerHTML += tecla;
    } else {
      resultadoMostrado = false;
      input.innerHTML = tecla;
    }
  }

  // Se for operador (+, -, *, /)
  if (tecla === "+" || tecla === "-" || tecla === "*" || tecla === "/") {
    var textNaTela = input.innerHTML;
    var ultimoChar = textNaTela[textNaTela.length - 1];
    
    if (textNaTela === "") return;

    // Transforma * em × e / em ÷ visualmente para manter o padrão
    var operadorVisual = tecla;
    if (tecla === "*") operadorVisual = "×";
    if (tecla === "/") operadorVisual = "÷";

    if (ultimoChar === "+" || ultimoChar === "-" || ultimoChar === "×" || ultimoChar === "÷") {
      input.innerHTML = textNaTela.slice(0, -1) + operadorVisual;
    } else {
      input.innerHTML += operadorVisual;
    }
    resultadoMostrado = false;
  }

  // Tecla Enter ou = para calcular
  if (tecla === "Enter" || tecla === "=") {
    e.preventDefault(); // Evita comportamento padrão do Enter
    calcular();
  }

  // Tecla Backspace para apagar o último caractere
  if (tecla === "Backspace") {
    input.innerHTML = input.innerHTML.slice(0, -1);
  }

  // Tecla Escape (Esc) ou 'c' / 'C' para limpar a tela
  if (tecla === "Escape" || tecla === "c" || tecla === "C") {
    input.innerHTML = "";
    resultadoMostrado = false;
  }
});