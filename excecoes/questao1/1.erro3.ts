function opdivisao(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Divisão por zero não é permitida");
    }
    return a / b;
}

try {
    const resultado = opdivisao(10, 0);
    console.log("Resultado da divisão:", resultado);
} catch (error) {
    if (error instanceof Error) {
        console.error("Erro:", error.message);  // Verifica se 'error' é uma instância de Error e acessa a mensagem
    } else {
        console.error("Erro desconhecido");
    }
}