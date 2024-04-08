// A classe sensor armazena os dados de cada sensor, sendo que cada um afere 4 parâmetros diferentes.
var Sensor = /** @class */ (function () {
    function Sensor(temperatura, umidade, nivelPoluicao, ruido) {
        this._temperatura = temperatura;
        this._umidade = umidade;
        this._nivelPoluicao = nivelPoluicao;
        this._ruido = ruido;
    }
    ;
    Object.defineProperty(Sensor.prototype, "ruido", {
        // GETTERS
        get: function () {
            return this._ruido;
        },
        // SETTERS
        set: function (value) {
            this._ruido = value;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Sensor.prototype, "nivelPoluicao", {
        get: function () {
            return this._nivelPoluicao;
        },
        set: function (value) {
            this._nivelPoluicao = value;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Sensor.prototype, "umidade", {
        get: function () {
            return this._umidade;
        },
        set: function (value) {
            this._umidade = value;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Sensor.prototype, "temperatura", {
        get: function () {
            return this._temperatura;
        },
        set: function (value) {
            this._temperatura = value;
        },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    ;
    ;
    ;
    // METHODS
    // A calibração é feita alterando os valores dos parâmetros
    Sensor.prototype.calibrar = function (temperatura, umidade, nivelPoluicao, ruido) {
        this.temperatura = temperatura;
        this.umidade = umidade;
        this.nivelPoluicao = nivelPoluicao;
        this.ruido = ruido;
    };
    ;
    // adicionarLeituras armazena os valores atuais em seus respectivos atributos provenientes da classe Leitura
    Sensor.prototype.adicionarLeituras = function () {
        var dataAtual = new Date();
        var leiturasTemp = [
            new Leitura("temperatura", this.temperatura, dataAtual),
            new Leitura("umidade", this.umidade, dataAtual),
            new Leitura("nivelPoluicao", this.nivelPoluicao, dataAtual),
            new Leitura("ruido", this.ruido, dataAtual)
        ];
        leiturasTemp.forEach(function (leitura) { return leituras.push(leitura); });
    };
    return Sensor;
}());
var Leitura = /** @class */ (function () {
    function Leitura(tipo, valor, dataCriacao) {
        this._tipoDado = tipo;
        this._valor = valor;
        this._dataCriacao = dataCriacao;
    }
    Object.defineProperty(Leitura.prototype, "dataCriacao", {
        // GETTERS
        get: function () {
            return this._dataCriacao;
        },
        // SETTERS
        set: function (value) {
            this._dataCriacao = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Leitura.prototype, "valor", {
        get: function () {
            return this._valor;
        },
        set: function (value) {
            this._valor = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Leitura.prototype, "tipoDado", {
        get: function () {
            return this._tipoDado;
        },
        set: function (value) {
            this._tipoDado = value;
        },
        enumerable: false,
        configurable: true
    });
    return Leitura;
}());
var sensores = [];
var leituras = [];
// Esta função cria um novo sensor com os valores especificados para cada tipo de sensor
// Ela adiciona o novo sensor à array sensores e retorna uma mensagem indicando que o sensor foi criado com sucesso.
function criarSensor(temperatura, umidade, nivelPoluicao, ruido) {
    sensores.push(new Sensor(temperatura, umidade, nivelPoluicao, ruido));
}
//Calcula estatísticas com base nas leituras armazenadas. Ela filtra as leituras por tipo de dado (temperatura, umidade, nível de poluição e ruído) e então mapeia os valores correspondentes.  
// Em seguida, utiliza a função calcularEstatisticasGrupo para calcular as estatísticas para cada grupo de dados e retorna uma string contendo todas as estatísticas calculadas.
function calcularEstatisticas() {
    //Primeiro filtra por tipo de dado e extrai os valores do sensor a esse tipo específico, e armazena em uma nova lista de sensores somente desse tipo especifico.
    var temperaturas = leituras.filter(function (leitura) { return leitura.tipoDado === "temperatura"; }).map(function (leitura) { return leitura.valor; });
    var umidades = leituras.filter(function (leitura) { return leitura.tipoDado === "umidade"; }).map(function (leitura) { return leitura.valor; });
    var nivelPoluicoes = leituras.filter(function (leitura) { return leitura.tipoDado === "nivelPoluicao"; }).map(function (leitura) { return leitura.valor; });
    var ruidos = leituras.filter(function (leitura) { return leitura.tipoDado === "ruido"; }).map(function (leitura) { return leitura.valor; });
    //Calcula as estatísticas com base nos valores extraídos nas etapas anteriores e armazena em uma variável
    var estatisticasTemperaturas = calcularEstatisticasGrupo(temperaturas, "temperaturas");
    var estatisticasUmidades = calcularEstatisticasGrupo(umidades, "umidades");
    var estatisticasNivelPoluicoes = calcularEstatisticasGrupo(nivelPoluicoes, "níveis de poluição");
    var estatisticasRuidos = calcularEstatisticasGrupo(ruidos, "ruídos");
    // Retorna uma string com essas estatísticas calculadas para cada tipo de dado.
    return "".concat(estatisticasTemperaturas, "\n").concat(estatisticasUmidades, "\n").concat(estatisticasNivelPoluicoes, "\n").concat(estatisticasRuidos);
}
function calcularEstatisticasGrupo(valores, grupo) {
    // Verifica se o array está vazio, ou seja, se há sensor referente ao tipo de dado filtrado. Caso não haja, retorna apenas uma mensagem indicando que nenhum valor foi encontrado para o grupo específico.
    if (valores.length == 0)
        return "Nenhum valor encontrado para ".concat(grupo);
    // O método reduce serve para somar todos os valores do array e, em seguida, divide pelo número de elementos no array para obter a média. acc é o valor acumulado que inicia em zero. 
    var media = valores.reduce(function (acc, valor) { return acc + valor; }, 0) / valores.length;
    //valor > max ? valor : max: Essa é uma expressão ternária que compara o valor atual (valor) com o valor máximo acumulado (max).
    //Se o valor atual for maior que o valor máximo, ele se torna o novo valor máximo.
    //Caso contrário, o valor máximo permanece o mesmo.
    //valores[0]: Este é o valor inicial para a comparação. Se a array estiver vazia, esse será o valor retornado.
    var maior = valores.reduce(function (max, valor) { return valor > max ? valor : max; }, valores[0]);
    var menor = valores.reduce(function (min, valor) { return valor < min ? valor : min; }, valores[0]);
    //A função retorna a média e maior e menor valor de cada grupo de parâmetros
    return "M\u00E9dia das ".concat(grupo, ": ").concat(media.toFixed(2), ", Maior ").concat(grupo, ": ").concat(maior, ", Menor ").concat(grupo, ": ").concat(menor);
}
// Esta função recebe uma matriz (lista de lista) de números como parâmetro. Cada elemento dessa matriz representa os valores para criar um novo sensor.
function povoar_sensores(sensores) {
    sensores.forEach(function (sensor) { return criarSensor(sensor[0], sensor[1], sensor[2], sensor[3]); });
}
function povoar_leituras() {
    sensores.forEach(function (sensor) { return sensor.adicionarLeituras(); });
}
// exemplos
console.log(sensores);
console.log(leituras);
//criarSensor(20,20,20,22)
//console.log(sensores)
//console.log(leituras)
povoar_sensores([[20, 30, 40, 50],
    [18, 50, 40, 50],
    [12, 65, 40, 50],
    [34, 70, 40, 50],
    [23, 10, 40, 50]]);
//
povoar_leituras();
console.log(sensores[0]);
sensores[0].calibrar(28, 36, 32, 41);
console.log(sensores[0]);
sensores[1].calibrar(18, 84, 34, 16);
sensores[2].calibrar(65, 42, 34, 17);
sensores[3].calibrar(-12, 10, 4, 10);
sensores[4].calibrar(37, 60, 20, 75);
console.log(sensores);
povoar_leituras();
console.log(leituras);
//
console.log(calcularEstatisticas());
sensores[0].calibrar(10, 20, 30, 40);
sensores[1].calibrar(10, 20, 30, 40);
sensores[2].calibrar(10, 20, 30, 40);
sensores[3].calibrar(10, 20, 30, 40);
sensores[4].calibrar(10, 20, 30, 40);
//
povoar_leituras();
//
//console.log(sensores)
//console.log(leituras)
//
console.log(calcularEstatisticas());
