export class CredentialsError extends Error {
  constructor() {
    super('Credenciais inválidas. Verifique os dados informados.')
    this.name = 'CredentialsError'
  }
}
