import { DatabaseGetterClientParams } from 'app/protocols/database/database-getter-client'
import { mockDatabaseGetterClient } from 'app/protocols/database/database-getter-client/mock'
import { mockUser } from 'domain/models/user/mock'
import { LocalSessionGetter } from '.'

describe('LocalSessionGetter', () => {
  it('should call client with right params', async () => {
    const databaseGetterlient = mockDatabaseGetterClient()
    const sut = new LocalSessionGetter(databaseGetterlient)

    await sut.get()

    const getParams: DatabaseGetterClientParams = {
      from: 'userSession',
    }
    expect(databaseGetterlient.get).toBeCalledWith(getParams)
  })

  it('should return user data', async () => {
    const databaseGetterlient = mockDatabaseGetterClient()

    const user = mockUser()
    databaseGetterlient.get.mockResolvedValueOnce(user)

    const sut = new LocalSessionGetter(databaseGetterlient)

    const data = await sut.get()

    expect(data).toEqual(user)
  })
})
