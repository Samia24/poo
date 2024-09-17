class AvisoError extends Error {
  constructor(message: string) {
      super(message)
  }
}

class SaldoInsuficienteError extends AvisoError {
  constructor(message: string) {
    super(message);
  }
}

class ValorInvalidoError extends AvisoError {
  constructor(message: string) {
    super(message);
  }
}

class ContaInexistenteError extends AvisoError {
  constructor(message: string) {
    super(message);
  }
}

class ContaExistenteError extends AvisoError {
  constructor(message: string) {
    super(message);
  }
}

class PoupancaInvalidaError extends AvisoError{
  constructor(message: string) {
    super(message);
  }
}

class OpcaoInvalidaError extends AvisoError{
  constructor(message: string) {
    super(message);
  }
}

export{ AvisoError, SaldoInsuficienteError, ValorInvalidoError, ContaInexistenteError, ContaExistenteError, PoupancaInvalidaError, OpcaoInvalidaError };

