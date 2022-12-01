import { DatabaseGetterClient } from 'app/protocols/database/database-getter-client'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { User } from 'domain/models/user'
import { SessionGetter } from 'domain/use-cases/session-getter'

export class LocalSessionGetter implements SessionGetter {
  constructor(private readonly databaseGetterClient: DatabaseGetterClient) {}

  async get(): Promise<User> {
    try {
      const data = await this.databaseGetterClient.get<User>({
        from: 'userSession',
      })

      return data
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
