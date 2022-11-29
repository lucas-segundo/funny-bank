import { DatabaseSetterClientParams } from 'app/protocols/database/database-setter-client'
import { mockDatabaseSetterClient } from 'app/protocols/database/database-setter-client/mock'
import { User } from 'domain/models/user'
import { mockSessionSetterParams } from 'domain/use-cases/session-setter/mock'
import { LocalSessionSetter } from '.'

describe('LocalSessionSetter', () => {
  it('should call client with right params', async () => {
    const databaseSetterClient = mockDatabaseSetterClient()
    const sut = new LocalSessionSetter(databaseSetterClient)

    const sessionSetterParams = mockSessionSetterParams()
    await sut.set(sessionSetterParams)

    const setParams: DatabaseSetterClientParams<User> = {
      into: 'userSession',
      data: sessionSetterParams.user,
    }
    expect(databaseSetterClient.set).toBeCalledWith(setParams)
  })
})
