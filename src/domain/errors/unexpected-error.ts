export class UnexpectedError extends Error {
  constructor() {
    super('Credenciais inválidas. Verifique os dados informados.')
    this.name = 'UnexpectedError'
  }
}
