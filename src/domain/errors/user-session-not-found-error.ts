export class UserSessionNotFoundError extends Error {
  constructor() {
    super('Sessão do usuário não encontrada.')
    this.name = 'UserSessionNotFoundError'
  }
}
