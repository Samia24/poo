// A classe sensor armazena os dados de cada sensor, sendo que cada um afere 4 parâmetros diferentes.
class Sensor {

  private _temperatura: number
  private _umidade: number
  private _nivelPoluicao: number
  private _ruido: number

  constructor(temperatura: number, umidade: number, nivelPoluicao: number, ruido: number) {

    this._temperatura = temperatura;
    this._umidade = umidade;
    this._nivelPoluicao = nivelPoluicao;
    this._ruido = ruido;
  };

  // GETTERS
  get ruido(): number {
    return this._ruido;
  };

  get nivelPoluicao(): number {
    return this._nivelPoluicao;
  };

  get umidade(): number {
    return this._umidade;
  };

  get temperatura(): number {
    return this._temperatura;
  };

  // SETTERS
  set ruido(value: number) {
    this._ruido = value;
  };

  set nivelPoluicao(value: number) {
    this._nivelPoluicao = value;
  };

  set umidade(value: number) {
    this._umidade = value;
  };

  set temperatura(value: number) {
    this._temperatura = value;
  };
  
  // METHODS

  // A calibração é feita alterando os valores dos parâmetros
  calibrar(temperatura: number, umidade: number, nivelPoluicao: number, ruido: number): void {
    this.temperatura = temperatura;
    this.umidade = umidade;
    this.nivelPoluicao = nivelPoluicao;
    this.ruido = ruido;
  };

  // adicionarLeituras armazena os valores atuais em seus respectivos atributos provenientes da classe Leitura
  adicionarLeituras(): void {
    let dataAtual: Date = new Date();
    let leiturasTemp: Leitura[] = [
      new Leitura("temperatura", this.temperatura, dataAtual),
      new Leitura("umidade", this.umidade, dataAtual),
      new Leitura("nivelPoluicao", this.nivelPoluicao, dataAtual),
      new Leitura("ruido", this.ruido, dataAtual)
    ]
    leiturasTemp.forEach(leitura => leituras.push(leitura))
  }
}

class Leitura {

  private _tipoDado: string;
  private _valor: number
  private _dataCriacao: Date;


  constructor(tipo: string, valor: number, dataCriacao: Date) {
    this._tipoDado = tipo;
    this._valor = valor;
    this._dataCriacao = dataCriacao;
  }

  // GETTERS
  get dataCriacao(): Date {
    return this._dataCriacao;
  }

  get valor(): number {
    return this._valor;
  }

  get tipoDado(): string {
    return this._tipoDado;
  }

  // SETTERS
  set dataCriacao(value: Date) {
    this._dataCriacao = value;
  }

  set valor(value: number) {
    this._valor = value;
  }

  set tipoDado(value: string) {
    this._tipoDado = value;
  }
}

let sensores: Sensor[] = [];
let leituras: Leitura[] = [];

// Esta função cria um novo sensor com os valores especificados para cada tipo de sensor
// Ela adiciona o novo sensor à array sensores e retorna uma mensagem indicando que o sensor foi criado com sucesso.
function criarSensor(temperatura: number, umidade: number, nivelPoluicao: number, ruido: number): void {
  sensores.push(new Sensor(temperatura, umidade, nivelPoluicao, ruido))
}

