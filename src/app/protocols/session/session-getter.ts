import { User } from 'domain/models/user'

export interface SessionGetter {
  get(): Promise<User>
}
