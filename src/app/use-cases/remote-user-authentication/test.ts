import { faker } from '@faker-js/faker'
import { ApiRestClientParams } from 'app/protocols/api-rest-client'
import { mockApiRestClient } from 'app/protocols/api-rest-client/mock'
import { UserAuthenticationParams } from 'domain/use-cases/user-authentication'
import { RemoteUserAuthentication } from '.'
import { RemoteUserAuthenticationParams } from './types'

describe('RemoteUserAuthentication', () => {
  it('should call client with right params', async () => {
    const apiRestClient = mockApiRestClient()
    const sut = new RemoteUserAuthentication(apiRestClient)

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
})
