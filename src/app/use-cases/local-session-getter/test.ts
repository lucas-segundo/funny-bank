import { DatabaseGetterClientParams } from 'app/protocols/database/database-getter-client'
import { mockDatabaseGetterClient } from 'app/protocols/database/database-getter-client/mock'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { mockUser } from 'domain/models/user/mock'
import { LocalSessionGetter } from '.'

const makeSut = () => {
  const databaseGetterClient = mockDatabaseGetterClient()
  const sut = new LocalSessionGetter(databaseGetterClient)

  return {
    databaseGetterClient,
    sut,
  }
}

describe('LocalSessionGetter', () => {
  it('should call client with right params', async () => {
    const { sut, databaseGetterClient } = makeSut()

    await sut.get()

    const getParams: DatabaseGetterClientParams = {
      from: 'userSession',
    }
    expect(databaseGetterClient.get).toBeCalledWith(getParams)
  })

  it('should return user data', async () => {
    const { sut, databaseGetterClient } = makeSut()

    const user = mockUser()
    databaseGetterClient.get.mockResolvedValueOnce(user)

    const data = await sut.get()

    expect(data).toEqual(user)
  })

  it('should throw unexpected error when something wrong happens', async () => {
    const { sut, databaseGetterClient } = makeSut()
    databaseGetterClient.get.mockRejectedValueOnce(Error)

    const promise = sut.get()

    await expect(promise).rejects.toThrowError(UnexpectedError)
  })
})
