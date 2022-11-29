import { DatabaseSetterClient } from 'app/protocols/database/database-setter-client'
import {
  SessionSetter,
  SessionSetterParams,
} from 'domain/use-cases/session-setter'

export class LocalSessionSetter implements SessionSetter {
  constructor(private readonly databaseSetterClient: DatabaseSetterClient) {}

  async set(params: SessionSetterParams): Promise<void> {
    await this.databaseSetterClient.set({
      into: 'userSession',
      data: params.user,
    })
  }
}
