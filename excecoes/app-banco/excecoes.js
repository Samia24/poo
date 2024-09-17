"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpcaoInvalidaError = exports.PoupancaInvalidaError = exports.ContaExistenteError = exports.ContaInexistenteError = exports.ValorInvalidoError = exports.SaldoInsuficienteError = exports.AvisoError = void 0;
class AvisoError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AvisoError = AvisoError;
class SaldoInsuficienteError extends AvisoError {
    constructor(message) {
        super(message);
    }
}
exports.SaldoInsuficienteError = SaldoInsuficienteError;
class ValorInvalidoError extends AvisoError {
    constructor(message) {
        super(message);
    }
}
exports.ValorInvalidoError = ValorInvalidoError;
class ContaInexistenteError extends AvisoError {
    constructor(message) {
        super(message);
    }
}
exports.ContaInexistenteError = ContaInexistenteError;
class ContaExistenteError extends AvisoError {
    constructor(message) {
        super(message);
    }
}
exports.ContaExistenteError = ContaExistenteError;
class PoupancaInvalidaError extends AvisoError {
    constructor(message) {
        super(message);
    }
}
exports.PoupancaInvalidaError = PoupancaInvalidaError;
class OpcaoInvalidaError extends AvisoError {
    constructor(message) {
        super(message);
    }
}
exports.OpcaoInvalidaError = OpcaoInvalidaError;
