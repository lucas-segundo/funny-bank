export class UserSessionNotFoundError extends Error {
  constructor() {
    super('User session not found.')
    this.name = 'UserSessionNotFoundError'
  }
}
