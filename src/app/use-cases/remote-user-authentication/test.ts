import { faker } from '@faker-js/faker'
import { RemoteUser } from 'app/models/remote-user'
import { mockRemoteUser } from 'app/models/remote-user/mock'
import {
  ApiRestClientParams,
  ApiRestClientResponse,
} from 'app/protocols/api-rest-client'
import { mockApiRestClient } from 'app/protocols/api-rest-client/mock'
import { User } from 'domain/models/user'
import { UserAuthenticationParams } from 'domain/use-cases/user-authentication'
import { RemoteUserAuthentication } from '.'
import { RemoteUserAuthenticationParams } from './types'

const makeSut = () => {
  const apiRestClient = mockApiRestClient()
  const sut = new RemoteUserAuthentication(apiRestClient)
  const response: ApiRestClientResponse<RemoteUser> = {
    data: mockRemoteUser(),
    statusCode: faker.internet.httpStatusCode(),
  }

  return {
    apiRestClient,
    sut,
    response,
  }
}

describe('RemoteUserAuthentication', () => {
  it('should call client with right params', async () => {
    const { sut, apiRestClient, response } = makeSut()

    apiRestClient.request.mockResolvedValueOnce(response)

    const authParams: UserAuthenticationParams = {
      identifier: faker.internet.email(),
      password: faker.internet.password(),
    }
    await sut.auth(authParams)

    const requestParams: ApiRestClientParams<RemoteUserAuthenticationParams> = {
      method: 'post',
      body: authParams,
    }

    expect(apiRestClient.request).toBeCalledWith(requestParams)
  })

  it('should return model data', async () => {
    const { sut, apiRestClient, response } = makeSut()

    apiRestClient.request.mockResolvedValueOnce(response)

    const authParams: UserAuthenticationParams = {
      identifier: faker.internet.email(),
      password: faker.internet.password(),
    }
    const modelData = await sut.auth(authParams)

    const userModelFromRemote: User = {
      id: response.data.user.id.toString(),
      username: response.data.user.username,
    }

    expect(modelData).toEqual(userModelFromRemote)
  })
})
