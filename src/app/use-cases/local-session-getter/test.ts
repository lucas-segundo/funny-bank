import { DatabaseGetterClientParams } from 'app/protocols/database/database-getter-client'
import { mockDatabaseGetterClient } from 'app/protocols/database/database-getter-client/mock'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { UserSessionNotFoundError } from 'domain/errors/user-session-not-found-error'
import { mockUser } from 'domain/models/user/mock'
import { LocalSessionGetter } from '.'

const makeSut = () => {
  const databaseGetterClient = mockDatabaseGetterClient()
  const sut = new LocalSessionGetter(databaseGetterClient)
  const user = mockUser()

  return {
    databaseGetterClient,
    sut,
    user,
  }
}

describe('LocalSessionGetter', () => {
  it('should call client with right params', async () => {
    const { sut, databaseGetterClient, user } = makeSut()
    databaseGetterClient.get.mockResolvedValueOnce(user)

    await sut.get()

    const getParams: DatabaseGetterClientParams = {
      from: 'userSession',
    }
    expect(databaseGetterClient.get).toBeCalledWith(getParams)
  })

  it('should return user data', async () => {
    const { sut, databaseGetterClient, user } = makeSut()
    databaseGetterClient.get.mockResolvedValueOnce(user)

    const data = await sut.get()

    expect(data).toEqual(user)
  })

  it('should throw error if user session is not found', async () => {
    const { sut, databaseGetterClient } = makeSut()
    databaseGetterClient.get.mockResolvedValueOnce(undefined)

    const data = sut.get()

    await expect(data).rejects.toThrow(UserSessionNotFoundError)
  })

  it('should throw unexpected error when something wrong happens', async () => {
    const { sut, databaseGetterClient } = makeSut()
    databaseGetterClient.get.mockRejectedValueOnce(Error)

    const promise = sut.get()

    await expect(promise).rejects.toThrowError(UnexpectedError)
  })
})
