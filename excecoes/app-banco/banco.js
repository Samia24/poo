"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = void 0;
const excecoes_1 = require("./excecoes");
const modelos_1 = require("./modelos");
class Banco {
    constructor() {
        this._contas = [];
    }
    inserir(conta) {
        try {
            this.consultar(conta.numero);
            throw new excecoes_1.ContaExistenteError(`Conta ${conta.numero} já existe.`);
        }
        catch (e) {
            if (e instanceof excecoes_1.ContaInexistenteError) {
                this._contas.push(conta);
                console.log(`Conta com número ${conta.numero} adicionada com sucesso.`);
            }
        }
    }
    consultar(numero) {
        let contaProcurada;
        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                contaProcurada = this._contas[i];
                break;
            }
        }
        if (contaProcurada == null) {
            throw new excecoes_1.ContaInexistenteError(`\nConta com número ${numero} não encontrada.`);
        }
        return contaProcurada;
    }
    alterar(conta) {
        let contaProcurada = this.consultar(conta.numero);
        let saldoTemporario = contaProcurada.saldo;
        contaProcurada.sacar(saldoTemporario);
        contaProcurada.depositar(conta.saldo);
        contaProcurada.cliente = conta.cliente;
    }
    alterarPorIndice(conta) {
        let indice = this.consultarPorIndice(conta.numero);
        this._contas[indice] = conta;
    }
    consultarPorIndice(numero) {
        let indiceProcurado = -1;
        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        if (indiceProcurado == -1) {
            throw new excecoes_1.ContaInexistenteError(`Conta com número ${numero} não encontrada`);
        }
        return indiceProcurado;
    }
    excluir(numero) {
        let indice = this.consultarPorIndice(numero);
        for (let i = indice; i < this._contas.length; i++) {
            this._contas[i] = this._contas[i + 1];
            console.log(this._contas);
        }
        this._contas.pop();
        console.log(this._contas);
    }
    sacar(numero, valor) {
        let conta = this.consultar(numero);
        conta.sacar(valor);
    }
    depositar(numero, valor) {
        let conta = this.consultar(numero);
        conta.depositar(valor);
    }
    transferir(numero, numeroContaDestino, valor) {
        let contaOrigem = this.consultar(numero);
        let contaDestino = this.consultar(numeroContaDestino);
        contaOrigem.transferir(contaDestino, valor);
    }
    obterQuantidadeDeContas() {
        return this._contas.length;
    }
    obterTotalDeSaldos() {
        let total = 0;
        for (let conta of this._contas) {
            total += conta.saldo;
        }
        return total;
    }
    obterMediaDeSaldos() {
        return this.obterTotalDeSaldos() / this.obterQuantidadeDeContas();
    }
    executarOrdemDePagamento(numeroContaOrigem, valor, ...numerosContasDestino) {
        let contaOrigem = this.consultar(numeroContaOrigem);
        let numeroDeContasDestino = (numerosContasDestino.length);
        for (let numeroContaDestino of numerosContasDestino) {
            this.consultar(numeroContaDestino);
        }
        contaOrigem.sacar(valor * numeroDeContasDestino);
        for (let numeroContaDestino of numerosContasDestino) {
            this.depositar(numeroContaDestino, valor);
        }
    }
    consultarSaldo(numero) {
        let conta = this.consultar(numero);
        return conta.saldo;
    }
    renderJuros(numero) {
        let conta = this.consultar(numero);
        if (conta instanceof modelos_1.Poupanca) {
            conta.renderJuros();
        }
        throw new excecoes_1.PoupancaInvalidaError('\nConta nao eh do tipo poupanca.');
    }
    get contas() {
        return this._contas;
    }
}
exports.Banco = Banco;
