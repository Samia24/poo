import { ContaExistenteError, ContaInexistenteError, PoupancaInvalidaError } from './excecoes';
import {Cliente, Conta, Poupanca, ContaImposto} from './modelos';

class Banco {
    private _contas: Conta[] = [];

    inserir(conta: Conta) {
        try {
            this.consultar(conta.numero);
            throw new ContaExistenteError(`Conta ${conta.numero} já existe.`);
        } catch (e) {
            if (e instanceof ContaInexistenteError) {
                this._contas.push(conta);
                console.log(`Conta com número ${conta.numero} adicionada com sucesso.`);
            }
        }
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                contaProcurada = this._contas[i];
                break;
            }
        }

        if (contaProcurada == null) {
            throw new ContaInexistenteError(`\nConta com número ${numero} não encontrada.`);
        }

        return contaProcurada;
    }

    alterar(conta: Conta) {
        let contaProcurada: Conta = this.consultar(conta.numero);
        let saldoTemporario = contaProcurada.saldo;
        contaProcurada.sacar(saldoTemporario);
        contaProcurada.depositar(conta.saldo);

        contaProcurada.cliente = conta.cliente;
    }

    alterarPorIndice(conta: Conta) {
        let indice: number = this.consultarPorIndice(conta.numero);
        this._contas[indice] = conta;
       
    }

    private consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        if (indiceProcurado == -1) {
            throw new ContaInexistenteError(`Conta com número ${numero} não encontrada`);
        }

        return indiceProcurado;
    }

    excluir(numero: string): void {
        let indice: number = this.consultarPorIndice(numero);
        for (let i: number = indice; i < this._contas.length; i++) {
            this._contas[i] = this._contas[i + 1];
            console.log(this._contas);
        }
        this._contas.pop();
        console.log(this._contas);
    }

    sacar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        conta.sacar(valor);
    }

    depositar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        conta.depositar(valor);
    }

    transferir(numero: string, numeroContaDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numero);
        let contaDestino: Conta = this.consultar(numeroContaDestino);
        contaOrigem.transferir(contaDestino, valor);
    }

    obterQuantidadeDeContas(): number {
        return this._contas.length;
    }

    obterTotalDeSaldos(): number {
        let total: number = 0;
        for (let conta of this._contas) {
            total += conta.saldo;
        }

        return total;
    }
    
    obterMediaDeSaldos(): number {
        return this.obterTotalDeSaldos() / this.obterQuantidadeDeContas();
    }
    
    executarOrdemDePagamento(numeroContaOrigem: string, valor: number, ...numerosContasDestino: string[]) {
        let contaOrigem: Conta = this.consultar(numeroContaOrigem);

        let numeroDeContasDestino = (numerosContasDestino.length);

        for (let numeroContaDestino of numerosContasDestino) {
            this.consultar(numeroContaDestino);
        }

        contaOrigem.sacar(valor * numeroDeContasDestino);

        for (let numeroContaDestino of numerosContasDestino) {
            this.depositar(numeroContaDestino, valor)
        }
    }

    consultarSaldo(numero: string): number {
        let conta: Conta = this.consultar(numero);
        return conta.saldo;
    }

    renderJuros(numero: string): void {
        let conta: Conta = this.consultar(numero);

        if (conta instanceof Poupanca) {
            (conta as Poupanca).renderJuros();
        }

        throw new PoupancaInvalidaError('\nConta nao eh do tipo poupanca.');
    }

    get contas(): Conta[] {
      return this._contas;
    }
}


export {Banco};