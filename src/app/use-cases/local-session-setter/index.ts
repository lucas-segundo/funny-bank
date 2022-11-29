import { DatabaseSetterClient } from 'app/protocols/database/database-setter-client'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import {
  SessionSetter,
  SessionSetterParams,
} from 'domain/use-cases/session-setter'

export class LocalSessionSetter implements SessionSetter {
  constructor(private readonly databaseSetterClient: DatabaseSetterClient) {}

  async set(params: SessionSetterParams): Promise<void> {
    try {
      await this.databaseSetterClient.set({
        into: 'userSession',
        data: params.user,
      })
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
