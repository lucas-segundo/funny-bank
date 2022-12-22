export class CredentialsError extends Error {
  constructor() {
    super('Invalid credencials.')
    this.name = 'CredentialsError'
  }
}
