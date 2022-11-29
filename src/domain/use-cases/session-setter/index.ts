import { User } from 'domain/models/user'

export type SessionSetterParams = {
  user: User
}

export interface SessionSetter {
  set(params: SessionSetterParams): Promise<void>
}
