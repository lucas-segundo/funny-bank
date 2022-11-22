import { RemoteUser } from 'app/models/remote-user'
import { ApiRestClient } from 'app/protocols/api-rest-client'
import { User } from 'domain/models/user'
import {
  UserAuthentication,
  UserAuthenticationParams,
} from 'domain/use-cases/user-authentication'
import { RemoteUserAuthenticationParams } from './types'

export class RemoteUserAuthentication implements UserAuthentication {
  constructor(private readonly apiRestClient: ApiRestClient) {}

  async auth(params: UserAuthenticationParams): Promise<User> {
    await this.apiRestClient.request<
      RemoteUserAuthenticationParams,
      RemoteUser
    >({
      method: 'post',
      body: params,
    })
  }
}
