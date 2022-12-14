import { RemoteUser } from 'app/models/remote-user'
import { ApiRestClient } from 'app/protocols/http/api-rest-client'
import { HttpStatusCodeEnum } from 'app/protocols/http/http-status-code-enum'
import { CredentialsError } from 'domain/errors/credencials-error'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { User } from 'domain/models/user'
import {
  UserAuthentication,
  UserAuthenticationParams,
} from 'domain/use-cases/user-authentication'
import { RemoteUserAuthenticationParams } from './types'

export class RemoteUserAuthentication implements UserAuthentication {
  constructor(private readonly apiRestClient: ApiRestClient) {}

  async auth(params: UserAuthenticationParams): Promise<User> {
    const response = await this.apiRestClient.request<
      RemoteUserAuthenticationParams,
      RemoteUser
    >({
      method: 'post',
      body: params,
    })

    switch (response.statusCode) {
      case HttpStatusCodeEnum.OK:
        return this.adaptToModel(response.data)
      case HttpStatusCodeEnum.BAD_REQUEST:
      case HttpStatusCodeEnum.UNAUTHORIZED:
        throw new CredentialsError()
      default:
        throw new UnexpectedError()
    }
  }

  adaptToModel(data: RemoteUser): User {
    return {
      id: data.user.id.toString(),
      username: data.user.username,
      accessToken: data.jwt,
    }
  }
}
