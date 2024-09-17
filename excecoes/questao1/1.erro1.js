"use strict";
function dividir(a, b) {
    if (b === 0) {
        console.error("\nErro: Divisão por zero não é permitida\n");
        return 0;
    }
    return a / b;
}
dividir(10, 0); // Saída: Erro: Divisão por zero não é permitida
