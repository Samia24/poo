"use strict";
function divisao(a, b) {
    if (b === 0) {
        console.error("\nErro: Divisão por zero não é permitida");
        return -1; // Código de erro indicando divisão inválida
    }
    return a / b;
}
// Uso do código de erro:
const resultado = divisao(10, 0);
if (resultado === -1) {
    console.log("Erro: Tentativa de divisão por zero\n");
}
else {
    console.log("Resultado da divisão:\n", resultado);
}
