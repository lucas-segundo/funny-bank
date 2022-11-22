import { User } from 'domain/models/user'

export type UserAuthenticationParams = {
  identifier: string
  password: string
}

export interface UserAuthentication {
  auth(params: UserAuthenticationParams): Promise<User>
}
