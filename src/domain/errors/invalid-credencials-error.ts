export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais inválidas. Verifique os dados informados.')
    this.name = 'InvalidCredentialsError'
  }
}