//Calcula estatísticas com base nas leituras armazenadas. Ela filtra as leituras por tipo de dado (temperatura, umidade, nível de poluição e ruído) e então mapeia os valores correspondentes.  
// Em seguida, utiliza a função calcularEstatisticasGrupo para calcular as estatísticas para cada grupo de dados e retorna uma string contendo todas as estatísticas calculadas.
function calcularEstatisticas(): string {
  //Primeiro filtra por tipo de dado e extrai os valores do sensor a esse tipo específico, e armazena em uma nova lista de sensores somente desse tipo especifico.
  let temperaturas: number[] = leituras.filter(leitura => leitura.tipoDado === "temperatura").map(leitura => leitura.valor);
  let umidades: number[] = leituras.filter(leitura => leitura.tipoDado === "umidade").map(leitura => leitura.valor);
  let nivelPoluicoes: number[] = leituras.filter(leitura => leitura.tipoDado === "nivelPoluicao").map(leitura => leitura.valor);
  let ruidos: number[] = leituras.filter(leitura => leitura.tipoDado === "ruido").map(leitura => leitura.valor);

  //Calcula as estatísticas com base nos valores extraídos nas etapas anteriores e armazena em uma variável
  let estatisticasTemperaturas: string = calcularEstatisticasGrupo(temperaturas, "temperaturas");
  let estatisticasUmidades: string = calcularEstatisticasGrupo(umidades, "umidades");
  let estatisticasNivelPoluicoes: string = calcularEstatisticasGrupo(nivelPoluicoes, "níveis de poluição");
  let estatisticasRuidos: string = calcularEstatisticasGrupo(ruidos, "ruídos");

  // Retorna uma string com essas estatísticas calculadas para cada tipo de dado.
  return `${estatisticasTemperaturas}\n${estatisticasUmidades}\n${estatisticasNivelPoluicoes}\n${estatisticasRuidos}`;
}

function calcularEstatisticasGrupo(valores: number[], grupo: string): string {
  // Verifica se o array está vazio, ou seja, se há sensor referente ao tipo de dado filtrado. Caso não haja, retorna apenas uma mensagem indicando que nenhum valor foi encontrado para o grupo específico.
  if (valores.length == 0) return `Nenhum valor encontrado para ${grupo}`;
  // O método reduce serve para somar todos os valores do array e, em seguida, divide pelo número de elementos no array para obter a média. acc é o valor acumulado que inicia em zero. 
  let media: number = valores.reduce((acc, valor) => acc + valor, 0) / valores.length;

  //valor > max ? valor : max: Essa é uma expressão ternária que compara o valor atual (valor) com o valor máximo acumulado (max).
  //Se o valor atual for maior que o valor máximo, ele se torna o novo valor máximo.
  //Caso contrário, o valor máximo permanece o mesmo.
  //valores[0]: Este é o valor inicial para a comparação. Se a array estiver vazia, esse será o valor retornado.
  let maior: number = valores.reduce((max, valor) => valor > max ? valor : max, valores[0]);
  let menor: number = valores.reduce((min, valor) => valor < min ? valor : min, valores[0]);

  //A função retorna a média e maior e menor valor de cada grupo de parâmetros
  return `Média das ${grupo}: ${media.toFixed(2)}, Maior ${grupo}: ${maior}, Menor ${grupo}: ${menor}`;
}

// Esta função recebe uma matriz (lista de lista) de números como parâmetro. Cada elemento dessa matriz representa os valores para criar um novo sensor.
function povoar_sensores(sensores: number[][]): void {
  sensores.forEach(sensor => criarSensor(
                                          sensor[0],
                                          sensor[1],
                                          sensor[2],
                                          sensor[3]))
}

function povoar_leituras(): void {
  sensores.forEach(sensor => sensor.adicionarLeituras())
}

// exemplos

console.log(sensores)
console.log(leituras)

//criarSensor(20,20,20,22)

//console.log(sensores)
//console.log(leituras)

povoar_sensores([[20, 30, 40, 50],
   [18, 50, 40, 50],
   [12, 65, 40, 50],
   [34, 70, 40, 50],
   [23, 10, 40, 50]])
//

povoar_leituras()


console.log(sensores[0])
sensores[0].calibrar(28,36,32,41)

console.log(sensores[0])
sensores[1].calibrar(18,84,34,16)
sensores[2].calibrar(65,42,34,17)
sensores[3].calibrar(-12,10,4,10)
sensores[4].calibrar(37,60,20,75)

console.log(sensores)


povoar_leituras()
console.log(leituras)
//
console.log(calcularEstatisticas());

sensores[0].calibrar(10, 20, 30, 40);
sensores[1].calibrar(10, 20, 30, 40);
sensores[2].calibrar(10, 20, 30, 40);
sensores[3].calibrar(10, 20, 30, 40);
sensores[4].calibrar(10, 20, 30, 40);
//
povoar_leituras()
//
//console.log(sensores)
//console.log(leituras)
//
console.log(calcularEstatisticas());
