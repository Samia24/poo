"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBanco = void 0;
const prompt = require("prompt-sync");
const fs = __importStar(require("fs"));
const banco_1 = require("./banco");
const modelos_1 = require("./modelos");
const excecoes_1 = require("./excecoes");
class AppBanco {
    constructor() {
        this._idCliente = 0;
        this.CAMINHO_ARQUIVO = './contas.txt';
        this._input = prompt();
        this._banco = new banco_1.Banco();
        this._input = prompt();
        let conta1 = new modelos_1.Conta('1', 0, new modelos_1.Cliente(1, 'samia'));
        let conta2 = new modelos_1.Conta('2', 40, new modelos_1.Cliente(2, 'maria'));
        this._banco.inserir(conta1);
        this._banco.inserir(conta2);
    }
    menu() {
        let op = "";
        do {
            this.listarOpcoes();
            try {
                op = this._input('Digite uma opção: ');
                if (op !== '0' && op !== '1' && op !== '2' && op !== '3' && op !== '4' && op !== '5' && op !== '6' && op !== '7' && op !== '8' && op !== '9' && op !== '10') {
                    throw new excecoes_1.OpcaoInvalidaError('\nOpcao invalida.');
                }
                switch (op) {
                    case "1":
                        this.cadastrar();
                        break;
                    case "2":
                        this.consultarSaldo();
                        break;
                    case "3":
                        this.sacar();
                        break;
                    case "4":
                        this.depositar();
                        break;
                    case "5":
                        this.excluir();
                        break;
                    case "6":
                        this.transferir();
                        break;
                    case "7":
                        this.renderJuros();
                        break;
                    case "8":
                        this.totalizacoes();
                        break;
                    case "9":
                        this.executarOrdemDePagamento();
                        break;
                    case "10":
                        this.listarContas();
                        break;
                }
            }
            catch (e) {
                if (e instanceof excecoes_1.AvisoError) {
                    console.log(e.message); // "Ocorreu um erro na aplicação!"
                }
                else {
                    console.log("Erro desconhecido. Contate o administrador\n", e);
                }
                this.imprimirPressionarEnter();
            }
        } while (op != "0");
    }
    listarOpcoes() {
        console.log('\nBem vindo\nDigite uma opção:');
        console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
            '4 - Depositar       5 - Excluir               6 - Transferir\n' +
            '7 - Render Juros    8 - Totalizações          9 - Ordem de pagamento\n' +
            '10 - Listar contas  0 - Sair\n');
    }
    cadastrar() {
        console.log("\nCadastrar conta\n");
        let numero = this._input('Digite o número da conta: ');
        let nomeCliente = this._input('Digite o nome do cliente: ');
        let opcaoConta = this._input('Informe o tipo: 1 - Conta, 2 - Poupança, 3 - Conta Imposto : ');
        let cliente = new modelos_1.Cliente(this._idCliente++, nomeCliente);
        let conta;
        if (opcaoConta == "2") {
            conta = new modelos_1.Poupanca(numero, 0, cliente, 0.5);
        }
        else if (opcaoConta == "3") {
            conta = new modelos_1.ContaImposto(numero, 0, cliente, 0.38);
        }
        else {
            conta = new modelos_1.Conta(numero, 0, cliente);
        }
        this._banco.inserir(conta);
        this.exibirConta(numero);
    }
    exibirConta(numero, solicitarEnter = true) {
        let conta = this._banco.consultar(numero);
        console.log(`Número: ${conta.numero} - Cliente: ${conta.cliente.nome} - Saldo: R$ ${conta.saldo.toFixed(2)} `);
        if (solicitarEnter) {
            this.imprimirPressionarEnter();
        }
    }
    imprimirPressionarEnter() {
        this._input("Pressione <enter> p/ voltar ao menu..");
    }
    consultarSaldo() {
        console.log("\nConsultar Saldo\n");
        let numero = this._input('Digite o número da conta: ');
        this.exibirConta(numero);
    }
    sacar() {
        console.log("\nSacar\n");
        let numero = this._input('Digite o número da conta: ');
        let valor = parseFloat(this._input('Digite o valor do saque: '));
        this._banco.sacar(numero, valor);
        this.exibirConta(numero);
    }
    depositar() {
        console.log("\nDepositar\n");
        let numero = this._input('Digite o número da conta: ');
        let valor = parseFloat(this._input('Digite o valor do depósito: '));
        this._banco.depositar(numero, valor);
        this.exibirConta(numero);
    }
    renderJuros() {
        console.log("\Render juros\n");
        let numero = this._input('Digite o número da poupança: ');
        this._banco.renderJuros(numero);
        this.exibirConta(numero);
    }
    excluir() {
        throw new Error('Method not implemented.');
    }
    transferir() {
        console.log("\nTransferir\n");
        let numeroOrigem = this._input('Digite o número da conta de origem: ');
        let numeroDestino = this._input('Digite o número da conta de destino: ');
        let valor = parseFloat(this._input('Digite o valor do depósito: '));
        this._banco.transferir(numeroOrigem, numeroDestino, valor);
        this.exibirConta(numeroOrigem, false);
        this.exibirConta(numeroDestino);
    }
    executarOrdemDePagamento() {
        console.log("\Ordem bancária\n");
        let numeroOrigem = this._input('Digite o número da conta de origem: ');
        let numeroDestino1 = this._input('Digite o número da conta de destino 1: ');
        let numeroDestino2 = this._input('Digite o número da conta de destino 2: ');
        let numeroDestino3 = this._input('Digite o número da conta de destino 3: ');
        let valor = parseFloat(this._input('Digite o valor do depósito: '));
        this._banco.executarOrdemDePagamento(numeroOrigem, valor, numeroDestino1, numeroDestino2, numeroDestino3);
        this.exibirConta(numeroOrigem, false);
        this.exibirConta(numeroDestino1, false);
        this.exibirConta(numeroDestino2, false);
        this.exibirConta(numeroDestino3);
    }
    totalizacoes() {
        console.log("\nListar totalizações:\n");
        console.log(`Total de contas: ${this._banco.obterQuantidadeDeContas()}`);
        console.log(`Total de saldos: R$ ${this._banco.obterTotalDeSaldos().toFixed(2)}`);
        console.log(`Total de saldos: R$ ${this._banco.obterMediaDeSaldos().toFixed(2)}`);
        this._input("Pressione <enter>");
    }
    listarContas() {
        console.log("\nListar contas\n");
        for (let conta of this._banco.contas) {
            console.log(`Número: ${conta.numero} - Cliente: ${conta.cliente.nome} - Saldo: R$ ${conta.saldo.toFixed(2)} - Tipo: ${this.retornarTipoConta(conta)}`);
        }
        this.imprimirPressionarEnter();
    }
    retornarTipoConta(conta) {
        return conta instanceof modelos_1.Poupanca ? "Poupança" : conta instanceof modelos_1.ContaImposto ? "Conta Imposto" : "Conta";
    }
    carregarDeArquivo() {
        const arquivo = fs.readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
        //const linhas: string[] = arquivo.split('\n');
        const linhas = arquivo.split('\r\n');
        console.log(linhas);
        console.log("Iniciando leitura de arquivo");
        for (let i = 0; i < linhas.length; i++) {
            let linhaConta = linhas[i].split(";");
            let conta;
            let cliente;
            let tipo = linhaConta[0];
            if (tipo == 'C') {
                cliente = new modelos_1.Cliente(parseInt(linhaConta[3]), linhaConta[4]);
                conta = new modelos_1.Conta(linhaConta[1], parseFloat(linhaConta[2]), cliente);
            }
            else if (tipo == 'CP') {
                cliente = new modelos_1.Cliente(parseInt(linhaConta[4]), linhaConta[5]);
                conta = new modelos_1.Poupanca(linhaConta[1], parseFloat(linhaConta[2]), cliente, parseFloat(linhaConta[3]));
            }
            else if (tipo == 'CI') {
                cliente = new modelos_1.Cliente(parseInt(linhaConta[4]), linhaConta[5]);
                conta = new modelos_1.ContaImposto(linhaConta[1], parseFloat(linhaConta[2]), cliente, parseFloat(linhaConta[3]));
            }
            this._banco.inserir(conta);
            console.log(`Conta ${conta.numero} carregada`);
        }
        console.log("fim do arquivo");
    }
    salvarEmArquivo() {
        console.log("Iniciando a gravação de contas em arquivo.");
        let stringContas = "";
        let linha = "";
        for (let conta of this._banco.contas) {
            // linha = `C;${conta.numero};${conta.saldo};${conta.cliente.id};${conta.cliente.nome}\r\n`;
            if (conta instanceof modelos_1.Poupanca) {
                linha = `CP;${conta.numero};${conta.saldo};${conta.taxaDeJuros};${conta.cliente.id};${conta.cliente.nome}\r\n`;
            }
            else if ((conta instanceof modelos_1.ContaImposto)) {
                linha = `CI;${conta.numero};${conta.saldo};${conta.taxaDeDesconto};${conta.cliente.id};${conta.cliente.nome}\r\n`;
            }
            else {
                linha = `C;${conta.numero};${conta.saldo};${conta.cliente.id};${conta.cliente.nome}\r\n`;
            }
            stringContas += linha;
        }
        //deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
        stringContas = stringContas.slice(0, stringContas.length - 2);
        fs.writeFileSync(this.CAMINHO_ARQUIVO, stringContas, 'utf-8');
        console.log("Contas salvas em arquivo.");
    }
}
exports.AppBanco = AppBanco;
