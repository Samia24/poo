import { AvisoError, SaldoInsuficienteError, ValorInvalidoError } from "./excecoes";

class Cliente {
    id: number;
    nome: string;

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
    }
}

class Conta {
    numero: string;
    cliente: Cliente;
    private _saldo: number;

    constructor(numero: string, saldo: number, cliente: Cliente) {
        this.numero = numero;
        this.cliente = cliente;
        this.depositar(saldo);
        this._saldo = saldo;
    }

    sacar(valor: number) {

        this.validaValor(valor)
        if (this._saldo < valor){
            throw new SaldoInsuficienteError(`\nSaldo insuficiente na conta ${this.numero} !!\nSaldo da conta: R$ ${this._saldo.toFixed(2)}.`);
        }
        this._saldo = this._saldo - valor;
        
        
    }
    
    validaValor(valor: number): void{
        if(valor < 0 || isNaN(valor)){
            throw new ValorInvalidoError(`\nValor inválido !`);
        }
    }

    depositar(valor: number): void {
        this.validaValor(valor);
        this._saldo = this._saldo + valor
    }

    get saldo(): number {
        return this._saldo;
    }

    /*
    consultarSaldo(): number {
        return this._saldo;
    }*/

    transferir(contaDestino: Conta, valor: number): void {
        /*
        this.saldo = this.saldo - valor;
        contaDestino.saldo = contaDestino.saldo + valor;
        */
        this.sacar(valor);
        contaDestino.depositar(valor);

    }
}

class Poupanca extends Conta {
    private _taxaDeJuros: number

    constructor(numero: string, saldo: number, cliente: Cliente, taxaDeJuros: number) {

        super(numero, saldo, cliente);
        this._taxaDeJuros = taxaDeJuros;
    }

    get taxaDeJuros(): number {
        return this._taxaDeJuros;
    }
    
    public renderJuros() {
        let juros: number = this.saldo * this._taxaDeJuros / 100;
        this.depositar(juros);
    }
}

class ContaImposto extends Conta {
    private _taxaDeDesconto: number = 0;

    constructor(numero: string, saldo: number, cliente: Cliente, taxaImposto: number) {
        super(numero, saldo, cliente);
        this._taxaDeDesconto = taxaImposto;
    }

    sacar(valor: number): void {
        super.sacar(valor);
        let valorImposto = valor * this._taxaDeDesconto / 100;
        super.sacar(valorImposto)
    }

    get taxaDeDesconto(): number {
        return this._taxaDeDesconto;
    }

}

export { Cliente, Conta, Poupanca, ContaImposto };